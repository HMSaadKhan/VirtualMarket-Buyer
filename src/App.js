import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MenuBar from "./Components/MenuBar/MenuBar";
import AccountBar from "./Components/MenuBar/AccountBar"; 

function App() {
  return (
    <Router>
      <AccountBar/>
      <MenuBar />
    </Router>
  );
}

export default App;
