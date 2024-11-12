const express = require('express');
const router = express.Router();
const students = require('../data/studentData');
const courses = require('../data/courseData');

// Get all students
router.get('/students', (req, res) => {
    res.json(students);
});

// Get student by ID
router.get('/students/:id', (req, res) => {
    const student = students.find(s => s.id == req.params.id);
    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ error: 'Student not found' });
    }
});

// Get all courses
router.get('/courses', (req, res) => {
    res.json(courses);
});

// CRUD Operations for Students
router.post('/students', (req, res) => {
    const newStudent = req.body;
    students.push(newStudent);
    res.status(201).json(newStudent);
});

router.put('/students/:id', (req, res) => {
    const studentIndex = students.findIndex(s => s.id == req.params.id);
    if (studentIndex !== -1) {
        students[studentIndex] = req.body;
        res.json(students[studentIndex]);
    } else {
        res.status(404).json({ error: 'Student not found' });
    }
});

router.delete('/students/:id', (req, res) => {
    const studentIndex = students.findIndex(s => s.id == req.params.id);
    if (studentIndex !== -1) {
        students.splice(studentIndex, 1);
        res.json({ message: 'Student deleted' });
    } else {
        res.status(404).json({ error: 'Student not found' });
    }
});

// Add course
router.post('/courses', (req, res) => {
    const newCourse = req.body;
    courses.push(newCourse);
    res.status(201).json(newCourse);
});

module.exports = router;
