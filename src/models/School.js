import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const School = sequelize.define('School', {
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

export default School;
