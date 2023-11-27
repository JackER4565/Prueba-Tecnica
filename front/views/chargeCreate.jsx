import styles from "./chargeCreate.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";

function ChargeCreate({ setShowForm, data}) {
	const url = "http://localhost:3000/charges";
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (formData) => {
		axios
			.post(url + "/" + data.id, formData)
			.then(() => {
				alert("Success!");
                setShowForm(false);
			})
			.catch((error) => {
				alert("Error:", error.message);
			});
	};

    function handleCancel() {
        console.log("cancel");
        setShowForm(false);
    }

	return (
        <>
        <div className={styles.background}></div>
		<div className={styles.container}>
			<h1>Create a Charge</h1>
			<form
				className={styles.form}
				onSubmit={handleSubmit(onSubmit)}>
				<label>Amount
				<input
					type="number"
					name="amount"
					placeholder="20"
					{...register("amount", {
						required: "Required",
						maxLength: {
							value: 10,
							message: "Max length is 10",
						},
						min: {
							value: 1,
							message: "Min value is 1",
						},
						max: {
							value: 1000000000,
							message: "Max value is 1000000000",
						},
						valueAsNumber: {
							value: true,
							message: "Must be a number",
						},
						pattern: {
							value: /^[0-9]+$/i,
							message: "Must be a number",
						},
						validate: {
							positive: (value) => value > 0 || "Must be a positive number",
						},
					})}
				/></label>
				{errors.amount && <p role="alert">{errors.amount?.message}</p>}
				<label>Description
				<input
					type="text"
					name="description"
					placeholder="Description"
					{...register("description", {
						required: "Required",
						maxLength: {
							value: 255,
							message: "Max length is 255",
						},
					})}
				/></label>
				{errors.description && (
					<p role="alert">{errors.description?.message}</p>
				)}
				<label>Currency
				<input
					type="text"
					name="currency"
					placeholder="MXN"
					{...register("currency", {
						required: "Required",
						maxLength: {
							value: 3,
							message: "Max length is 3",
						},
						minLength: {
							value: 3,
							message: "Min length is 3",
						},
						pattern: {
							value: /^[A-Z]+$/i,
							message: "Invalid currency format",
						},
					})}
				/></label>
				{errors.currency && <p role="alert">{errors.currency?.message}</p>}
                <div className={styles.formButtons}>
				<button type="submit">Submit</button>
				<button
					type="button"
					onClick={() => handleCancel()}>
					Cancel
				</button>
                </div>
			</form>
		</div>
        </>
	);
}

export default ChargeCreate;
