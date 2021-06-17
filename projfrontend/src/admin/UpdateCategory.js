import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getCategory, updateCategory } from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
  const [cateName, setCateName] = useState({name: ""});
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();
  const {name}= cateName;
  const goBack = () => {
    return (
      <div className="mt-5">
        <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">
          Admin Home
        </Link>
      </div>
    );
  };

  const preload = (categoryId) => {
    getCategory(categoryId)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setCateName({name:data.name});
          console.log("Cate Nmae",name)
          // console.log("category Name", data.name);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const onsubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    //Backend request Fired
    updateCategory(user._id, token, name)
      .then((data) => {
        if (data.error) {
          setError(true);
        } else {
          setError("");
          setSuccess(true);
          setCateName("");
        }
      })
      .catch((err) => console.log(err));
  };



  const handleChange = (e) => {
    setError("");
    setCateName(e.target.value);
  };
 
  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category Created Successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-warning">Failed to create Category</h4>;
    }
  };

  const myCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead">Enter the Category</p>
          <input
            type="text"
            className="form-control my-3"
            onChange={handleChange}
            value={name}
            autoFocus
            required
            placeholder="For Ex. Summer"
          />
          <button onClick={onsubmit} className="btn btn-outline-info">
            Create Category
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Create A Category"
      description="Add new category for Tshirts"
      className="container bg-info p-4"
    >
      <div className="row bg-white roundend p-2">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
