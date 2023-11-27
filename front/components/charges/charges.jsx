import styles from "./charges.module.css";
import PropTypes from "prop-types";

Charges.propTypes = {
	charges: PropTypes.array,
};

function Charges({ charges }) {

	return (
        <>
        {charges &&
		<div className={styles.container}>
			<h1>Charges</h1>
			{charges.length === 0 ? (
				<p>No charges found</p>
			) : (
				<div className={styles.listCharges}>
					<table className={styles.table}>
						<thead>
							<tr>
								<th>Id</th>
								<th>Customer Id</th>
								<th>Customer Name</th>
								<th>Description</th>
								<th>Amount</th>
								<th>Method</th>
								<th>Currency</th>
								<th>Barcode Url</th>
								<th>Transaction Type</th>
								<th>Status</th>
								<th>Created At</th>
							</tr>
						</thead>
						<tbody>
							{charges.map((charge) => (
								<tr key={charge.id}>
									<td>{charge.id}</td>
									<td>{charge.customer_id}</td>
									<td>{charge.name}</td>
									<td>{charge.description}</td>
									<td>{charge.amount}</td>
									<td>{charge.method}</td>
									<td>{charge.currency}</td>
									<td>{charge.barcode_url}</td>
									<td>{charge.transaction_type}</td>
									<td>{charge.status}</td>
									<td>
										{new Date(charge.created_at).toLocaleDateString("es-MX")}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
        }
        </>
	);
}

export default Charges;
