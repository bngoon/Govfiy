import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database.js';

// Import routes
import candidateRoutes from './routes/candidateRoutes.js';
import jobPostingRoutes from './routes/jobPostingRoutes.js';
import candidateJobAssociationRoutes from './routes/candidateJobAssociationRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());

// Use the routes
app.use('/api/candidates', candidateRoutes);
app.use('/api/job-postings', jobPostingRoutes);
app.use('/api/associations', candidateJobAssociationRoutes);
app.use('/api/users', userRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Sync database and start server
sequelize.sync().then(() => {
  console.log('Database connected...');
}).catch(err => console.log('Error: ' + err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
