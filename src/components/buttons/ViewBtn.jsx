import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const ViewBtn = ({ to }) => {
  return (
    <Link
      style={{ textDecoration: "none" }}
      to={to}
    >
      <Button variant="contained" color="secondary">
        View
      </Button>
    </Link>
  );
};

export default ViewBtn;
