import React from "react";
import buyerService from "../../Services/BuyerService";
import { withRouter } from "react-router";
const LoginAuth = (props) => {
  React.useEffect(() => {
    if (buyerService.isLoggedIn()) {
      props.history.push("/");
    }
  }, []);
  return <>{props.children}</>;
};

export default withRouter(LoginAuth);
