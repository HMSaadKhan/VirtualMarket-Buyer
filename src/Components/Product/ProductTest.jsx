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

const useStyles = makeStyles({
  root: {
    height: "auto",
    minWidth: "300",
    margin: 20,
  },
  media: {},
  image: {
    height: "100px",
    width: "100px",
    backgroundSize: "stretch",
  },
});

const ProductTest = (props) => {
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
        <div>
          <CardMedia
            component="img"
            height="300"
            // className={classes.media}
            image={product.images[0].link}
            title={product.name}
          />
        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            PKR:{product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default ProductTest;
