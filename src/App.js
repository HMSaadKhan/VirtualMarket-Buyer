import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MenuBar from "./Components/MenuBar/MenuBar";
import AccountBar from "./Components/MenuBar/AccountBar"; 
import Categories from "./Components/Categories/Categories";
import Products from "./Components/Product/Products";

function App() {
  return (
    <Router>
      <AccountBar/>
      <MenuBar />
      <Categories/>
      <Products/>
    </Router>
  );
}

export default App;
