import React from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { UserContext } from "../../App";
import "./Shipment.css";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";
import ProcessPayment from "../ProcessPayment/ProcessPayment";
import { useState } from "react";

const Shipment = () => {
  const { register, handleSubmit, errors } = useForm();
  const [shippingData, setShippingData] = useState(null);

  const onSubmit = (data) => {
    setShippingData(data);
  };

  const handlePaymentSuccess = (paymentId) => {
    const savedCart = getDatabaseCart();
    const orders = {
      ...loggedInUser,
      products: savedCart,
      shipping: shippingData,
      payment: paymentId,
    };

    if (orders) {
      fetch("http://localhost:5000/orders", {
        method: "POST",
        body: JSON.stringify(orders),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((data) => {
        processOrder();
        alert("Order placed successfully");
      });
    }
  };

  const [loggedInUser] = useContext(UserContext);

  return (
    <div className="row">
      <div
        className="col-md-6"
        style={{ display: shippingData ? "none" : "block" }}
      >
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
      </div>
      <div
        className="col-md-6"
        style={{ display: shippingData ? "block" : "none" }}
      >
        <ProcessPayment handlePayment={handlePaymentSuccess} />
      </div>
    </div>
  );
};

export default Shipment;
