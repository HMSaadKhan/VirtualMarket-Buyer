import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
//import categoryService from "../../Services/CategoryService";
import { useHistory } from "react-router-dom";
import { WhiteButton } from "../../Styles/StyledButton";
import { CategoriesContext } from "../../Contexts/Categories/CategoriesState";
export default function Categories() {
  const history = useHistory();
  //const [categories, setCategories] = useState([]);
  const categories = useContext(CategoriesContext);

  // const getCategory = () => {
  //   categoryService
  //     .GetCategories()
  //     .then((data) => {
  //       setCategories(data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  // useEffect(getCategory, []);
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
        {categories.map((item, index) => {
          return (
            <WhiteButton
              key={index}
              onClick={(e) => {
                history.push("/" + item._id);
              }}
            >
              {item.name}
            </WhiteButton>
          );
        })}
      </Box>
      <Box></Box>
      <Box></Box>
    </Box>
  );
}
