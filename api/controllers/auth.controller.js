class AuthController {
  async Login(req, res) {
    return res.send("From AuthController");
  }
}

module.exports = AuthController;
