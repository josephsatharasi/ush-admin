const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: ['https://ush-admin-frontend.onrender.com', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Ush Admin Backend API' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
