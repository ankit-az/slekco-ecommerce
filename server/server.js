const dotenv = require('dotenv');
dotenv.config();

const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5000;

// Connect to Database & Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Slekco Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
});
