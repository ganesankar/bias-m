import React from "react";
import Spinner from "react-bootstrap/Spinner";

import "./styles.css";

const MySpinner = ({ text, ...rest }) => {
  return (
    <div
      {...rest}
      className="spinner-container d-flex align-items-center justify-content-center"
    >
      <div className="lds-grid">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default MySpinner;
