import React, { useState } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import "./firebaseConfig";
import { useContext } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
import { initializeFirebaseApp } from "./loginManager";

initializeFirebaseApp();

function Login() {
  const provider = new firebase.auth.GoogleAuthProvider();

  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({});

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: "/login" } };

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        console.log(result);
        const { displayName, email, photoURL } = result.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        verifyidToken(signedInUser);
      })
      .catch((error) => console.log(error.message));
  };

  const verifyidToken = (signedInUser) => {
    firebase
      .auth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .then(function (idToken) {
        // Send token to your backend via HTTPS
        // ...
        setLoggedInUser(signedInUser);
        sessionStorage.setItem("token", idToken);
      })
      .catch(function (error) {
        // Handle error
      });
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
        setLoggedInUser(user);
        console.log(user);
        console.log(loggedInUser);
        sessionStorage.removeItem("token");
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

    if (newUser && email && password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          const newUserInfo = { ...loggedInUser };
          newUserInfo.success = true;
          updatedUserName(name);
        })
        .catch((error) => {
          // Handle Errors here.
          const newUserInfo = { ...loggedInUser };
          var errorMessage = error.message;
          // ...
          newUserInfo.success = false;
          newUserInfo.error = errorMessage;
        });

      // console.log(newUser);
    } else if (!newUser && email && password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          console.log("Res", res);
          const newUserInfo = { ...res.user };
          user.success = true;
          user.error = "";
          verifyidToken(newUserInfo);
          history.replace(from);
        })
        .catch((error) => {
          const newUserInfo = { ...loggedInUser };
          newUserInfo.success = false;
          newUserInfo.error = error.message;
          setLoggedInUser(newUserInfo);
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
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      {loggedInUser.isSignedIn || sessionStorage.getItem("token") ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <button onClick={handleLogin}>Google Sign In</button>
      )}
      {loggedInUser.isSignedIn && (
        <div>
          <h3>Welcome {loggedInUser.name}</h3>
          <p>Email : {loggedInUser.email}</p>
          <img src={loggedInUser.photo} alt={loggedInUser.displayName} />
        </div>
      )}
      {/* 
      )}
      {!sessionStorage.getItem("token") && (
        <>
          <h1>Register</h1>
          <h3>Name : {loggedInUser.name}</h3>
          <h4>Email : {loggedInUser.email}</h4>
          <input
            type="checkbox"
            id="newUser"
            name="newUser"
            onClick={() => setNewUser(!newUser)}
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
        </>
      )}
      {loggedInUser.success ? (
        <p style={{ color: "green" }}>
          User {newUser ? "created" : "Logged in"} successfully
        </p>
      ) : (
        <p style={{ color: "red" }}>{loggedInUser.error}</p>
      )} */}
    </div>
  );
}

export default Login;
