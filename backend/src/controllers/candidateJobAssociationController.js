import CandidateJobAssociation from '../models/CandidateJobAssociation.js';
import Candidate from '../models/Candidate.js';
import JobPosting from '../models/JobPosting.js';

// Associate a candidate with a job posting
export const createCandidateJobAssociation = async (req, res) => {
  try {
    const { candidateId, jobPostingId } = req.body;

    // Check if the candidate belongs to the logged-in user
    const candidate = await Candidate.findOne({ where: { id: candidateId, userId: req.user.id } });
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found or not owned by you' });
    }

    // Check if the job posting belongs to the logged-in user
    const jobPosting = await JobPosting.findOne({ where: { id: jobPostingId, userId: req.user.id } });
    if (!jobPosting) {
      return res.status(404).json({ message: 'Job Posting not found or not owned by you' });
    }

    // Create the association if both belong to the user
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
        {
          model: Candidate,
          as: 'candidate',
          where: { userId: req.user.id }  // Ensure the candidate belongs to the user
        },
        {
          model: JobPosting,
          as: 'jobPosting',
          where: { userId: req.user.id }  // Ensure the job posting belongs to the user
        }
      ]
    });
    res.status(200).json(associations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get a single association by ID
export const getCandidateJobAssociationById = async (req, res) => {
  try {
    const { id } = req.params;
    const association = await CandidateJobAssociation.findOne({
      where: { id, userId: req.user.id }, // Ensure the association belongs to the user
      include: [
        {
          model: Candidate,
          as: 'candidate',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: JobPosting,
          as: 'jobPosting',
          attributes: ['id', 'title', 'description'],
        },
      ],
    });

    if (!association) {
      return res.status(404).json({ message: 'Association not found or not owned by you' });
    }

    res.status(200).json(association);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update an association
export const updateCandidateJobAssociation = async (req, res) => {
  try {
    const { id } = req.params;
    const { candidateId, jobPostingId } = req.body;

    const association = await CandidateJobAssociation.findOne({
      where: { id, userId: req.user.id }, // Ensure the association belongs to the user
    });

    if (!association) {
      return res.status(404).json({ message: 'Association not found or not owned by you' });
    }

    // Update the association
    association.candidateId = candidateId;
    association.jobPostingId = jobPostingId;
    await association.save();

    res.status(200).json(association);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete an association
export const deleteCandidateJobAssociation = async (req, res) => {
  try {
    const { id } = req.params;
    const association = await CandidateJobAssociation.findOne({ where: { id, userId: req.user.id } }); // Ensure the association belongs to the user

    if (!association) {
      return res.status(404).json({ message: 'Association not found or not owned by you' });
    }

    await association.destroy();
    res.status(204).json({ message: 'Association deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
