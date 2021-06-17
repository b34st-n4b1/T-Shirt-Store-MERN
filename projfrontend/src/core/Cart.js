import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart, removeItemFromCart } from "./helper/cartHelper";
import PaymentB from "./PaymentB";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        <h2>This section is to load products</h2>
        {products.map((product, index) => {
          return (
            <Card
              key={index}
              product={product}
              addToCart={false}
              removeFromCart={true}
              setReload={setReload}
              reload={reload}
            />
          );
        })}
      </div>
    );
  };

  const checkoutProducts = () => {
    return (
      <div>
        <h2>This section for checkout</h2>
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready for Chekcout">
      <div className="row">
        <div className="col-6 text-center">
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h3>No Products in Cart</h3>
          )}
        </div>
        <div className="col-6 text-center">
          <PaymentB products={products} setReload={setReload} />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
