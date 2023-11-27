import styles from "./home.module.css";
import Charges from "../../components/charges/charges";
import Users from "../../components/users/users";
import Form from "../form/form";
import ChargeCreate from "../chargeCreate/chargeCreate";
import { useHomeData } from "../../helpers/useHomeData";

function Home() {
	const {
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
	} = useHomeData();

	if (loading)
		return (
			<div className={styles.container}>
				<h1>Loading...</h1>
			</div>
		);
	return (
		<>
			<div className={styles.background}></div>

			<div className={styles.container}>
				{showForm && (
					<Form
						data={selectedUser}
						setShowForm={setShowForm}
						createUser={createUser}
						updateUser={updateUser}
					/>
				)}
				{showChargeForm && (
					<ChargeCreate
						data={selectedUser}
						setShowForm={setShowChargeForm}
						chargeSubmit={chargeSubmit}
					/>
				)}
				<Users
					users={users}
					handleEdit={handleEdit}
					handleCreate={handleCreate}
					handleDelete={handleDelete}
					handleCreateCharge={handleCreateCharge}
				/>

				<Charges charges={charges} />
			</div>
		</>
	);
}

export default Home;
