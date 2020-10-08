import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Order from "./components/Order/Order";
import Inventory from "./components/Inventory/Inventory";
import NotFound from "./components/Not Found/NotFound";
import ProductDetail from "./components/ProductDetail.js/ProductDetail";
import Shipment from "./components/Shipment/Shipment";
import Login from "./components/Login/Login";
import { createContext } from "react";
import { useState } from "react";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    photo: "",
  });
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/shop">
            <Shop></Shop>
          </Route>
          <Route exact path="/order">
            <Order></Order>
          </Route>
          <PrivateRoute exact path="/manage">
            <Inventory></Inventory>
          </PrivateRoute>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route exact path="/product/:productkey">
            <ProductDetail></ProductDetail>
          </Route>
          <PrivateRoute path="/shipment">
            <Shipment />
          </PrivateRoute>
          <Route exact path="/login">
            <Login></Login>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
