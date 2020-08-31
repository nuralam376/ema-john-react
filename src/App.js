import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Order from "./components/Order/Order";
import Inventory from "./components/Inventory/Inventory";
import NotFound from "./components/Not Found/NotFound";
import ProductDetail from "./components/ProductDetail.js/ProductDetail";

function App() {
	return (
		<div>
			<Header></Header>
			<Router>
				<Switch>
					<Route exact path="/shop">
						<Shop></Shop>
					</Route>
					<Route exact path="/order">
						<Order></Order>
					</Route>
					<Route exact path="/manage">
						<Inventory></Inventory>
					</Route>
					<Route exact path="/">
						<Shop></Shop>
					</Route>
					<Route exact path="/product/:productkey">
						<ProductDetail></ProductDetail>
					</Route>
					<Route path="*">
						<NotFound></NotFound>
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
