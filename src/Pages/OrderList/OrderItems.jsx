import React from "react";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material/";
import Typography from "@mui/material/Typography";
import CommentWriting from "../../Components/PopUps/CommentWriting";
import { useHistory } from "react-router-dom";
export default function OrderItems({ items, orderStatus, orderId, Orders }) {
  console.log(items);
  const history = useHistory();
  return (
    <>
      {" "}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50px",
        }}
      >
        <Box sx={{ width: "50%" }}>
          <Typography
            sx={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => {
              history.push("/" + items.productName + "/" + items.Product);
            }}
          >
            {items.productName}
          </Typography>
        </Box>
        <Box sx={{ width: "25%" }}>
          <Typography align="center">Qty: {items.quantity}</Typography>
        </Box>
        <Box sx={{ width: "25%" }}>
          <Typography align="center">PKR. {items.totalPrice}</Typography>
        </Box>
        {orderStatus === "DELIVERED" && !items.reviewed ? (
          <Box sx={{ width: "25%" }}>
            <CommentWriting
              orderId={orderId}
              itemId={items._id}
              Orders={Orders}
            />
          </Box>
        ) : (
          <>
            {items.reviewed && (
              <>
                {" "}
                <Typography color="primary" sx={{ fontWeight: "bold" }}>
                  REVIEWED
                </Typography>
              </>
            )}
          </>
        )}
      </Box>
      <Divider />
    </>
  );
}
