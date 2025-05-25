const express = require('express');
const multer = require('multer');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const { OpenAI } = require('openai');
const Resume = require('../models/Resume');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Setup OpenAI v4
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Upload Resume with AI Parsing
router.post('/upload', protect, upload.single('resume'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    const resumeText = pdfData.text;

    // Call OpenAI Chat Completion to extract data
    const prompt = `Extract key skills, years of experience, and education from the following resume:\n\n${resumeText}\n\nExtracted Data:`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
    });

    const extractedData = completion.choices[0].message.content.trim();

    const resume = new Resume({
      user: req.user._id,
      filePath,
      extractedData,
    });
    await resume.save();

    res.status(201).json({ message: 'Resume uploaded and parsed successfully', resume });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

