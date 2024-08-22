import { Sequelize } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  email: { type: Sequelize.STRING, unique: true, allowNull: false },
  username: { type: Sequelize.STRING, unique: true, allowNull: false },
  passwordHash: { type: Sequelize.STRING, allowNull: false },
  role: { type: Sequelize.STRING, allowNull: false }
});

export default User;
