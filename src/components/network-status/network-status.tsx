"use client";

import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { callSnack } from "../snackbar";

export const NetworkStatus = () => {
  const { closeSnackbar } = useSnackbar();

  const updateNetworkStatus = () => {
    if (!navigator.onLine)
        callSnack("internetError", "error");
    else closeSnackbar();
  };

  useEffect(() => {
    window.addEventListener("load", updateNetworkStatus);
    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);

    return () => {
      window.removeEventListener("load", updateNetworkStatus);
      window.removeEventListener("online", updateNetworkStatus);
      window.removeEventListener("offline", updateNetworkStatus);
    };
  }, []);
  return null;
};

