import { ListItem, Tooltip, Typography } from "@mui/material";
import React from "react";

const ProductTooltip = ({ params }) => {
  return (
    <Tooltip
      placement="top"
      arrow
      title={
        <>
          {params.row.orderDetails ? (
            <div>loading</div>
          ) : (
            params.row.orderDetails.map((orderDetail) => (
              <ListItem
                sx={{ display: "list-item", fontSize: 14, padding: 0 }}
                key={orderDetail.medicine._id}
              >
                {orderDetail.medicine.name}
              </ListItem>
            ))
          )}
        </>
      }
      sx={{
        "&:hover": {
          cursor: "pointer",
        },
      }}
    >
      <Typography>{params.row.orderDetails.length + " items"}</Typography>
    </Tooltip>
  );
};

export default ProductTooltip;
