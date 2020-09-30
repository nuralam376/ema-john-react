import React, { useState } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";
import { useContext } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
import { initializeFirebaseApp } from "./loginManager";

initializeFirebaseApp();

function Login() {
	const [user, setUser] = useState({
		isSignedIn: false,
		name: "",
		email: "",
		photo: "",
	});

	const [newUser, setNewUSer] = useState(false);

	const provider = new firebase.auth.GoogleAuthProvider();

	const [loggedInUser, setLoggedInUser] = useContext(UserContext);
	const history = useHistory();
	const location = useLocation();

	const { from } = location.state || { from: { pathname: "/login" } };

	const handleLogin = () => {
		console.log("Login verifying....");
		firebase
			.auth()
			.signInWithPopup(provider)
			.then(function (result) {
				const { displayName, email, photoURL } = result.user;
				const signedInUser = {
					isSignedIn: true,
					name: displayName,
					email: email,
					photo: photoURL,
				};
				setUser(signedInUser);
			})
			.catch((error) => console.log(error.message));
	};

	const handleSignOut = () => {
		firebase
			.auth()
			.signOut()
			.then((response) => {
				const user = {
					isSignedIn: false,
					name: "",
					email: "",
					photo: "",
				};
				setUser(user);
			})
			.catch((error) => console.log(error.message));
	};

	const updatedUserName = (name) => {
		const user = firebase.auth().currentUser;

		user
			.updateProfile({
				displayName: name,
			})
			.then((res) => {
				console.log("Name updated successfully", res);
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const { name, email, password } = user;

		console.log("New User", newUser);
		if (newUser && email && password) {
			firebase
				.auth()
				.createUserWithEmailAndPassword(email, password)
				.then((res) => {
					const newUser = { ...user };
					newUser.success = true;
					setUser(newUser);
					updatedUserName(name);
				})
				.catch((error) => {
					// Handle Errors here.
					const newUser = { ...user };
					var errorMessage = error.message;
					// ...
					newUser.success = false;
					newUser.error = errorMessage;
					setUser(newUser);
				});

			// console.log(newUser);
		}

		if (!newUser && email && password) {
			firebase
				.auth()
				.signInWithEmailAndPassword(email, password)
				.then((res) => {
					const newUser = { ...user };
					newUser.success = true;
					newUser.error = "";
					setUser(newUser);
					setLoggedInUser(newUser);
					history.replace(from);
					console.log("Signed In User ", res.user);
				})
				.catch((error) => {
					const newUser = { ...user };
					newUser.success = false;
					newUser.error = error.message;
					setNewUSer(newUser);
				});
		}
	};

	const handleBlur = (e) => {
		let isFormValid = true;
		if (e.target.name === "email") {
			isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
		}
		if (e.target.name === "password") {
			const isPasswordLength = e.target.value.length > 5;
			const isPasswordOneDigit = /\d{1}/.test(e.target.value);
			isFormValid = isPasswordOneDigit && isPasswordLength;
		}

		if (isFormValid) {
			const newUser = { ...user };
			newUser[e.target.name] = e.target.value;
			setUser(newUser);
		}
	};

	return (
		<div style={{ textAlign: "center" }}>
			{user.isSignedIn ? (
				<button onClick={handleSignOut}>Sign Out</button>
			) : (
				<button onClick={handleLogin}>Sign In</button>
			)}
			{user.isSignedIn && (
				<div>
					<h3>Welcome {user.name}</h3>
					<p>Email : {user.email}</p>
					<img src={user.photo} alt={user.displayName} />
				</div>
			)}
			<h1>Register</h1>
			<h3>Name : {user.name}</h3>
			<h4>Email : {user.email}</h4>
			<input
				type="checkbox"
				id="newUser"
				name="newUser"
				onClick={() => setNewUSer(!newUser)}
			/>
			<label htmlFor="newUser">New User Registration</label>
			<br />
			<br />
			<form onSubmit={handleSubmit}>
				{newUser && (
					<div>
						<input
							type="text"
							name="name"
							onBlur={handleBlur}
							placeholder="Your name"
							required
						/>
						<br />
						<br />
					</div>
				)}
				<input
					type="text"
					name="email"
					placeholder="Your email address"
					onBlur={handleBlur}
					required
				/>
				<br />
				<br />
				<input
					type="password"
					name="password"
					placeholder="Your password"
					onBlur={handleBlur}
					required
				/>
				<br />
				<br />
				<input type="submit" value="Submit" />
			</form>
			{user.success ? (
				<p style={{ color: "green" }}>
					User {newUser ? "created" : "Logged in"} successfully
				</p>
			) : (
				<p style={{ color: "red" }}>{user.error}</p>
			)}
		</div>
	);
}

export default Login;
