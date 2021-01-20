"use strict";

const modelUser = require("../models").User;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const md5 = require("md5");

class UserController {
  static register = (req, res, next) => {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("Email Required!");
    }

    if (!password) {
      throw new Error("Password Required!");
    }

    modelUser
      .count({
        where: {
          email: email.toLowerCase().trim(),
        },
      })
      .then((userCount) => {
        if (userCount > 0) {
          throw new Error(
            `email ${email} has been registred, please try register another email!`
          );
        } else {
          return modelUser.create({
            email: email.toLowerCase().trim(),
            password: password,
          });
        }
      })
      .then((user) => {
        res.status(201).json({
          message: `Registration Success !`,
          user,
        });
      })
      .catch(next);
  };

  static login = (req, res, next) => {
    modelUser
      .findOne({
        where: {
          email: req.body.email.toLowerCase().trim(),
        },
      })
      .then((user) => {
        if (
          !user ||
          !bcrypt.compareSync(req.body.password || "", user.password)
        ) {
          next({
            message: `Invalid email / Password !`,
          });
        } else {
          const payload = {
            userID: user.id,
            checker: md5(user.updatedAt),
          };
          const access_token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
          res.status(200).json({
            message: `signin success`,
            access_token,
          });
        }
      })
      .catch(next);
  };
}

module.exports = UserController;
