const Openpay = require("openpay");
const openpay = new Openpay(
	process.env.OPENPAY_ID,
	process.env.OPENPAY_PRIVATE,
	false
);
const db = require('../db');

const createCharge = async (req, res) => {
	const {
		source_id,
		amount,
		description,
		currency,
		device_session_id = null,
	} = req.body;
	if (!amount || !description || !currency) {
		res.status(400).send({
			message: "All fields are required",
		});
	}
	const newCharge = {
		method: "store",
		source_id: source_id,
		amount: amount || undefined,
		description: description || undefined,
		currency: currency || undefined,
		device_session_id: device_session_id,
	};
	if (!req.params || !req.params.id) {
		res.status(400).send({
			message: "Id can not be empty",
		});
		return;
	}
	const customerId = req.params.id;


	openpay.customers.charges.create(
		customerId,
		newCharge,
		function (error, body, response) {
			if (error) {
				res.status(error.http_code).send({
					message: "Openpay Create Customer Charge Error",
					error: error.description,
				});
			} else {
				db.query(
					"INSERT INTO charges SET ?",
					{
						id: body.id,
						customer_id: body.customer_id,
						order_id: body.order_id,
						description: body.description,
						amount: body.amount,
						method: body.method,
						reference: body.reference,
						currency: body.currency,
						barcode_url: body.barcode_url,
						url_store: body.url_store,
						authorization: body.authorization,
						operation_type: body.operation_type,
						transaction_type: body.transaction_type,
						status: body.status,
						conciliated: body.conciliated,
					},
					(error, response) => {
						if (error) {
							res.status(500).send({
								message: "Error creating Customer Charge",
								error: error,
							});
							return;
						}
					}
				);

				res.status(200).send({
					message: "Customer Charge Created Successfully",
					response: response,
				});
			}
		}
	);
};

const getChargesDB = async (req, res) => {
    db.query("SELECT * FROM charges", (err, result) => {
        if (err) {
            res.status(500).send({ message: "DB Error", error: err });
            return;
        }
        res.status(200).send({
            message: "Charges retrieved successfully",
            response: result,
        });
    });
};

module.exports = {
	createCharge,
    getChargesDB,
};
