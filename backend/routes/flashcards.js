import express from 'express';
import { generateFlashcardsFromNote } from '../controllers/flashcardController.js';

import {
  getAllFlashcards,
  getDueFlashcards,
  createFlashcard,
  reviewFlashcard,
  deleteFlashcard,
} from '../controllers/flashcardController.js';

import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getAllFlashcards);
router.get('/due', authMiddleware, getDueFlashcards);
router.post('/', authMiddleware, createFlashcard);
router.put('/:id/review', authMiddleware, reviewFlashcard);
router.delete('/:id', authMiddleware, deleteFlashcard);
router.post('/generate', authMiddleware, generateFlashcardsFromNote);


export default router;