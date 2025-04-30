// const express=require('express');
// const app=express();
// const port=4004;
// const cors=require('cors');
// const connectDB = require('./db');
// const {apiRouter} = require('./routes/index');
// // app.get('/',(req,res)=>{
// //     res.send('Hello World');
// // });

// app.use(cors());
// app.use('/uploads', express.static('uploads')); // serve static im

// app.use(express.json());

// app.use('/api',apiRouter);

// connectDB();
// app.listen(port,()=>{
//     console.log(`Server is running on port ${port}`);
// });
const express = require('express');
const app = express();
const port = 4004;
const cors = require('cors');
const connectDB = require('./db');
const { apiRouter } = require('./routes/index');
const path = require("path");

app.use(
  cors(
  //   {
  //   origin: 'http://localhost:5173', // Allow frontend origin
  //   methods: ['GET', 'POST', 'PUT', 'DELETE'],
  //   allowedHeaders: ['Content-Type', 'Authorization'],
  // }
)
);

// Serve static files (images)
// app.use('/uploads', express.static('Uploads')); // Serve static images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Routes
app.use('/api', apiRouter);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Connect to the database
connectDB();

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
