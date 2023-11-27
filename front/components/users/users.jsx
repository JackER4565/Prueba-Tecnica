import styles from "./users.module.css";

function Users({
	users,
	handleCreate,
	handleEdit,
	handleDelete,
	handleCreateCharge,
}) {
	return (
		<>
		{users && 
			<div className={styles.container}>
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
		}
		</>
	);
}

export default Users;
