import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MenuBar from "./Components/MenuBar/MenuBar";
import AccountBar from "./Components/MenuBar/AccountBar"; 
import Categories from "./Components/Categories/Categories";


function App() {
  return (
    <Router>
      <AccountBar/>
      <MenuBar />
      <Categories/>
    </Router>
  );
}

export default App;
