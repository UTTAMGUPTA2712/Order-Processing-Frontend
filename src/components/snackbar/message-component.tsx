import Typography from "@mui/material/Typography";

const MessageComponent = (props: { message: string }) => {

  return (
    <Typography fontSize={14} data-test-id={`text-${props.message}`}>
      {props.message}
    </Typography>
  );
};

export default MessageComponent;
