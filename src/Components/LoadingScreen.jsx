import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { AddIcCallOutlined } from "@mui/icons-material";

export default function LoadingScreen({ bool }) {
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={bool}
      >
        <CircularProgress />
      </Backdrop>
    </div>
  );
}
