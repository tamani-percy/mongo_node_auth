const express = require('express');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB().then(r => console.log('Successfully connected'));

// Parse JSON request body
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Define routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});