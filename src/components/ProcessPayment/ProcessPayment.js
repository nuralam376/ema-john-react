import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51HZnvHKPP7zxrLu3IaoVnEpEu05lK3WXE0Sph9lisQbNzxQ3vLcfLwk55E4wOl4h8iQoNiHxfKXgr06L1zefnVAF00Agg8uTrB"
);

const ProcessPayment = ({ handlePayment }) => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckOutForm handlePayment={handlePayment} />
      </Elements>
    </div>
  );
};

export default ProcessPayment;
