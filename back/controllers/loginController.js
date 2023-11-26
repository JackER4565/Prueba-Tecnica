const generateJwt = require("../utils/generateJwt");

const loginController = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400).send({ message: "Missing fields" });
		return;
	}

	if (email === "test@test.com" && password === "test") {
		res.status(200).send({ message: "Logged in", token: await generateJwt(email) });
		return;
	}

	res.status(500).send({ message: "Error" });
};

module.exports = { loginController };
