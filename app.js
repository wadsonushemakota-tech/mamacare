
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001; // Using a different port for backend

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// MongoDB Connection
const mongoURI = 'mongodb+srv://wadsonushemakota:Wadson%402004@momglow.tdel6un.mongodb.net/?appName=MomGlow';

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a simple Article Schema and Model
const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Article = mongoose.model('Article', articleSchema);

// API Routes
app.get('/api/articles', async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Basic test route
app.get('/', (req, res) => {
  res.send('Mom Glow Hub Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
