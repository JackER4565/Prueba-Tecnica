import { useEffect, useState } from "react";
import styles from "./users.module.css";
import axios from "axios";
import Form from "../../views/form";
import ChargeCreate from "../../views/chargeCreate";
import Charges from "../charges/charges";


function Users() {
	const url = "http://localhost:3000/customers";

	const [users, setUsers] = useState([]);
	const [showForm, setShowForm] = useState(false);
	const [showChargeForm, setShowChargeForm] = useState(false);
	const [loading, setLoading] = useState(false);
	const [selectedUser, setSelectedUser] = useState(false)

	useEffect(() => {
		if ( !showForm) getUsers();
	}, [showForm]);

	function getUsers() {
		setLoading(true);
		axios
			.get(url)
			.then((data) => {
				if (data.status !== 200) {
					throw Error(data.message);
				}
				setUsers(data.data.response.body);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error:", error);
				alert("Error getting users: " + error.message);
				setLoading(false);
			});
	}

	function handleEdit(id) {
		setSelectedUser(users.filter((user) => user.id === id)[0]);
		setShowForm(true);
	}

	function handleCreate() {
		setSelectedUser(false);
		setShowForm(true);
	}

	function handleDelete(id) {
		if (!window.confirm("Are you sure you want to delete this user?")) return;
		axios
			.delete(url + "/" + id)
			.then(({ data }) => {
				alert("Success deleting user: " + data.message);
				getUsers();
			})
			.catch(({ response }) => {
				alert("Error deleting user: " + response.data.error);
			});
	}

	function handleCreateCharge(id) {
		setSelectedUser(users.filter((user) => user.id === id)[0]);
		setShowChargeForm(true);
	}

	if (loading)
		return (
			<div className={styles.container}>
				<h1>Loading...</h1>
			</div>
		);
	return (
		<>
			<div className={styles.container}>
				{showForm && <Form
					data={selectedUser}
					setShowForm={setShowForm}
				/>}
				{showChargeForm && <ChargeCreate
					data={selectedUser}
					setShowForm={setShowChargeForm}
				/>}
				<div
					className={styles.listUsers}
					name="listUsers">
					<h1>Users</h1>
					{users.length !== 0 ? (
						<>
							<table>
								<thead>
									<tr>
										<th>Id</th>
										<th>Name</th>
										<th>Last Name</th>
										<th>Phone</th>
										<th>Email</th>
										<th>Address</th>
										<th>Postal Code</th>
										<th>City</th>
										<th>State</th>
										<th>Country</th>
										<th>Created</th>
										<th>Edit</th>
										<th>Delete</th>
										<th>Create Charge</th>
									</tr>
								</thead>
								<tbody>
									{users.map((user) => (
										<tr key={user.id}>
											<td>{user.id}</td>
											<td>{user.name}</td>
											<td>{user.last_name}</td>
											<td>{user.phone_number}</td>
											<td>{user.email}</td>
											<td>{`${user.address.line1} ${user.address.line2}`}</td>
											<td>{user.address.postal_code}</td>
											<td>{user.address.city}</td>
											<td>{user.address.state}</td>
											<td>{user.address.country_code}</td>
											<td>
												{new Date(user.creation_date).toLocaleDateString(
													"es-MX"
												)}
											</td>
											<td>
												<button onClick={() => handleEdit(user.id)}>
													Edit
												</button>
											</td>
											<td>
												<button onClick={() => handleDelete(user.id)}>
													Delete
												</button>
											</td>
											<td>
												<button onClick={() => handleCreateCharge(user.id)}>
													Create Charge
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
							<div className={styles.createUser}>
								<button onClick={() => handleCreate()}>Create User</button>
							</div>
						</>
					) : (
						<>
							{" "}
							<br /> <br />
							<h1>No data to show...</h1>
						</>
					)}
				</div>
			</div>
			<Charges />
		</>
	);
}

export default Users;
