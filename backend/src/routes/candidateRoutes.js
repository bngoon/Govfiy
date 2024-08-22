import express from 'express';
import {
  createCandidate,
  getAllCandidates,
  getCandidateById,
  updateCandidate,
  deleteCandidate,
} from '../controllers/candidateController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply the protect middleware to routes that require authentication
router.route('/')
  .post(protect, createCandidate)  // Protected: Create a new candidate
  .get(protect, getAllCandidates); // Protected: Get all candidates

router.route('/:id')
  .get(protect, getCandidateById)    // Protected: Get candidate by ID
  .put(protect, updateCandidate)     // Protected: Update candidate by ID
  .delete(protect, deleteCandidate); // Protected: Delete candidate by ID

export default router;
