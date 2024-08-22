import JobPosting from '../models/JobPosting.js';

// Create a new job posting (this should automatically associate with the current user)
export const createJobPosting = async (req, res) => {
  try {
    const jobPosting = await JobPosting.create({
      ...req.body,
      userId: req.user.id,  // Associate the job posting with the logged-in user
    });
    res.status(201).json(jobPosting);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all job postings (TO:DO filter this to only return the logged-in user's postings)
export const getAllJobPostings = async (req, res) => {
  try {
    const jobPostings = await JobPosting.findAll({ where: { userId: req.user.id } });
    res.status(200).json(jobPostings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get a job posting by ID (only if it belongs to the logged-in user)
export const getJobPostingById = async (req, res) => {
  try {
    const jobPosting = await JobPosting.findOne({ where: { id: req.params.id, userId: req.user.id } });

    if (!jobPosting) {
      return res.status(404).json({ message: 'Job Posting not found' });
    }

    res.status(200).json(jobPosting);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update a job posting (only if it belongs to the logged-in user)
export const updateJobPosting = async (req, res) => {
  try {
    const jobPosting = await JobPosting.findOne({ where: { id: req.params.id, userId: req.user.id } });

    if (!jobPosting) {
      return res.status(404).json({ message: 'Job Posting not found' });
    }

    const updatedJobPosting = await jobPosting.update(req.body);
    res.status(200).json(updatedJobPosting);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a job posting (only if it belongs to the logged-in user)
export const deleteJobPosting = async (req, res) => {
  try {
    const jobPosting = await JobPosting.findOne({ where: { id: req.params.id, userId: req.user.id } });

    if (!jobPosting) {
      return res.status(404).json({ message: 'Job Posting not found' });
    }

    await jobPosting.destroy();
    res.status(200).json({ message: 'Job Posting deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
