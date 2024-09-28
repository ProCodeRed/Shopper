import React from "react";
import { Spinner } from "react-bootstrap";
const Loader = () => {
  return (
    <div className="loader">
      <Spinner animation="border" role="status" className="spinner" variant="danger">
        <span className="visually-hidden"></span>
      </Spinner>
      <div className="loader-text">Loading....</div>
    </div>
  );
};

export default Loader;
