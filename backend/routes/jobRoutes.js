const express = require('express');
const Job = require('../models/Job');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Create Job (protected)
router.post('/', protect, async (req, res) => {
  const { title, description, company, location, salary } = req.body;
  try {
    const job = new Job({
      title, description, company, location, salary, createdBy: req.user._id
    });
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().populate('createdBy', 'name');
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('createdBy', 'name');
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Job (protected)
router.put('/:id', protect, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    if (job.createdBy.toString() !== req.user._id.toString())
      return res.status(403).json({ error: 'Unauthorized' });

    Object.assign(job, req.body);
    await job.save();
    res.json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Job (protected)
router.delete('/:id', protect, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    if (job.createdBy.toString() !== req.user._id.toString())
      return res.status(403).json({ error: 'Unauthorized' });

    await job.deleteOne();
    res.json({ message: 'Job deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

