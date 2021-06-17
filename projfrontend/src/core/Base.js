import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  description = "My Description",
  className = "bg-dark, text-white p-4",
  children,
}) => {
  return (
    <>
    <Menu />
      <div className="container-fluid">
        <div className="jumbotron bg-dark text-center text-white">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className="footer bg-dark m-auto my-4">
        <div className="container-fluid bg-success text-white text-center py-3">
          <h4>If you got any question, feel free to reach out!</h4>
          <button className="btn btn-warning btn-lg">Contact Us</button>
        </div>
        <div className="container">
          <span className="text-muted">An amazing MERN Bootcamp</span>
        </div>
      </footer>
    </>
  );
};

export default Base;
