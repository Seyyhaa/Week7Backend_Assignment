import sequelize from '../db/database.js';
import { DataTypes } from 'sequelize';

const book = sequelize.define('Book', {
    title: DataTypes.STRING,
    publicationYear: DataTypes.INTEGER,
    pages: DataTypes.INTEGER
});

export default book;