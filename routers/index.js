"use strict";

const Router = require("express").Router();

const UserRouter = require("./user");

Router.get("/", (req, res, next) => {
  res.status(200).json({
    message: `API Server Ready!`,
  });
});

Router.use("/users", UserRouter);

module.exports = Router;
