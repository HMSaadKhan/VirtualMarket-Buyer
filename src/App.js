import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MenuBar from "./Components/MenuBar/MenuBar";
import Footer from "./Components/Footer/Footer";
import Login from "./Components/LoginPage/Login";
import SignUp from "./Components/SignUpPage/SignUp";
import HomePage from "./Components/HomePage/HomePage";
import Cart from "./Components/Cart/Cart";
import Favorite from "./Components/Favorites/Fvaorite";
import AccountBar from "./Components/MenuBar/AccountBar";
import BuyerAccount from "./Components/BuyerAccount";

function App() {
  return (
    <Router>
      <AccountBar />
      <MenuBar />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/Login" exact component={Login} />
        <Route path="/Cart" exact component={Cart} />
        <Route path="/favorite" exact component={Favorite} />
        <Route path="/SignUp" exact component={SignUp} />
        <Route path="/AccountSettings" component={BuyerAccount} />
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
