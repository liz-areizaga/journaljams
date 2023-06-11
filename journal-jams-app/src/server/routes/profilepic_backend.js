const express = require('express');
const router = express.Router();
const multer = require('multer');
const Image = require('../../Models/ProfilePics');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/newProfilePic', upload.single('image'), async (req, res) => {
  console.log('Inside of /api/newProfilePic');
  try {
    const image = new Image({
      data: req.file.buffer,
      contentType: req.file.mimetype,
    });

    await image.save();
    res.status(200).json({ id: image._id });
  } catch (error) {
    console.error('Failed to upload image', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

module.exports = router;
