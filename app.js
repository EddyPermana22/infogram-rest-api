"use strict";

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const Router = require("./routers");
const errorHandler = require("./middlewares/errorHandler");

const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(Router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server ready, listening on port ${port}`);
});
