import {
  List,
  ListItem,
  ListItemButton,
  Typography,
  ListItemText,
  Box,
} from "@mui/material";
import React, { useContext } from "react";
import { CategoriesContext } from "../../Contexts/Categories/CategoriesState";
import { Link } from "react-router-dom";
function CategoriesBar() {
  const categories = useContext(CategoriesContext);

  return (
    <Box sx={{ backgroundColor: "white", width: 250 }}>
      <Typography>Categories</Typography>
      <List>
        {categories.map((category) => {
          return (
            <>
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to={"/category/" + category._id}
                >
                  <ListItemText primary={category.name} />
                </ListItemButton>
              </ListItem>
            </>
          );
        })}
      </List>
    </Box>
  );
}

export default CategoriesBar;
