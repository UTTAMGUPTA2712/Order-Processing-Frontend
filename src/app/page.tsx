"use client";

import { Button, Paper, Stack, Typography } from "@mui/material";
import styles from "./page.module.scss";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/products");
  };

  return (
    <div className={clsx(styles.loginBackground, "flex items-center justify-center")}>
      <Paper
        elevation={1}
        className={clsx(styles.loginContainer, "flex flex-col items-center justify-center")}
      >
        <Image
          src="/logo.jpg"
          alt="Logo"
          sizes="100svw,100svh"
          className={styles.logo}
          width={500}
          height={300}
          priority={true}
        />
        <Stack gap={3} className={clsx(styles.loginContent, "items-center justify-center")}>
            <Typography
              variant="titleMd"
              className="text-center text-secondary"
              fontWeight="fontWeightMedium"
            >
              Ecommerce App
            </Typography>

            <Button onClick={handleRedirect} variant="contained">
              Go to home
            </Button>
        </Stack>
      </Paper>
    </div>
  );
}
