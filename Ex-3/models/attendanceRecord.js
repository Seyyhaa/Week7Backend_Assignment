import { DataTypes } from 'sequelize';
import sequelize from '../db/database.js';

const AttendanceRecord = sequelize.define('AttendanceRecord', {
  date: DataTypes.DATEONLY,
  present: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

export default AttendanceRecord;
