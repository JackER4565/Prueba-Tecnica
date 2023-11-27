import { useState, useEffect } from "react";
import axios from "axios";

export function useHomeData() {
	const url = "http://localhost:3000";
	const [charges, setCharges] = useState([]);
	const [loading, setLoading] = useState(false);
	const [users, setUsers] = useState([]);
	const [showForm, setShowForm] = useState(false);
	const [showChargeForm, setShowChargeForm] = useState(false);
	const [selectedUser, setSelectedUser] = useState(false);

	async function getData() {
		setLoading(true);
		axios
			.get(`${url}/charges`)
			.then((data) => {
				if (data.status !== 200) {
					throw Error(data.message);
				}
				setCharges(data.data.response);
			})
			.catch((error) => {
				alert("Error getting charges: " + error.message);
				if (error.response.data.message == "Invalid Token") {
					localStorage.removeItem("token");
					window.location.reload();
				}
			});
		axios
			.get(`${url}/customers`)
			.then((data) => {
				if (data.status !== 200) {
					throw Error(data.message);
				}
				setUsers(data.data.response.body);
				setLoading(false);
			})
			.catch((error) => {
				alert("Error getting users: " + error.message);

				setLoading(false);
			});
	}

	async function handleEdit(id) {
		setSelectedUser(users.filter((user) => user.id === id)[0]);
		setShowForm(true);
	}

	async function handleCreate() {
		setSelectedUser(false);
		setShowForm(true);
	}

	async function handleDelete(id) {
		if (!window.confirm("Are you sure you want to delete this user?")) return;
		setLoading(true);
		axios
			.delete(`${url}/customers/${id}`)
			.then(({ data }) => {
				setLoading(false);
				alert("Success deleting user: " + data.message);
				getData();
			})
			.catch(({ response }) => {
				setLoading(false);
				alert("Error deleting user: " + response.data.error);
			});
	}

	async function updateUser(formValues) {
		setLoading(true);
		const jsonObject = { ...formValues };
		axios
			.put(`${url}/customers/${formValues.id}`, jsonObject)
			.then(() => {
				setLoading(false);
				alert("Success!");
				setShowForm(false);
				getData();
			})
			.catch((error) => {
				setLoading(false);
				alert("Error:", error.message);
			});
	}

	async function createUser(formValues) {
		setLoading(true);
		const jsonObject = { ...formValues };
		axios
			.post(`${url}/customers`, jsonObject)
			.then(() => {
				setLoading(false);
				alert("Success!");
				setShowForm(false);
				getData();
			})
			.catch((error) => {
				setLoading(false);
				alert("Error:", error.message);
			});
	}

	async function chargeSubmit(formData, id) {
		setLoading(true);
		axios
			.post(`${url}/charges/${id}`, formData)
			.then(() => {
				setLoading(false);
				alert("Success!");
				setShowChargeForm(false);
				getData();
			})
			.catch((error) => {
				setLoading(false);
				alert("Error:", error.message);
			});
	}

	async function handleCreateCharge(id) {
		setSelectedUser(users.filter((user) => user.id === id)[0]);
		setShowChargeForm(true);
	}

	useEffect(() => {
		getData();
	}, []);

	return {
		charges,
		loading,
		users,
		showForm,
		showChargeForm,
		selectedUser,
		setShowForm,
		setShowChargeForm,
		createUser,
		updateUser,
		chargeSubmit,
		handleCreate,
		handleDelete,
		handleEdit,
		handleCreateCharge,
	};
}
