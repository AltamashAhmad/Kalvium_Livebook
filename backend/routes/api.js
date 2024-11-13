const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const Module = require('../models/Module');

// Get all courses
router.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find().select('-modules');
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get course by ID with modules
router.get('/courses/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('modules');
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get module content
router.get('/modules/:id', async (req, res) => {
    try {
        const module = await Module.findById(req.params.id);
        if (!module) {
            return res.status(404).json({ message: 'Module not found' });
        }
        res.json(module);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get modules for a specific course
router.get('/courses/:courseId/modules', async (req, res) => {
    try {
        const modules = await Module.find({ courseId: req.params.courseId });
        res.json(modules);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update course progress (you can add this later)
router.post('/courses/:courseId/progress', async (req, res) => {
    // Add progress tracking logic here
    res.status(501).json({ message: 'Not implemented yet' });
});

module.exports = router; 