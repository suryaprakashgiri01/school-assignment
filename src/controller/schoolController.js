import School from "../models/School.js";

export const createSchool = async (req, res) => {
    try {
        const { name } = req.body;

        const newSchool = await School.create({
            name
        });

        res.status(201).json({
            message: 'A new school has been created!',
            School: newSchool
        });
    } catch (error) {
        console.error("Error creating School:", error);
        res
            .status(500)
            .json({ message: "Error creating School", error: error.message });
    }
};

export const getAllSchools = async (req, res) => {
    try {
        const schools = await School.findAll();
        res.json({
            message: 'All schools fetched successfully!',
            schools
        });
    } catch (error) {
        console.error("Error getting all schools:", error);
        res
            .status(500)
            .json({ message: "Error getting all schools", error: error.message });
    }
};

export const getSchoolById = async (req, res) => {
    try {
        const schoolId = req.params.id;
        if (!schoolId) {
            return res.status(400).json({ message: "Please Provide School Id" });
        }
        const school = await School.findByPk(schoolId);

        if (!school) {
            return res.status(404).json({ message: "School not found" });
        }
        res.json({
            message: 'School fetched successfully!',
            School
        });
    } catch (error) {
        console.error("Error getting School by ID:", error);
        res
            .status(500)
            .json({ message: "Error getting School by ID", error: error.message });
    }
};

export const updateSchool = async (req, res) => {
    try {
        const schoolId = req.params.id;
        const { name } = req.body;

        const school = await School.findByPk(schoolId);
        if (!school) {
            return res.status(404).json({ message: "School not found" });
        }

        await School.update({ name });

        res.json({ message: "School updated successfully" });
    } catch (error) {
        console.error("Error updating School:", error);
        res
            .status(500)
            .json({ message: "Error updating School", error: error.message });
    }
};

export const deleteSchool = async (req, res) => {
    try {
        const schoolId = req.params.id;

        const school = await School.findByPk(schoolId);
        if (!school) {
            return res.status(404).json({ message: "School not found" });
        }

        await School.destroy();

        res.json({ message: "School deleted successfully" });
    } catch (error) {
        console.error("Error deleting School:", error);
        res
            .status(500)
            .json({ message: "Error deleting School", error: error.message });
    }
};
