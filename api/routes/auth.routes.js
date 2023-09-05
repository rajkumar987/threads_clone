const AuthController = require("../controllers/auth.controller");
module.exports = (router) => {
  const authController = new AuthController();

  router.get("/", authController.Login);

  return router;
};
