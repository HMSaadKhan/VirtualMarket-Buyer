import { Card, CardContent, Typography, Box } from "@mui/material";
import React from "react";

export default function DealComponent() {
  return (
    <div>
      <Card>
        <CardContent>
          <Typography>Deal Name</Typography>
          <Typography>Product Quantity</Typography>
          <Typography>Deal Price</Typography>
          <Box></Box>
        </CardContent>
      </Card>
    </div>
  );
}
