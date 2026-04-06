import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Stack,
  Button,
  IconButton,
  Skeleton,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const stockColor = {
  "In Stock": "success",
  Limited: "warning",
  "Out of Stock": "error",
};

const ProductCard = ({ product, onAddToCart }) => {
  const [qty, setQty] = useState(1);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(product.image);

  const fallbackProductImage =
    "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=300&h=200&q=80";

  const increment = () => setQty((q) => q + 1);
  const decrement = () => setQty((q) => (q > 1 ? q - 1 : 1));

  return (
    <Card
      elevation={2}
      sx={{
        height: "100%",
        width: "100%",
        minHeight: 430,
        borderRadius: 3,
        border: "1px solid #e8f5e9",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 10px 22px rgba(27, 94, 32, 0.12)",
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        {!imgLoaded && (
          <Skeleton variant="rectangular" width="100%" height={160} />
        )}
        <CardMedia
          component="img"
          height="150"
          image={imageSrc}
          alt={product.name}
          onLoad={() => setImgLoaded(true)}
          onError={() => {
            if (imageSrc !== fallbackProductImage) {
              setImgLoaded(false);
              setImageSrc(fallbackProductImage);
              return;
            }
            setImgLoaded(true);
          }}
          sx={{ display: imgLoaded ? "block" : "none" }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 1, height: "100%", p: 1.8 }}>
        <Typography
          variant="subtitle1"
          fontWeight={700}
          sx={{
            minHeight: 50,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.name}
        </Typography>

        <Typography variant="h6" sx={{ color: "#2E7D32", fontWeight: 800 }}>
          Rs {product.price}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ minHeight: 20 }}>
          {product.unit}
        </Typography>

        <Chip
          label={product.stock}
          color={stockColor[product.stock] || "default"}
          size="small"
          sx={{ width: "fit-content", fontWeight: 600 }}
        />

        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ mt: 1, p: 0.5, borderRadius: 2, border: "1px solid #e4f1e6", width: "fit-content" }}
        >
          <IconButton size="small" onClick={decrement} sx={{ border: "1px solid #c8e6c9" }}>
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography variant="body1" sx={{ minWidth: 24, textAlign: "center", fontWeight: 700 }}>
            {qty}
          </Typography>
          <IconButton size="small" onClick={increment} sx={{ border: "1px solid #c8e6c9" }}>
            <AddIcon fontSize="small" />
          </IconButton>
        </Stack>

        <Button
          variant="contained"
          disabled={product.stock === "Out of Stock"}
          onClick={() => onAddToCart(product, qty)}
          sx={{
            mt: "auto",
            minHeight: 42,
            bgcolor: "#2E7D32",
            "&:hover": { bgcolor: "#1b5e20" },
            "&.Mui-disabled": { bgcolor: "#bdbdbd", color: "#616161" },
          }}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
