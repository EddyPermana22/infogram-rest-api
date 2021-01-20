"use strict";

class UserController {
  static register = async (req, res, next) => {
    try {
      res.status(200).json({
        message: `register success!`,
      });
    } catch (error) {
      next(error);
    }
  };

  static login = async (req, res, next) => {
    try {
      res.status(200).json({
        message: `login success!`,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UserController;
