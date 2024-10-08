const express = require('express');
const userRoutes = require('./routes/userRoutes');
const logger = require('./middlewares/logger');

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Use the logging middleware
app.use(logger);

// Use user routes
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
