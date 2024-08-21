import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const JobPosting = sequelize.define('JobPosting', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('open', 'closed'),
    defaultValue: 'open',
  },
});

export default JobPosting;
