/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { backdropClasses, Box } from "@mui/material";
import { useHistory } from "react-router-dom";
import verifyService from "../../Services/VerifyService";
import { useParams } from "react-router-dom";
import tick from "./tick.png";
import cross from "./cross.png";

export default function Verify(props) {
  console.log(props);
  const history = useHistory();
  const token = useParams();
  console.log(token);
  const [response, setresponse] = React.useState();
  const [error, seterror] = React.useState();

  React.useEffect(() => {
    verifyService
      .verify({ token: token.id })
      .then((data) => {
        console.log(data);
        setresponse(data.data);
      })
      .catch((error) => {
        console.log(error.response);
        seterror(error.response.data);
      });
  });
  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: "5%" }}>
      <Box
        sx={{
          maxWidth: 400,
          color: "#fafafa",
        }}
      >
        <CardContent>
          {response && (
            <Box>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img src={tick} height="100" width="100" />
                </Box>
                <Typography variant="h4" color="primary" align="center">
                  {response}
                </Typography>
              </Box>
            </Box>
          )}
          {error && (
            <Box>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img src={cross} height="100" width="100" />
                </Box>
                <Typography variant="h4" color="red" align="center">
                  {error}
                </Typography>
              </Box>
            </Box>
          )}
        </CardContent>
        {(error || response) && (
          <CardActions sx={{ alignItems: "center", justifyContent: "center" }}>
            <Button
              variant="contained"
              onClick={() => {
                history.push("/");
              }}
            >
              Return to HomeScreen
            </Button>
          </CardActions>
        )}
      </Box>
    </Box>
  );
}
