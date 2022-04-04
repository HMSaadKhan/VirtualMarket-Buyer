import React, { useState } from "react";
import "./category.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Box, Button, Typography } from "@mui/material";
import categoryService from "../../Services/CategoryService";

export default function Categories() {
  const [categories, setcategories] = useState([]);
  const category = ["Electronics", "Health", "LifStyle", "Food"];
  return (
    <div className="border">
      <div className="content">
        <div className="title">
          <div className="categoryTitle">Catergories</div>
        </div>

        <div className="categories">
          {category.map((item) => {
            return (
              <div component={Button} className="category">
                {item}
              </div>
            );
          })}
        </div>
        <div className="categories">
          <div className="rightCorner">Login</div>
          <div>Signup</div>
        </div>
      </div>
    </div>
  );
}
