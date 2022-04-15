import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import categoryService from "../../Services/CategoryService";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";

export default function Categories() {
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
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Box sx={{ backgroundColor: "#ba6a62", color: "white" }}>
        <Typography
          sx={{
            marginLeft: "40px",
            marginRight: "40px",
            marginTop: "10px",
            marginBottom: "10px",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Catergories
        </Typography>
      </Box>
      <Box className="categories">
        {categories.map((item) => {
          return (
            <Button
              sx={{
                color: "#ba6a62",
                backgroundColor: "#fff",
                marginLeft: "10px",
                marginTop: "10px",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#ba6a64",
                  color: "#ffff",
                },
              }}
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
