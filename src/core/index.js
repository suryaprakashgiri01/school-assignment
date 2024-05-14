import express from "express";
import cors from "cors";

const appLoader = (app) => {
  app.use(
    cors({ origin: true, methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS" })
  );

  app.use(express.urlencoded({ extended: true }));

  app.use(
    express.json({
      limit: "50mb",
    })
  );
};

export default appLoader;
