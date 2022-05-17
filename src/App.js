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

import Login from "./Pages/LoginPage/Login";
import SignUp from "./Pages/SignUpPage/SignUp";
import ForgotPassword from "./Pages/SignUpPage/ForgotPassword";
import NewPassword from "./Pages/SignUpPage/NewPassword";
import ChangePassword from "./Pages/SignUpPage/ChangePassword";
import HomePage from "./Pages/HomePage/HomePage";
import Cart from "./Pages/Cart/Cart";
import Favorite from "./Pages/Favorites/Fvaorite";

import BuyerAccount from "./Pages/BuyerAccount/BuyerAccount";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import NotFound from "./Pages/NotFound/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Categories from "./Pages/Categories/Categories";

import CheckOut from "./Pages/CheckOut/CheckOut";
import Orders from "./Pages/OrderList/Orders";
import ProductsByCategory from "./Pages/HomePage/ProductsByCategory";
import ProductsBySearch from "./Pages/HomePage/ProductsBySearch";
import Warranty from "./Pages/Warranty/Warranty";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Styles/myStyleSheet";
function App() {
  const [refreshCart, setRefreshCart] = React.useState();
  const getStateChanged = (data) => {
    console.log(data);
    setRefreshCart(data);
  };
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
