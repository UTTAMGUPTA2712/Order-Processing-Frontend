import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import clsx from "clsx";

import styles from "./page.module.scss";

const SubmitPage = () => {
  return (
    <Stack gap={2} className={clsx(styles.container, "h-100 justify-center items-center")}>
      <Image src={"/success.png"} height={120} width={120} alt="successfully placed" />
      <Stack gap={1} className={clsx(styles.message, "items-center")}>
        <Typography variant="titleMd" color="secondary" align="center">
          Order Placed Successfully
        </Typography>
        <Typography variant="paragraphMd" color="secondary" align="center">
          Order Placed Successfully
        </Typography>
      </Stack>
    </Stack>
  );
};

export default SubmitPage;
