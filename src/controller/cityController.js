import City from "../models/City.js";
import School from "../models/School.js";

export const createCity = async (req, res) => {
    try {
        const { name } = req.body;

        const newCity = await City.create({
            name
        });

        res.status(201).json({
            message: 'A new city has been created!',
            City: newCity
        });
    } catch (error) {
        console.error("Error creating City:", error);
        res
            .status(500)
            .json({ message: "Error creating City", error: error.message });
    }
};

export const getAllCities = async (req, res) => {
    try {
        const cities = await City.findAll();
        res.json({
            message: 'All Cities fetched successfully!',
            cities
        });
    } catch (error) {
        console.error("Error getting all Cities:", error);
        res
            .status(500)
            .json({ message: "Error getting all Cities", error: error.message });
    }
};

export const getCityById = async (req, res) => {
    try {
        const cityId = req.params.id;
        if (!cityId) {
            return res.status(400).json({ message: "Please Provide City Id" });
        }
        const city = await City.findByPk(cityId);

        if (!city) {
            return res.status(404).json({ message: "City not found" });
        }
        res.json({
            message: 'City fetched successfully!',
            city
        });
    } catch (error) {
        console.error("Error getting City by ID:", error);
        res
            .status(500)
            .json({ message: "Error getting City by ID", error: error.message });
    }
};

export const getSchoolsByCityId = async (req, res) => {
    try {
        const cityId = req.params.id;
        if (!cityId) {
            return res.status(400).json({ message: "Please Provide City Id" });
        }
        const city = await City.findByPk(cityId, {
            include: [
                {
                    model: School,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                }
            ]
        });

        if (!city) {
            return res.status(404).json({ message: "City not found" });
        }
        res.json({
            message: 'City fetched successfully!',
            city
        });
    } catch (error) {
        console.error("Error getting City by ID:", error);
        res
            .status(500)
            .json({ message: "Error getting City by ID", error: error.message });
    }
};

export const updateCity = async (req, res) => {
    try {
        const cityId = req.params.id;
        const { name } = req.body;

        const city = await City.findByPk(cityId);
        if (!city) {
            return res.status(404).json({ message: "City not found" });
        }

        await City.update({ name });

        res.json({ message: "City updated successfully" });
    } catch (error) {
        console.error("Error updating City:", error);
        res
            .status(500)
            .json({ message: "Error updating City", error: error.message });
    }
};

export const deleteCity = async (req, res) => {
    try {
        const cityId = req.params.id;

        const city = await City.findByPk(cityId);
        if (!city) {
            return res.status(404).json({ message: "City not found" });
        }

        await City.destroy();

        res.json({ message: "City deleted successfully" });
    } catch (error) {
        console.error("Error deleting City:", error);
        res
            .status(500)
            .json({ message: "Error deleting City", error: error.message });
    }
};
