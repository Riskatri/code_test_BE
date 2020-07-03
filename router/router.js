const verifySignUp = require("./verifySignUp");
const authJwt = require("./verifyJwtToken");
const authController = require("../controller/authController.js");
const activityController = require("../controller/activityController");

module.exports = function (app) {
  app.post(
    "/signup",
    [
      verifySignUp.checkDuplicateUserNameOrEmail,
      // verifySignUp.checkRolesExisted
    ],
    authController.validate("signup"),
    authController.signup
  );
  app.post("/login", authController.signin);
  app.post("/activity", [authJwt.verifyToken], activityController.activity);
  app.get("/activity", [authJwt.verifyToken], activityController.seeActivity);
  app.get(
    "/activity/:id",
    [authJwt.verifyToken],
    activityController.findActivityById
  );
  app.put(
    "/activity/:id",
    [authJwt.verifyToken],
    activityController.updateActivity
  );
  app.delete(
    "/activity/:id",
    [authJwt.verifyToken],
    activityController.deleteActivity
  );
};
