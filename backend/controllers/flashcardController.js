import Flashcard from '../models/Flashcard.js';
import openai from '../utils/openai.js'; // or wherever you defined it
import { getUpdatedReviewData } from '../utils/spacedRepetition.js';
import genAI from '../utils/gemini.js'

// GET all flashcards for the logged-in user
export const getAllFlashcards = async (req, res) => {
  try {
    const flashcards = await Flashcard.find({ userId: req.user.id });
    res.json(flashcards);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch flashcards' });
  }
};

// GET flashcards that are due today (spaced repetition)
export const getDueFlashcards = async (req, res) => {
  try {
    const today = new Date();
    const dueCards = await Flashcard.find({
      userId: req.user.id,
      dueDate: { $lte: today },
    });
    res.json(dueCards);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch due flashcards' });
  }
};

// POST create a new flashcard
export const createFlashcard = async (req, res) => {
  const { question, answer, tags, noteId } = req.body;

  try {
    const newFlashcard = new Flashcard({
      userId: req.user.id,
      noteId,
      question,
      answer,
      tags,
      easeFactor: 2.5,
      interval: 1,
      dueDate: new Date(),
    });

    await newFlashcard.save();
    res.status(201).json(newFlashcard);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create flashcard' });
  }
};

// PUT update flashcard based on review rating (spaced repetition logic)
export const reviewFlashcard = async (req, res) => {
  const { rating } = req.body;

  try {
    const card = await Flashcard.findById(req.params.id);
    if (!card || card.userId.toString() !== req.user.id)
      return res.status(404).json({ message: 'Flashcard not found' });

    const { interval, easeFactor, dueDate } = getUpdatedReviewData(
      rating,
      card.interval,
      card.easeFactor
    );

    card.interval = interval;
    card.easeFactor = easeFactor;
    card.dueDate = dueDate;

    await card.save();
    res.json({ message: 'Flashcard updated successfully', card });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update flashcard review' });
  }
};

// DELETE a flashcard
export const deleteFlashcard = async (req, res) => {
  try {
    const card = await Flashcard.findById(req.params.id);
    if (!card || card.userId.toString() !== req.user.id)
      return res.status(404).json({ message: 'Flashcard not found' });

    await card.deleteOne();
    res.json({ message: 'Flashcard deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete flashcard' });
  }
};

// 🔥 Auto-generate flashcards from note using OpenAI
export const generateFlashcardsFromNote = async (req, res) => {
  const { noteContent } = req.body;

  if (!noteContent) {
    return res.status(400).json({ message: 'Note content is required' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro" });

    const result = await model.generateContent([
      `Generate 5 flashcards in JSON format like this:
[
  { "question": "What is a stack?", "answer": "A linear data structure following LIFO principle" },
  { "question": "What does LIFO mean?", "answer": "Last In, First Out" }
]
From the following CS note:\n\n${noteContent}`
    ]);

    const response = await result.response;
    const raw = await response.text();

    let flashcards;
    try {
      flashcards = JSON.parse(raw);
    } catch (err) {
      return res.status(500).json({ message: 'Failed to parse Gemini response', raw });
    }

    const saved = await Promise.all(
      flashcards.map((card) =>
        new Flashcard({
          userId: req.user.id,
          question: card.question,
          answer: card.answer,
          easeFactor: 2.5,
          interval: 1,
          dueDate: new Date(),
          tags: [],
        }).save()
      )
    );

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Failed to generate flashcards', error: err.message });
  }
};
