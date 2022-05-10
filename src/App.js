import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Box } from "@mui/material";
import MenuBar from "./Components/MenuBar/MenuBar";
import Footer from "./Components/Footer/Footer";

import Login from "./Components/LoginPage/Login";
import SignUp from "./Components/SignUpPage/SignUp";
import ForgotPassword from "./Components/SignUpPage/ForgotPassword";
import NewPassword from "./Components/SignUpPage/NewPassword";
import ChangePassword from "./Components/SignUpPage/ChangePassword";
import HomePage from "./Components/HomePage/HomePage";
import Cart from "./Components/Cart/Cart";
import Favorite from "./Components/Favorites/Fvaorite";

import BuyerAccount from "./Components/BuyerAccount/BuyerAccount";
import ProductDetail from "./Components/ProductDetail/ProductDetail";
import NotFound from "./Components/NotFound/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Categories from "./Components/Categories/Categories";

import CheckOut from "./Components/CheckOut/CheckOut";
import Orders from "./Components/OrderList/Orders";
import ProductsByCategory from "./Components/HomePage/ProductsByCategory";
import ProductsBySearch from "./Components/HomePage/ProductsBySearch";
import Warranty from "./Components/Warranty/Warranty";
function App() {
  const [refreshCart, setRefreshCart] = React.useState();
  const getStateChanged = (data) => {
    console.log(data);
    setRefreshCart(data);
  };
  return (
    <Router>
      <ToastContainer />

      <MenuBar refreshCart={refreshCart} />
      <Categories />
      <Box sx={{ backgroundColor: "#fafafa" }}>
        <Switch>
          <Route path="/Login" exact component={Login} />
          <Route path="/Cart">
            <Cart stateChanged={getStateChanged} />
          </Route>
          <Route path="/favorite" exact component={Favorite} />
          <Route path="/SignUp" exact component={SignUp} />
          <Route path="/AccountSettings" component={BuyerAccount} />
          <Route path="/Orders" component={Orders} />
          <Route path="/ProductDetail/:id/">
            <ProductDetail stateChanged={getStateChanged} />
          </Route>
          <Route path="/forgotpassword" component={ForgotPassword} />
          <Route path="/resetPassword/:id/" exact component={NewPassword} />
          <Route path="/changepassword/" exact component={ChangePassword} />
          <Route path="/warranty/" component={Warranty} />
          <Route path="/check-out/">
            <CheckOut stateChanged={getStateChanged} />
          </Route>

          <Route path="/not-found" component={NotFound} />

          <Route path="/:name/:id" exact component={ProductsByCategory} />
          <Route path="/search/:id" exact component={ProductsBySearch} />

          <Route path="/" exact component={HomePage} />
          <Redirect to="/not-found" />
        </Switch>

        {/* <Footer /> */}
      </Box>
    </Router>
  );
}

export default App;
