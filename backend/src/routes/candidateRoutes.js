import express from 'express';
import {
  createCandidate,
  getAllCandidates,
  getCandidateById,
  updateCandidate,
  deleteCandidate,
} from '../controllers/candidateController.js';

const router = express.Router();

router.route('/').post(createCandidate).get(getAllCandidates);
router.route('/:id').get(getCandidateById).put(updateCandidate).delete(deleteCandidate);

export default router;
