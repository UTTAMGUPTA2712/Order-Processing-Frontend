/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Card, CardContent, CardMedia, Typography, Box, Button } from "@mui/material";
import styles from "./product-card.module.scss";
import { addToCart, removeFromCart } from "@/features/products/products.slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

const ProductCard = ({ product }: { product: any }) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useAppDispatch();

  const { cartProducts } = useAppSelector((state) => state.products);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const increaseQuantity = (product: any) => {
    dispatch(addToCart(product));
  };

  const decreaseQuantity = (product: any) => {
    dispatch(removeFromCart(product));
  };

  const getQuantity = (product_id: string) => {
    const product = cartProducts.find((item: any) => item.product_id === product_id);
    return product ? product.quantity : 0;
  };

  return (
    <Card
      className={styles.card}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{ position: "relative", overflow: "hidden" }}
    >
      <CardMedia
        component="img"
        height="140"
        image={`https://via.placeholder.com/300x140?text=${product?.name?.replace(/\s+/g, "+")}`}
        alt={product?.name}
      />
      <CardContent className={styles.cardContent}>
        <Typography variant="paragraphLg" fontWeight="fontWeightMedium" color="secondary">
          {product?.name}
        </Typography>
        <Typography variant="paragraphMd" color="secondary">
          {product?.description}
        </Typography>
        <Typography variant="paragraphMd" color="secondary">
          Price: ${product?.price}
        </Typography>
      </CardContent>

      {/* Buttons Overlay */}
      {isHovered && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 1,
            color: "#fff",
          }}
        >
          <Typography variant="h6" color="inherit">
            Adjust Quantity
          </Typography>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => decreaseQuantity(product)}
            >
              -
            </Button>
            <Typography variant="body1" color="inherit">
              {getQuantity(product.product_id)}
            </Typography>
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={() => increaseQuantity(product)}
            >
              +
            </Button>
          </Box>
        </Box>
      )}
    </Card>
  );
};

export default ProductCard;
