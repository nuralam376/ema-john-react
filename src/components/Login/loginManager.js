import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";

const provider = new firebase.auth.GoogleAuthProvider();

export const initializeFirebaseApp = () => {
	firebase.initializeApp(firebaseConfig);
};

export const handleGoogleLogin = () => {
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
			return signedInUser;
		})
		.catch((error) => console.log(error.message));
};

// export const handleSignOut = () => {
// 	firebase
// 		.auth()
// 		.signOut()
// 		.then((response) => {
// 			const user = {
// 				isSignedIn: false,
// 				name: "",
// 				email: "",
// 				photo: "",
// 			};
// 			setUser(user);
// 		})
// 		.catch((error) => console.log(error.message));
// };

// export const updatedUserName = (name) => {
// 	const user = firebase.auth().currentUser;

// 	user
// 		.updateProfile({
// 			displayName: name,
// 		})
// 		.then((res) => {
// 			console.log("Name updated successfully", res);
// 		})
// 		.catch((error) => {
// 			console.log(error.message);
// 		});
// };

// export const handleUserRegistration = (email, password) => {
// 	firebase
// 		.auth()
// 		.createUserWithEmailAndPassword(email, password)
// 		.then((res) => {
// 			const newUser = { ...user };
// 			newUser.success = true;
// 			setUser(newUser);
// 			updatedUserName(name);
// 		})
// 		.catch((error) => {
// 			// Handle Errors here.
// 			const newUser = { ...user };
// 			var errorMessage = error.message;
// 			// ...
// 			newUser.success = false;
// 			newUser.error = errorMessage;
// 			setUser(newUser);
// 		});
// };

// export const handleUseLogin = (email, password) => {
// 	firebase
// 		.auth()
// 		.signInWithEmailAndPassword(email, password)
// 		.then((res) => {
// 			const newUser = { ...user };
// 			newUser.success = true;
// 			newUser.error = "";
// 			setUser(newUser);
// 			setLoggedInUser(newUser);
// 			history.replace(from);
// 			console.log("Signed In User ", res.user);
// 		})
// 		.catch((error) => {
// 			const newUser = { ...user };
// 			newUser.success = false;
// 			newUser.error = error.message;
// 			setNewUSer(newUser);
// 		});
// };
