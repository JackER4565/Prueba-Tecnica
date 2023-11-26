const Openpay = require("openpay");
const openpay = new Openpay(
	process.env.OPENPAY_ID,
	process.env.OPENPAY_PRIVATE,
	false
);
const db = require("../db");

//get all customers
const getCustomers = async (req, res) => {
	const { creation, offset, limit } = req.body;

	const searchParams = {
		creation: creation || undefined,
		offset: offset || 0,
		limit: limit || 10,
	};
	openpay.customers.list(searchParams, function (error, body, response) {
		if (error) {
			res.status(error.http_code).send({
				message: "Openpay List Search Error",
				error: error.description,
			});
		} else {
			res.status(200).send({
				message: "Customers List Found Successfully",
				response: response,
			});
		}
	});
};

//get all customers from DB
const getCustomersDB = async (req, res) => {
	db.query("SELECT * FROM users", (err, result) => {
		if (err) {
			res.status(500).send({ message: "Server Error", error: err });
			return;
		}
		res.status(200).send(result);
	});
};

//get one customer
const getCustomer = async (req, res) => {
	const customerId = req.params.id;
	if (!customerId) {
		return {
			message: "Id can not be empty",
		};
	}
	openpay.customers.get(customerId, function (error, body, response) {
		if (error) {
			res
				.status(error.http_code)
				.send({ message: "Openpay Search Error", error: error.description });
		} else {
			res.status(200).send({
				message: "Customer Found Successfully",
				response: response,
			});
		}
	});

};

//create a customer
const createCustomer = async (req, res) => {
	const {
		name,
		last_name,
		email,
		phone_number,
		line1,
		line2,
		line3,
		postal_code,
		state,
		city,
		country_code,
	} = req.body;

	if (!name || !last_name || !email || !phone_number) {
		return res.status(400).send({
			message: "Name, last name, email and phone number are required",
		});
	}

	const newCustomer = {
		name: name,
		last_name: last_name,
		email: email,
		phone_number: phone_number,
		address: {
			line1: line1,
			line2: line2,
			line3: line3,
			postal_code: postal_code,
			state: state,
			city: city,
			country_code: country_code,
		},
	};
	openpay.customers.create(newCustomer, (error, customer) => {
		if (error) {
			res
				.status(error.http_code)
				.send({ message: "Openpay Create Error", error: error.description });
		} else {
			db.query(
				"INSERT INTO users SET ?",
				{
					id: customer.id,
					name: customer.name,
					last_name: customer.last_name,
					email: customer.email,
					phone_number: customer.phone_number,
					line1: customer.address.line1,
					line2: customer.address.line2,
					postal_code: customer.address.postal_code,
					state: customer.address.state,
					city: customer.address.city,
					country_code: customer.address.country_code,
				},
				(err, result) => {
					if (err) {
						res
							.status(500)
							.send({ message: "DB user insertion Error", error: err });
						return;
					}

					res.status(200).send({
						message: "Customer Created Successfully",
						response: customer,
					});
				}
			);
		}
	});
};

//delete a customer
const deleteCustomer = async (req, res) => {
	const customerId = req.params.id;
	if (!customerId) {
		return res.status(400).send({
			message: "Id can not be empty",
		});
	}

	openpay.customers.delete(customerId, function (error, body, response) {
		if (error) {
			res
				.status(error.http_code)
				.send({ message: "Openpay Delete Error", error: error.description });
		} else {
			db.query(
				"DELETE FROM users WHERE id = ?",
				[customerId],
				(err, result) => {
					if (err) {
						res
							.status(500)
							.send({ message: "DB user deletion Error", error: err });
						return;
					}
					res.status(200).send({
						message: "Customer Deleted Successfully",
						response: response,
					});
				}
			);
		}
	});
};

//update a customer
const updateCustomer = async (req, res) => {
	
	if (!req.body || Object.keys(req.body).length === 0) {
		return res.status(400).send({
			message: "Content can not be empty",
		});
	}
	const customerId = req.params.id;
	if (!customerId) {
		return res.status(400).send({
			message: "Id can not be empty",
		});
	}
	const {
		name,
		last_name,
		email,
		phone_number,
		line1,
		line2,
		line3,
		postal_code,
		state,
		city,
		country_code,
	} = req.body;

	openpay.customers.get(customerId, function (error, body, response) {
		if (error) {
			res
				.status(error.http_code)
				.send({ message: "Openpay Search Error", error: error.description });
		} else {
			const newData = {
				name: name || body.name,
				last_name: last_name || body.last_name,
				email: email || body.email,
				phone_number: phone_number || body.phone_number,
				address: {
					line1: line1 || body.address.line1,
					line2: line2 || body.address.line2,
					line3: line3 || body.address.line3,
					postal_code: postal_code || body.address.postal_code,
					state: state || body.address.state,
					city: city || body.address.city,
					country_code: country_code || body.address.country_code,
				},
			};
			openpay.customers.update(customerId, newData, (error, customer) => {
				if (error) {
					res
						.status(500)
						.send({
							message: "Openpay Update Error",
							error: error.description,
						});
				} else {
					db.query(
						"UPDATE users SET ? WHERE id = ?",
						[
							{
								name: customer.name,
								last_name: customer.last_name,
								email: customer.email,
								phone_number: customer.phone_number,
								line1: customer.address.line1,
								line2: customer.address.line2,
								postal_code: customer.address.postal_code,
								state: customer.address.state,
								city: customer.address.city,
								country_code: customer.address.country_code,
							},
							customerId,
						],
						(err, result) => {
							if (err) {
								res
									.status(500)
									.send({ message: "DB user update Error", error: err });
								return;
							}
							res.status(200).send({
								message: "Customer Updated Successfully",
								response: customer,
							});
						}
					);
				}
			});
		}
	});
};

module.exports = {
	getCustomers,
	getCustomersDB,
	getCustomer,
	createCustomer,
	deleteCustomer,
	updateCustomer,
};
