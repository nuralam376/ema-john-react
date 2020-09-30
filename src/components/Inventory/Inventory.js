import React from "react";
import fakeData from "../../fakeData";

const Inventory = () => {
  const addProducts = () => {
    fetch("http://localhost:5000/addproducts", {
      method: "POST",
      body: JSON.stringify(fakeData),
      headers: {
        "Content-type": "application/json; charset = UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => alert("Products added successfully"))
      .catch((err) => alert(err.message));
  };

  return (
    <div>
      <h1>Inventory</h1>
      <button onClick={addProducts}>Add Products</button>
    </div>
  );
};

export default Inventory;
