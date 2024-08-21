import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Candidate from './Candidate.js';
import JobPosting from './JobPosting.js';

const CandidateJobAssociation = sequelize.define('CandidateJobAssociation', {
  candidateId: {
    type: DataTypes.INTEGER,
    references: {
      model: Candidate,
      key: 'id',
    },
  },
  jobPostingId: {
    type: DataTypes.INTEGER,
    references: {
      model: JobPosting,
      key: 'id',
    },
  },
});

export default CandidateJobAssociation;
