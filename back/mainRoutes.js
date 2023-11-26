const { Router } = require("express");
const router = Router();
const verifyJWT = require("./utils/verifyJwt");
const loginRouter = require("./routes/loginRouter");
const usersRouter = require("./routes/usersRouter");
const chargesRouter = require("./routes/chargesRouter");



router.use("/customers", verifyJWT,  usersRouter);
router.use("/charges", verifyJWT,  chargesRouter);
router.use("/login", loginRouter);


module.exports = router;
