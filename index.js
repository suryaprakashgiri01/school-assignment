import express from "express";
import config from "config";

import appLoader from "./src/core/index.js";
import router from "./src/routes/index.js";
import { errorhandler } from "./src/middleware/index.js";
import initializeDatabase from "./src/models/index.js";

const app = express();
const PORT = config.get("port") || 8000;

appLoader(app);

app.get("/health-check", (req, res) => {
    res.json({
        message: "Server Reachable",
    });
});

app.use("/api", router);

app.use((req, res, next) => {
    res.status(404).send({ error: "Sorry, this page doesn't exist!" });
});

app.use(errorhandler);

app.listen(PORT, async () => {
    await initializeDatabase();
    return console.log(`Getting requests now on port ${PORT}`);
});