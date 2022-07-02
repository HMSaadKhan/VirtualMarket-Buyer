import {
  List,
  ListItem,
  ListItemButton,
  Typography,
  ListItemText,
  Box,
} from "@mui/material";
import "../../Styles/hidescrollBar.css";
import React, { useContext } from "react";
import { CategoriesContext } from "../../Contexts/Categories/CategoriesState";
import { Link, useHistory } from "react-router-dom";

function CategoriesSideBar() {
  const categories = useContext(CategoriesContext);
  const history = useHistory();

  return (
    <Box sx={{ backgroundColor: "white" }}>
      <Box m={2} sx={{}}>
        <Box sx={{ display: "flex ", alignItems: "center" }}>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "20px",
              color: "#ba6a62",
              cursor: "pointer",
            }}
            onClick={(e) => {
              history.push("/");
            }}
          >
            Categories
          </Typography>
        </Box>
        <Box>
          <List sx={{ height: 480, overflowX: "hidden", overflowY: "auto" }}>
            {categories.map((category) => {
              return (
                <Box key={category._id} sx={{}}>
                  <ListItem disablePadding>
                    <ListItemButton
                      component={Link}
                      to={"/category/" + category._id}
                    >
                      <ListItemText primary={category.name} />
                    </ListItemButton>
                  </ListItem>
                </Box>
              );
            })}
          </List>
        </Box>
      </Box>
    </Box>
  );
}

export default CategoriesSideBar;
