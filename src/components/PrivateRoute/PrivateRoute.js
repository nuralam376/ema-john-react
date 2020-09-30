import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../App";

const PrivateRoute = ({ children, ...rest }) => {
	const [loggedInUser, setLoggedInUser] = useContext(UserContext);
	console.log("LoggedInUser", loggedInUser);
	return (
		<Route
			{...rest}
			render={({ location }) =>
				loggedInUser && loggedInUser.email ? (
					children
				) : (
					<Redirect
						to={{
							pathname: "/login",
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
};

export default PrivateRoute;
