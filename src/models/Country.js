import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import City from "./City.js";

const Country = sequelize.define('Country', {
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

Country.hasMany(City);
City.belongsTo(Country);

export default Country;
