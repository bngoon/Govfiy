import express from 'express';
import {
  associateCandidateWithJob,
  getAllAssociations,
} from '../controllers/candidateJobAssociationController.js';

const router = express.Router();

// Route to create a new association and get all associations
router.route('/')
  .post(associateCandidateWithJob)  // Associate a candidate with a job posting
  .get(getAllAssociations);         // Get all associations

export default router;
