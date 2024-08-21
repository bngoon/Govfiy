import JobPosting from '../models/JobPosting.js';

// Create a new job posting
export const createJobPosting = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const jobPosting = await JobPosting.create({ title, description, status });
    res.status(201).json(jobPosting);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all job postings
export const getAllJobPostings = async (req, res) => {
  try {
    const jobPostings = await JobPosting.findAll();
    res.status(200).json(jobPostings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get a single job posting by ID
export const getJobPostingById = async (req, res) => {
  try {
    const { id } = req.params;
    const jobPosting = await JobPosting.findByPk(id);
    if (!jobPosting) {
      return res.status(404).json({ message: 'Job Posting not found' });
    }
    res.status(200).json(jobPosting);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update a job posting
export const updateJobPosting = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const jobPosting = await JobPosting.findByPk(id);
    if (!jobPosting) {
      return res.status(404).json({ message: 'Job Posting not found' });
    }
    jobPosting.title = title;
    jobPosting.description = description;
    jobPosting.status = status;
    await jobPosting.save();
    res.status(200).json(jobPosting);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a job posting
export const deleteJobPosting = async (req, res) => {
  try {
    const { id } = req.params;
    const jobPosting = await JobPosting.findByPk(id);
    if (!jobPosting) {
      return res.status(404).json({ message: 'Job Posting not found' });
    }
    await jobPosting.destroy();
    res.status(204).json({ message: 'Job Posting deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
