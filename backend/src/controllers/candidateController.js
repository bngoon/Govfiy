import Candidate from '../models/Candidate.js';

// Create a new candidate
export const createCandidate = async (req, res) => {
  try {
    const { name, email } = req.body;
    const candidate = await Candidate.create({ name, email, userId: req.user.id }); // Associate with logged-in user
    res.status(201).json(candidate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all candidates
export const getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.findAll({ where: { userId: req.user.id } }); // Fetch only the user's candidates
    res.status(200).json(candidates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get a single candidate by ID
export const getCandidateById = async (req, res) => {
  try {
    const { id } = req.params;
    const candidate = await Candidate.findOne({ where: { id, userId: req.user.id } }); // Ensure the candidate belongs to the user
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found or not owned by you' });
    }
    res.status(200).json(candidate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update a candidate
export const updateCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const candidate = await Candidate.findOne({ where: { id, userId: req.user.id } }); // Ensure the candidate belongs to the user
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found or not owned by you' });
    }
    candidate.name = name;
    candidate.email = email;
    await candidate.save();
    res.status(200).json(candidate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a candidate
export const deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const candidate = await Candidate.findOne({ where: { id, userId: req.user.id } }); // Ensure the candidate belongs to the user
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found or not owned by you' });
    }
    await candidate.destroy();
    res.status(204).json({ message: 'Candidate deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
