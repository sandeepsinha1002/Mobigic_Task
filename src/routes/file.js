const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const File = require('../models/File');
const { protect } = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
  destination: 'src/uploads/',
  filename: (req, file, cb) => {
    const uniqueCode = crypto.randomBytes(3).toString('hex').toUpperCase();
    const filename = `${uniqueCode}_${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

router.post('/upload', protect, upload.single('file'), async (req, res) => {
  try {
    const userId = req.user._id; // Assuming userId is stored in the user model
    const { filename } = req.file;
    const uniqueCode = filename.split('_')[0];
    const link = `${process.env.APP_BASE_URL}/file/download/${uniqueCode}`; // Modify this based on your download route

    const file = new File({ filename, uniqueCode, userId, link });
    await file.save();

    res.status(201).json({
      message: 'File uploaded successfully',
      link: file.link, // Send the download link in the response
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


// Assuming you have something like this in your server code
router.get('/list', protect, async (req, res) => {
  try {
    // Assuming you have userId stored in req.user from the protect middleware
    const userId = req.user._id;
    
    const files = await File.find({ userId });
    res.json(files);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


router.post('/delete', async (req, res) => {
  try {
    // Implement file deletion logic here
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


router.get('/download/:uniqueCode',protect, async (req, res) => {
  try {
    const { uniqueCode } = req.params;
    const file = await File.findOne({ uniqueCode });

    if (!file) {
      return res.status(404).send('File not found');
    }

    const filePath = path.join(__dirname, '..', 'uploads', file.filename);

    res.download(filePath);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


// router.get('download/:uniqueCode',async(req,res)=>
// {
//     const file = await File.findOne({ uniqueCode: req.params });
//     if(!file)
//     {
//         return res.render('download',{ error : 'Link has expired'})
//     }

//     const filePath = path.join(__dirname, 'uploads', file.filename);
//     res.download(filePath);

// })


module.exports = router;
