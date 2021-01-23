import React from "react";
import { Spinner } from "reactstrap";

const SpinnerLoading = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "25% auto",
      }}
    >
      ...
    </Spinner>
  );
};

export default SpinnerLoading;
