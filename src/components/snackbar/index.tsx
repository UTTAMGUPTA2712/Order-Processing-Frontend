import { closeSnackbar, enqueueSnackbar } from "notistack";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MessageComponent from "./message-component";
import { GET_STATE_COLOR } from "./snackbar.constants";

export const callSnack = async (
  msg: string,
  variant: "default" | "error" | "success" | "warning" | "info" | undefined
) => {
  enqueueSnackbar(<MessageComponent message={msg} />, {
    variant: variant || "info",
    hideIconVariant: true,
    style: { backgroundColor: GET_STATE_COLOR(variant || "") },
    autoHideDuration: 5000,
    action: (key) => (
      <IconButton
        onClick={() => closeSnackbar(key)}
        className="p-10"
        data-test-id={`btn-snackbar-close-${key}`}
      >
        <CloseIcon
          fontSize="small"
          className="text-light"
          data-test-id="icon-snackbar-close"
        />
      </IconButton>
    ),
  });
};
