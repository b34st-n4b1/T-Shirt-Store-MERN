import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { createaProduct, getCategories } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const AddProduct = () => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    photo,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData,
  } = values;

  const preload = () => {
    getCategories()
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, categories: data, formData: new FormData() });
          console.log("CATE", categories);
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    preload();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createaProduct(user._id, token, formData)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            photo: "",
            stock: "",
            loading: false,
            createdProduct: data.name,
          });
        }
      })
      .catch(err => console.log(err));
  };

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <div className="alert alert-success mt-3"
    style={{display: createdProduct ? "" : "none"}}>
    <h4>{createdProduct} created successfully !</h4>
    </div>
  )

  const warningMessage = () => (
    <div className="alert alert-danger mt-3" 
    style={{display: error ? "" : "none"}}>
    <h4>Failed to create new product !!</h4>
    </div>
  )
  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group mb-3">
        <label className="btn btn-success w-100">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control mb-3"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control mb-3"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control mb-3"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control form-select mb-3"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control mb-3"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Create Product
      </button>
    </form>
  );
  return (
    <Base
      title="Add a product here!"
      description="Welcome to product creation section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-outline-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
        {successMessage()}
        {warningMessage()}
        {createProductForm()}</div>
      </div>
    </Base>
  );
};

export default AddProduct;
