import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
export function LoadingScreen(props) {
  const [loadingScreen, setLoadingScreen] = useState(true);
  console.log(props.value);

  const stopLoading = () => {
    setLoadingScreen(false);
  };
  const startLoading = () => {
    setLoadingScreen(true);
  };

  if (props.value) {
    stopLoading();
  }
  if (props.value) {
    startLoading();
  }

  return (
    <div>
      {loadingScreen ? (
        <>
          <CircularProgress />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
