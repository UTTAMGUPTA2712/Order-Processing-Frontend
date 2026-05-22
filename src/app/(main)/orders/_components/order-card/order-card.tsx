/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Card, CardContent, CardMedia, Chip, Typography } from "@mui/material";
import styles from "./order-card.module.scss";

export enum StatusEnum {
  PENDING = "pending",
  PLACED = "placed",
  BILLED = "billed",
  PAYMENT_FAILED = "payment_failed",
  READY_TOSHIP = "ready_to_ship",
  CANCELED = "canceled",
}

const OrderCard = ({ order }: { order: any }) => {
  const getChipColor = (status: StatusEnum) => {
    switch (status) {
      case StatusEnum.PENDING:
        return "info";
      case StatusEnum.PLACED:
        return "success";
      case StatusEnum.CANCELED:
        return "error";
      case StatusEnum.BILLED:
        return "primary";
      case StatusEnum.PAYMENT_FAILED:
        return "secondary";
      case StatusEnum.READY_TOSHIP:
        return "warning";
      default:
        return "default";
    }
  };
  return (
    <Card className={styles.card} sx={{ position: "relative", overflow: "hidden" }}>
      <CardMedia
        component="img"
        height="140"
        image={`https://via.placeholder.com/300x140?text=Order ID: ${order?.order_id}`}
        alt={order?.name}
      />

      <CardContent className={styles.cardContent}>
        <Typography variant="paragraphLg" fontWeight="fontWeightMedium" color="secondary">
          Order ID: {order?.order_id}
        </Typography>
        <Typography variant="paragraphMd" color="secondary">
          Time: {order?.created_at}
        </Typography>
        <Chip label={order?.status} color={getChipColor(order?.status)} />
      </CardContent>
    </Card>
  );
};

export default OrderCard;
