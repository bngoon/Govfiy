import express from 'express';
import {
  createJobPosting,
  getAllJobPostings,
  getJobPostingById,
  updateJobPosting,
  deleteJobPosting,
} from '../controllers/jobPostingController.js';

const router = express.Router();

// Route to create a new job posting and get all job postings
router.route('/')
  .post(createJobPosting)  // Create a new job posting
  .get(getAllJobPostings); // Get all job postings

// Route to get, update, and delete a job posting by ID
router.route('/:id')
  .get(getJobPostingById)    // Get job posting by ID
  .put(updateJobPosting)     // Update job posting by ID
  .delete(deleteJobPosting); // Delete job posting by ID

export default router;
