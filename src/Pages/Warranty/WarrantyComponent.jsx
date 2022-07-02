import React from "react";
import { Card, Typography, Box, CardContent } from "@mui/material";
import ClaimWriting from "../../Components/PopUps/ClaimWriting";

import moment from "moment";
import { useHistory } from "react-router-dom";

const WarrantyComponent = ({ warranty, getWarranties }) => {
  const history = useHistory();

  return (
    <Box m={2} sx={{ width: "100%" }}>
      <Card
        sx={{
          backgroundColor: "#fafafa",
          width: { xs: "400px", sm: "700px", md: "800px", lg: "800px" },
        }}
      >
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: {
                xs: "start",
                sm: "start",
                md: "center",
                lg: "center",
              },
              flexDirection: {
                xs: "column",
                sm: "row",
                md: "row",
                lg: "row",
              },
              height: {
                xs: "60",
                sm: "60",
                md: "50",
                lg: "50",
              },
              "& .MuiBox-root": { m: 0.5 },
            }}
          >
            <Box sx={{ display: "flex", width: "50ch" }}>
              <Typography
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  history.push(
                    "/" + warranty.productName + "/" + warranty.Product
                  );
                }}
              >
                {warranty.productName}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", width: "30%" }}>
              <Typography color="primary">Qty:&nbsp;</Typography>
              <Typography>{warranty.quantity}</Typography>
            </Box>
            <Box sx={{ display: "flex", width: "100%" }}>
              <Typography color="primary">Expiry&nbsp;</Typography>
              <Typography>{moment(warranty.expiry).format("lll")}</Typography>
            </Box>
            <Box sx={{ display: "flex", width: "100%" }}>
              <Typography color="primary">Status&nbsp;</Typography>
              <Typography>{warranty.status}</Typography>
            </Box>

            <ClaimWriting
              id={warranty._id}
              status={warranty.status}
              getWarranties={getWarranties}
            />
          </Box>
          {warranty.sellerComment ? (
            <>
              {" "}
              <Box>
                <Typography sx={{ fontWeight: "bold", color: "#ba6a62" }}>
                  Seller Remarks:
                </Typography>
                {warranty.sellerComment}
              </Box>
            </>
          ) : (
            <></>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default WarrantyComponent;
