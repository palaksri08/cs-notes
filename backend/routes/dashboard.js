// routes/dashboard.js
import express from 'express';
import Note from '../models/note.js';
import Flashcard from '../models/flashcard.js';

const router = express.Router();

router.get('/subjects', async (req, res) => {
  try {
    // Group note counts by subject
    const noteStats = await Note.aggregate([
      {
        $group: {
          _id: "$subject",
          noteCount: { $sum: 1 },
          lastStudied: { $max: "$updatedAt" }
        }
      }
    ]);

    // Group flashcard counts by subject (via note -> subject)
    const flashcardStats = await Flashcard.aggregate([
      {
        $lookup: {
          from: "notes",
          localField: "noteId",
          foreignField: "_id",
          as: "note"
        }
      },
      { $unwind: "$note" },
      {
        $group: {
          _id: "$note.subject",
          flashcardCount: { $sum: 1 }
        }
      }
    ]);

    // Merge results
    const subjectMap = {};

    noteStats.forEach(stat => {
      subjectMap[stat._id] = {
        subject: stat._id,
        noteCount: stat.noteCount,
        lastStudied: stat.lastStudied,
        flashcardCount: 0
      };
    });

    flashcardStats.forEach(stat => {
      if (!subjectMap[stat._id]) {
        subjectMap[stat._id] = {
          subject: stat._id,
          noteCount: 0,
          flashcardCount: stat.flashcardCount,
          lastStudied: null
        };
      } else {
        subjectMap[stat._id].flashcardCount = stat.flashcardCount;
      }
    });

    const merged = Object.values(subjectMap);

    res.json(merged);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Dashboard stats failed" });
  }
});

export default router;
