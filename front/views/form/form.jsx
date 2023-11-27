import styles from "./form.module.css";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";


Form.propTypes = {
	data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
	setShowForm: PropTypes.func,
	createUser: PropTypes.func,
	updateUser: PropTypes.func,
};


function Form({ data, setShowForm, createUser, updateUser }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			id: data ? data.id : undefined,
			name: data ? data.name : undefined,
			last_name: data ? data.last_name : undefined,
			phone_number: data ? data.phone_number : undefined,
			email: data ? data.email : undefined,
			line1: data ? data.address.line1 : undefined,
			line2: data ? data.address.line2 : undefined,
			postal_code: data ? data.address.postal_code : undefined,
			city: data ? data.address.city : undefined,
			state: data ? data.address.state : undefined,
			country_code: data ? data.address.country_code : undefined,
		},
	});

	const onSubmit = (data) => {
		if (data?.id) {
			updateUser(data);
		} else {
			createUser(data);
		}
	};


	function handleCancel() {
		setShowForm(false);
	}

	return (
		<>
			<div className={styles.background}></div>
			<div className={styles.container}>
				<form
					className={styles.form}
					onSubmit={handleSubmit(onSubmit)}>
					{data?.id !== undefined && (
						<label>
							Id:
							<input
								type="text"
								name="id"
								disabled
								{...register("id")}
							/>
						</label>
					)}
					<label>
						Name:
						<input
							type="text"
							name="name"
							placeholder="John"
							{...register("name", { required: "Required", maxLength: 20 })}
						/>
					</label>
					{errors.name && <p role="alert">{errors.name?.message}</p>}

					<label>
						Last Name:
						<input
							type="text"
							name="last_name"
							placeholder="Doe"
							{...register("last_name", {
								required: "Required",
								maxLength: 20,
							})}
						/>
					</label>
					{errors.last_name && <p role="alert">{errors.last_name?.message}</p>}
					<label>
						Phone Number:
						<input
							type="text"
							name="phone_number"
							placeholder="5555555555"
							{...register("phone_number", {
								required: "Required",
								maxLength: 10,
								pattern: {
									value: /^[0-9]+$/i,
									message: "Invalid phone number format",
								},
							})}
						/>
					</label>
					{errors.phone_number && (
						<p role="alert">{errors.phone_number?.message}</p>
					)}
					<label>
						Email:
						<input
							type="text"
							name="email"
							placeholder="test@email.com"
							{...register("email", {
								required: "Required",
								maxLength: 20,
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: "Invalid email address",
								},
							})}
						/>
					</label>
					{errors.email && <p role="alert">{errors.email?.message}</p>}
					<label>
						Address Line 1:
						<input
							type="text"
							name="line1"
							placeholder="Fake Street"
							{...register("line1", { required: "Required", maxLength: 20 })}
						/>
					</label>
					{errors.line1 && <p role="alert">{errors.line1?.message}</p>}
					<label>
						Address Line 2:
						<input
							type="text"
							name="line2"
							placeholder="123"
							{...register("line2", { required: "Required", maxLength: 20 })}
						/>
					</label>
					{errors.line2 && <p role="alert">{errors.line2?.message}</p>}
					<label>
						Postal Code:
						<input
							type="text"
							name="postal_code"
							placeholder="12345"
							{...register("postal_code", {
								required: "Required",
								maxLength: 10,
							})}
						/>
					</label>
					{errors.postal_code && (
						<p role="alert">{errors.postal_code?.message}</p>
					)}
					<label>
						City:
						<input
							type="text"
							name="city"
							placeholder="City"
							{...register("city", { required: "Required" })}
						/>
					</label>
					{errors.city && <p role="alert">{errors.city?.message}</p>}
					<label>
						State:
						<input
							type="text"
							name="state"
							placeholder="State"
							{...register("state", { required: "Required" })}
						/>
					</label>
					{errors.state && <p role="alert">{errors.state?.message}</p>}
					<label>
						Country Code:
						<input
							type="text"
							name="country_code"
							placeholder="MX"
							{...register("country_code", {
								required: "Required",
								maxLength: {
									value: 2,
									message: "Invalid country code format",
								},
								pattern: {
									value: /^[A-Z]{2}$/,
									message: "Invalid country code format",
								},
							})}
						/>
					</label>
					{errors.country_code && (
						<p role="alert">{errors.country_code?.message}</p>
					)}
					<div className={styles.formButtons}>
						<button type="submit">Submit</button>
						<button onClick={() => handleCancel()}>Cancel</button>
					</div>
				</form>
			</div>
		</>
	);
}

export default Form;
