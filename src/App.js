import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";
import MenuBar from "./Components/MenuBar/MenuBar";
import AccountBar from "./Components/MenuBar/AccountBar";
import Footer from "./Components/Footer/Footer";
import Login from "./Components/LoginPage/Login";
import SignUp from "./Components/SignUpPage/SignUp";
import HomePage from "./Components/HomePage/HomePage";

function App() {
  return (
    <Router>
      <AccountBar />
      <MenuBar />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/Login" exact component={SignUp} />
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
