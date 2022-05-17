import React from "react";
import buyerService from "../Services/BuyerService";
import { withRouter } from "react-router";
const Auth = (props) => {
  React.useEffect(() => {
    if (!buyerService.isLoggedIn()) {
      props.history.push("/login");
    }
  }, []);
  return <>{props.children}</>;
};

export default withRouter(Auth);
