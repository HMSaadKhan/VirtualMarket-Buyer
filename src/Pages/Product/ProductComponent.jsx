import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";

const useStyles = makeStyles({
  root: { width: "200px", margin: 20 },
  media: {
    width: "100px",
    height: "200px",
    objectFit: "contain",
    //backgroundSize: "contain",
  },
});

const ProductComponent = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { product } = props;

  return (
    <Card
      className={classes.root}
      sx={{ minWidth: 200 }}
      onClick={() => {
        history.push(product.name + "/" + product._id);
      }}
    >
      <CardActionArea>
        <Box
          sx={{
            display: "flex ",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <CardMedia
              className={classes.media}
              component="img"
              image={product.images[0].link}
              title={product.name}
            />
          </Box>
        </Box>
        <CardContent>
          <Box>
            <Box>
              <Typography sx={{ fontSize: "18px" }}>{product.name}</Typography>
              <Typography
                sx={{ fontSize: "18px", fontWeight: "bold", color: "#ba6a62" }}
              >
                PKR:{product.price}
              </Typography>
            </Box>

            <Typography sx={{ fontSize: "14px" }}>
              Min. Order Quantity: {product.minOrder}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default ProductComponent;
