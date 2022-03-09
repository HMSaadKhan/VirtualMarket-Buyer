import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
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
import AccountBar from "./Components/MenuBar/AccountBar";
import BuyerAccount from "./Components/BuyerAccount";
import ProductDetail from "./Components/ProductDetail/ProductDetail";
import NotFound from "./Components/NotFound/NotFound";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <Router>
      <ToastContainer />
      <AccountBar />
      <MenuBar />
      <Switch>
        <Route path="/Login" exact component={Login} />
        <Route path="/Cart" exact component={Cart} />
        <Route path="/favorite" exact component={Favorite} />
        <Route path="/SignUp" exact component={SignUp} />
        <Route path="/AccountSettings" component={BuyerAccount} />
        <Route path="/ProductDetail" component={ProductDetail} />
        <Route path="/forgotpassword" component={ForgotPassword} />
        <Route path="/newpassword/:id" exact component={NewPassword} />
        <Route path="/changepassword/" exact component={ChangePassword} />
        <Route path="/not-found" component={NotFound} />
        <Route path="/" exact component={HomePage} />
        <Redirect to="/not-found" />
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
