import express from 'express';
import {
  createJobPosting,
  getAllJobPostings,
  getJobPostingById,
  updateJobPosting,
  deleteJobPosting,
} from '../controllers/jobPostingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply the protect middleware to routes that require authentication
router.route('/')
  .post(protect, createJobPosting)  // Protected: Create a new job posting
  .get(protect, getAllJobPostings); // Protected: Get all job postings

router.route('/:id')
  .get(protect, getJobPostingById)    // Protected: Get job posting by ID
  .put(protect, updateJobPosting)     // Protected: Update job posting by ID
  .delete(protect, deleteJobPosting); // Protected: Delete job posting by ID

export default router;
