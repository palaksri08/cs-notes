import Note from '../models/Note.js';

// @desc    Get all notes
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch notes' });
  }
};

// @desc    Get single note by ID
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || note.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch note' });
  }
};

// @desc    Create a new note
export const createNote = async (req, res) => {
  const { title, content, tags } = req.body;

  try {
    const newNote = new Note({
      userId: req.user.id,
      title,
      content,
      tags,
    });

    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create note' });
  }
};

// @desc    Update note
export const updateNote = async (req, res) => {
  const { title, content, tags } = req.body;

  try {
    const note = await Note.findById(req.params.id);
    if (!note || note.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Note not found' });
    }

    note.title = title || note.title;
    note.content = content || note.content;
    note.tags = tags || note.tags;

    await note.save();
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update note' });
  }
};

// @desc    Delete note
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || note.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Note not found' });
    }

    await note.deleteOne();
    res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete note' });
  }
};
