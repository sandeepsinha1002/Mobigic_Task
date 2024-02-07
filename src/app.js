const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const connectDB = require('./config/db');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/file');

require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

connectDB();

// Dummy secret key for demonstration purposes
const secretKey = 'your-secret-key';

// Middleware to check and verify tokens
// app.use((req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized - Token not provided' });
//   }

//   try {
//     const decoded = jwt.verify(token.split(' ')[1], secretKey);
//     req.userData = decoded;
//     next();
//   } catch (error) {
// //     return res.status(401).json({ message: 'Unauthorized - Invalid token' });
// //   }
// // });

// const protect = asyncHandler(async (req, res, next) => {
//     let token;
  
//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith("Bearer")
//     ) {
//       try {
//         token = req.headers.authorization.split(" ")[1];
  
//         //decodes token id
//         const decoded = jwt.verify(token, "thisisasecretkey");
  
//         req.user = await User.findById(decoded.id).select("-password");
  
//         next();
//       } catch (error) {
//         res.status(401);
//         throw new Error("Not authorized, token failed");
//       }
//     }
  
//     if (!token) {
//       res.status(401);
//       throw new Error("Not authorized, no token");
//     }
//   });
  

app.use('/auth', authRoutes);
app.use('/file', fileRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
