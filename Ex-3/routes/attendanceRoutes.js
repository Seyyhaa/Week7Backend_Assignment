import express from 'express';
import Student from '../models/student.js';
import Class from '../models/class.js';
import AttendanceRecord from '../models/attendanceRecord.js';

const router = express.Router();

// POST /attendance?studentId=1&classId=2&date=2025-06-26
router.post('/attendance', async (req, res) => {
  const { studentId, classId, date } = req.query;
  try {
    const record = await AttendanceRecord.create({
      StudentId: studentId,
      ClassId: classId,
      date,
    });
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /attendance?studentId=1
router.get('/attendance', async (req, res) => {
  const { studentId } = req.query;
  try {
    const records = await AttendanceRecord.findAll({
      where: { StudentId: studentId },
      include: [Class],
    });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /classes/:id/attendance
router.get('/classes/:id/attendance', async (req, res) => {
  const classId = req.params.id;
  try {
    const records = await AttendanceRecord.findAll({
      where: { ClassId: classId },
      include: [Student],
    });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /students/:id/attendance
router.get('/students/:id/attendance', async (req, res) => {
  const studentId = req.params.id;
  try {
    const records = await AttendanceRecord.findAll({
      where: { StudentId: studentId },
      include: [Class],
    });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
