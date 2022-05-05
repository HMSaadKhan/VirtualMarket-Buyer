import React from "react";
import { makeStyles } from "@mui/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";

const useStyles = makeStyles({
  root: { width: "200px", margin: 20 },
  media: {
    width: "180px",
    height: "200px",
    objectFit: "contain",
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
        history.push("productDetail/" + product._id);
      }}
    >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          component="img"
          image={product.images[0].link}
          title={product.name}
        />
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
              MoQ:{product.minOrder}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default ProductComponent;
