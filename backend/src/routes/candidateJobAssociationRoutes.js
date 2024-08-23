import express from 'express';
import {
  createCandidateJobAssociation,
  getAllAssociations, 
  getCandidateJobAssociationById,
  updateCandidateJobAssociation,
  deleteCandidateJobAssociation,
} from '../controllers/candidateJobAssociationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply the protect middleware to routes that require authentication
router.route('/')
  .post(protect, createCandidateJobAssociation)  // Protected: Create a new association
  .get(protect, getAllAssociations);             // Protected: Get all associations

router.route('/:id')
  .get(protect, getCandidateJobAssociationById)    // Protected: Get association by ID
  .put(protect, updateCandidateJobAssociation)     // Protected: Update association by ID
  .delete(protect, deleteCandidateJobAssociation); // Protected: Delete association by ID

export default router;
