import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Box, Button, Typography } from "@mui/material";
import categoryService from "../../Services/CategoryService";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    border: 1,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  categoriesHeading: {
    marginLeft: "40px",
    marginRight: "40px",
    marginTop: "10px",
    marginBottom: "10px",
    fontSize: "20px",
    fontWeight: "bold",
  },
  categoryText: {},
  button: {
    color: "#ba6a62",
    backgroundColor: "#fff",
    marginLeft: "10px",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#ba6a64",
      color: "#ffff",
    },
  },
}));

export default function Categories() {
  const classes = useStyles();
  const history = useHistory();
  const [categories, setCategories] = useState([]);

  const getCategory = () => {
    categoryService
      .GetCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(getCategory, []);
  return (
    <Box className={classes.root}>
      <Box sx={{ backgroundColor: "#ba6a62", color: "white" }}>
        <Typography className={classes.categoriesHeading}>
          Catergories
        </Typography>
      </Box>
      <Box className="categories">
        {categories.map((item) => {
          return (
            <Button
              className={classes.button}
              onClick={(e) => {
                history.push("/" + item._id);
              }}
            >
              {item.name}
            </Button>
          );
        })}
      </Box>
      <Box></Box>
      <Box></Box>
    </Box>
  );
}
