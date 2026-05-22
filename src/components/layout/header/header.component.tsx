/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Menu as MenuIcon,
  KeyboardArrowDown,
  KeyboardArrowUp,
  PersonOutline,
  ShoppingCart,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  Stack,
  Toolbar,
  Typography,
  Tooltip,
  Avatar,
  useMediaQuery,
  useTheme,
  Badge,
} from "@mui/material";
import { useSidebarContext } from "@/context/sidebar.context";

import styles from "./header.module.scss";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";

interface HeaderProps {
  user?: any;
}

export default function Header(props: HeaderProps) {
  const { user } = props;
  const { toggleSidebar } = useSidebarContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const theme = useTheme();
  const desktopView = useMediaQuery(theme.breakpoints.up("sm"));
  const router = useRouter();
  const { cartProducts } = useAppSelector((state) => state.products);

  const handleCart = () => {
    router.push("/cart");
  };

  return (
    <AppBar position="static" className="z-10">
      <Toolbar className={styles["toolbar-header"]}>
        <IconButton size="large" edge="start" sx={{ mr: 1 }} onClick={toggleSidebar}>
          <MenuIcon className={styles["menu-icon"]} />
        </IconButton>
        <Typography component="div" variant="titleSm" flexGrow={1} fontWeight="fontWeightMedium">
          <Box sx={{ display: { xs: "none", sm: "block" } }}>Ecommerce App</Box>
        </Typography>
        <Box className="flex flex-row" gap={2}>
          <IconButton onClick={handleCart}>
            <Badge color="success" badgeContent={cartProducts?.length || 0}>
              <ShoppingCart sx={{ color: "var(--white)" }} />
            </Badge>
          </IconButton>
          <Stack
            gap={1}
            className="cursor-pointer items-center justify-center flex-row"
            onClick={handleMenu}
          >
            <Tooltip title="Profile" disableHoverListener={desktopView}>
              <Avatar src={user?.photoUrl} className={clsx(styles.avatar, styles.headerAvatar)} />
            </Tooltip>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Stack direction="row" alignItems="center">
                <Typography variant="body2">
                  Team 5
                </Typography>
                {anchorEl ? (
                  <KeyboardArrowUp fontSize="small" />
                ) : (
                  <Tooltip title="Profile">
                    <KeyboardArrowDown fontSize="small" />
                  </Tooltip>
                )}
              </Stack>
            </Box>
          </Stack>

          <Menu
            keepMounted
            id="menu-appbar"
            className={styles["menu-appbar"]}
            anchorEl={anchorEl}
            onClose={handleClose}
            open={Boolean(anchorEl)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            classes={{ paper: styles.menuPaper }}
          >
            <Stack
              gap="10px"
              className={clsx("items-center flex-row", styles["menu-items-container"])}
            >
              <Avatar className={clsx(styles.avatar, styles.listAvatar)} src={user?.photoUrl}>
                <PersonOutline />
              </Avatar>
              <Typography className={styles.ellipsisText} variant="body2">
                Team 5
              </Typography>
            </Stack>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
