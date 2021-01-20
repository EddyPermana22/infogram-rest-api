"use strict";

const UserRouter = require("express").Router();

UserRouter.post("/register", (req, res, next) => {
    res.send("register")
});

UserRouter.post("/login", (req, res, next) => {
    res.send("login")
});

module.exports = UserRouter;
