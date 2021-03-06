import React, {useState, useEffect} from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";



const Home = () => {

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false)

  const loadAllProducts = () => {
    getProducts()
    .then(data => {
      if(data.error){
        setError(data.error)
      }else{
        setProducts(data)
      }
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <Base title="Home Page" description="Welcome to amazing tshirt store">
      <div className="row text-center">
        <h1 className="text-white">All of Tshirts</h1>
        <div className="row">
          {products.map((product, index) => {
            return(
              <div key={index} className="col-3 mb-4">
                <Card product={product} />
              </div>
            )
          })}
        </div>
      </div>
    </Base>
  );
};

export default Home;
