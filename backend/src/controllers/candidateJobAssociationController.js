import CandidateJobAssociation from '../models/CandidateJobAssociation.js';
import Candidate from '../models/Candidate.js';
import JobPosting from '../models/JobPosting.js';

// Associate a candidate with a job posting
export const associateCandidateWithJob = async (req, res) => {
  try {
    const { candidateId, jobPostingId } = req.body;

    // Check if the candidate and job posting exist
    const candidate = await Candidate.findByPk(candidateId);
    const jobPosting = await JobPosting.findByPk(jobPostingId);

    if (!candidate || !jobPosting) {
      return res.status(404).json({ message: 'Candidate or Job Posting not found' });
    }

    const association = await CandidateJobAssociation.create({ candidateId, jobPostingId });
    res.status(201).json(association);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all associations
export const getAllAssociations = async (req, res) => {
  try {
    const associations = await CandidateJobAssociation.findAll({
      include: [
        { model: Candidate, as: 'candidate' },
        { model: JobPosting, as: 'jobPosting' }
      ]
    });
    res.status(200).json(associations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
