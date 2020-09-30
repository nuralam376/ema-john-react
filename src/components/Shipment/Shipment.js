import React from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { UserContext } from "../../App";
import "./Shipment.css";

const Shipment = () => {
	const { register, handleSubmit, watch, errors } = useForm();
	const onSubmit = (data) => console.log(data);

	console.log(watch("example")); // watch input value by passing the name of it

	const [loggedInUser, setLoggedInUser] = useContext(UserContext);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="shipment">
			{/* register your input into the hook by invoking the "register" function */}
			<input
				name="name"
				defaultValue={loggedInUser.name}
				ref={register}
				placeholder="Name"
			/>
			<br />
			{errors.name && <span>This field is required</span>}
			<br />
			{/* include validation with required or other standard HTML validation rules */}

			<input
				name="email"
				defaultValue={loggedInUser.email}
				ref={register({ required: true })}
				placeholder="email"
			/>
			<br />
			{errors.email && <span>This field is required</span>}

			<br />
			<input
				name="phone"
				ref={register({ required: true })}
				placeholder="phone"
			/>
			<br />

			{errors.phone && <span>This field is required</span>}

			<br />
			<input
				name="address"
				ref={register({ required: true })}
				placeholder="address"
			/>
			<br />

			{/* errors will return when field validation fails  */}
			{errors.address && <span>This field is required</span>}
			<br />

			<input type="submit" />
		</form>
	);
};

export default Shipment;
