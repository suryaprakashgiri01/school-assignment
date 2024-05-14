import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import School from "./School.js";

const City = sequelize.define('City', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: true,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

City.hasMany(School);
School.belongsTo(City);

export default City;
