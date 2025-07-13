import mongoose from "mongoose";

const flashcardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  noteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note',
    required: true,
  },
  question: { 
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  tags: { 
    type: [String],
    default: [],
  },
  dueDate: {
    type: Date,
    default: () => new Date(), //due today by dafault
  },
  easeFactor: {
    type: Number,
    default: 2.5,
  },
  interval: {
    type: Number,
    default: 1, //in days
  },
}, { timestamps: true });

export default mongoose.model('Flashcard', flashcardSchema);