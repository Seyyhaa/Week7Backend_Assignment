import { DataTypes } from "sequelize";
import sequelize from "../db/database.js";


// TODO - Create the model User  (attributes name and age)
const  author = sequelize.define("Author", {
    name: DataTypes.STRING,
    birthYear: DataTypes.INTEGER
});

// TODO - Export the model User

export default author;