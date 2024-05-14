import City from "../models/City.js";
import Country from "../models/Country.js";
import School from "../models/School.js";

export const createCountry = async (req, res) => {
    try {
        const { name } = req.body;

        const newCountry = await Country.create({
            name
        });

        res.status(201).json({
            message: 'A new contry has been created!',
            country: newCountry
        });
    } catch (error) {
        console.error("Error creating Country:", error);
        res
            .status(500)
            .json({ message: "Error creating Country", error: error.message });
    }
};

export const onboardCountry = async (req, res) => {
    try {
        const { countries } = req.body;
        const createdCountries = [];

        for (let i = 0; i < countries.length; i++) {
            const { name, cities } = countries[i];
            const newCountry = await Country.create({ name });
            createdCountries.push(newCountry);

            for (let j = 0; j < cities.length; j++) {
                const { name, schools } = cities[j];
                const newCity = await City.create({ name, CountryId: newCountry.id });

                for (let k = 0; k < schools.length; k++) {
                    const { name } = schools[k];
                    const newSchool = await School.create({ name, CityId: newCity.id });
                }
            }
        }

        res.status(201).json({
            message: 'Countries Onboarded!',
            countries: createdCountries
        });
    } catch (error) {
        console.error("Error creating Country:", error);
        res
            .status(500)
            .json({ message: "Error creating Country", error: error.message });
    }
};

export const getAllcountries = async (req, res) => {
    try {
        const countries = await Country.findAll();
        res.json({
            message: 'All Countries fetched successfully!',
            countries
        });
    } catch (error) {
        console.error("Error getting all countries:", error);
        res
            .status(500)
            .json({ message: "Error getting all countries", error: error.message });
    }
};

export const getCountryById = async (req, res) => {
    try {
        const countryId = req.params.id;
        if (!countryId) {
            return res.status(400).json({ message: "Please Provide Country Id" });
        }
        const country = await Country.findByPk(countryId, {
            include: [
                {
                    model: City,
                    include: [
                        {
                            model: School,
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            }
                        }
                    ],
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                }
            ]
        });

        if (!country) {
            return res.status(404).json({ message: "Country not found" });
        }
        res.json({
            message: 'Country fetched successfully!',
            country
        });
    } catch (error) {
        console.error("Error getting Country by ID:", error);
        res
            .status(500)
            .json({ message: "Error getting Country by ID", error: error.message });
    }
};

export const getCitiesByCountryId = async (req, res) => {
    try {
        const countryId = req.params.id;
        if (!countryId) {
            return res.status(400).json({ message: "Please Provide Country Id" });
        }
        const country = await Country.findByPk(countryId, {
            include: [
                {
                    model: City,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                }
            ]
        });

        if (!country) {
            return res.status(404).json({ message: "Country not found" });
        }
        res.json({
            message: 'Country fetched successfully!',
            country
        });
    } catch (error) {
        console.error("Error getting Country by ID:", error);
        res
            .status(500)
            .json({ message: "Error getting Country by ID", error: error.message });
    }
};

export const updateCountry = async (req, res) => {
    try {
        const countryId = req.params.id;
        const { name } = req.body;

        const country = await Country.findByPk(countryId);
        if (!country) {
            return res.status(404).json({ message: "Country not found" });
        }

        await country.update({ name });

        res.json({ message: "Country updated successfully" });
    } catch (error) {
        console.error("Error updating Country:", error);
        res
            .status(500)
            .json({ message: "Error updating Country", error: error.message });
    }
};

export const deleteCountry = async (req, res) => {
    try {
        const countryId = req.params.id;

        const country = await Country.findByPk(countryId);
        if (!country) {
            return res.status(404).json({ message: "Country not found" });
        }

        await country.destroy();

        res.json({ message: "Country deleted successfully" });
    } catch (error) {
        console.error("Error deleting Country:", error);
        res
            .status(500)
            .json({ message: "Error deleting Country", error: error.message });
    }
};
