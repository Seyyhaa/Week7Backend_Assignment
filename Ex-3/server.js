import express from 'express';
import sequelize from './db/database.js';
import Student from './models/student.js';
import Class from './models/class.js';
// import AttendanceRecord from './models/attendanceRecord.js';
import AttendanceRecord from './models/attendanceRecord.js';
import attendanceRoutes from './routes/attendanceRoutes.js';

const app = express();
app.use(express.json());
app.use(attendanceRoutes);

// Relationships
Student.belongsToMany(Class, { through: AttendanceRecord });
Class.belongsToMany(Student, { through: AttendanceRecord });
AttendanceRecord.belongsTo(Student);
AttendanceRecord.belongsTo(Class);
Student.hasMany(AttendanceRecord);
Class.hasMany(AttendanceRecord);

// Sync DB and start server
try {
  await sequelize.sync({ force: true });

  // Sample data (optional)
  const s1 = await Student.create({ name: "Seyha" });
  const s2 = await Student.create({ name: "Davin" });
  const c1 = await Class.create({ name: "Math 101" });
  const c2 = await Class.create({ name: "Science 202" });

  console.log("Database synced");
  
  app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
  });
} catch (error) {
  console.error("Error syncing DB:", error);
}
