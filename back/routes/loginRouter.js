const { Router } = require("express");
const loginRouter = Router();

const { loginController } = require("../controllers/loginController");

//login
loginRouter.post("/", loginController);

module.exports = loginRouter;
