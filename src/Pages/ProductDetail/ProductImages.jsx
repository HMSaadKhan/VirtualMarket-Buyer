/* eslint-disable jsx-a11y/img-redundant-alt */
import * as React from "react";
import { Card, Box, CardContent } from "@mui/material";
import { makeStyles } from "@mui/styles";
import useState from "react-usestateref";
import Magnifier from "react-magnifier";
const useStyles = makeStyles({
  images: {
    width: "50px",
    height: "50px",
    marginRight: "10px",
    objectFit: "contain",
    cursor: "pointer",
    //backgroundSize: "cover",
  },
  image: {
    objectFit: "contain",
    //backgroundSize: "contain",
  },
});

export default function ProductImages({ productDetails }) {
  const classes = useStyles();
  const [imageIndex, setImageIndex] = useState(0);
  return (
    <Box>
      <Card>
        <Box
          sx={{
            display: "flex ",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              //   cursor: "poinnter",
              //   width: "400px",
              height: "300px",
            }}
          >
            {/* <img
              className={classes.image}
              width="100%"
              height="100%"
              src={productDetails.images[imageIndex].link}
              alt="main Image"
            /> */}
            <Magnifier
              src={productDetails.images[imageIndex].link}
              width={"100%"}
              className={classes.image}
              height="100%"
            />
          </Box>{" "}
        </Box>
      </Card>
      <Box mt={2}>
        <Box
          sx={{
            display: {
              xs: "none",
              sm: "inline",
              md: "inline",
              // lg: "30%",
              // xl: "30%",
            },
          }}
        >
          <Card sx={{}}>
            <CardContent>
              {productDetails.images.map((images, index) => (
                <img
                  className={classes.images}
                  key={index}
                  src={images.link}
                  alt="images"
                  onClick={(e) => {
                    setImageIndex(index);
                  }}
                  loading="lazy"
                />
              ))}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
