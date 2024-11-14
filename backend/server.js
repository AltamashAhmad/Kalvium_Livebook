require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');
const path = require('path');

const app = express();

// CORS configuration
app.use(cors({
    origin: '*',  // Be more specific in production
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Serve static files from frontend directory
app.use('/assets', express.static(path.join(__dirname, '../frontend/assets')));

// Routes
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 