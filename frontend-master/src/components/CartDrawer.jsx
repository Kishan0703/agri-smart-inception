import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Stack,
  Button,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const CartDrawer = ({
  open,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onOpenBooking,
  totalAmount,
}) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: { xs: 320, sm: 420 }, p: 2, height: "100%", display: "flex", flexDirection: "column" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={700}>
            Your Cart
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ flex: 1, overflowY: "auto" }}>
          {cartItems.length === 0 ? (
            <Typography color="text.secondary">Your cart is empty.</Typography>
          ) : (
            cartItems.map((item) => (
              <Box key={`${item.shopId}-${item.id}`} sx={{ mb: 2, p: 1.2, border: "1px solid #e8f5e9", borderRadius: 2 }}>
                <Typography fontWeight={700}>{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.shopName}
                </Typography>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
                  <Chip label={`Rs ${item.price} x ${item.quantity}`} size="small" />
                  <Typography fontWeight={700}>Rs {item.price * item.quantity}</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                  <IconButton size="small" onClick={() => onUpdateQuantity(item, item.quantity - 1)}>
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography>{item.quantity}</Typography>
                  <IconButton size="small" onClick={() => onUpdateQuantity(item, item.quantity + 1)}>
                    <AddIcon fontSize="small" />
                  </IconButton>
                  <Button color="error" size="small" onClick={() => onRemoveItem(item)}>
                    Remove
                  </Button>
                </Stack>
              </Box>
            ))
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" fontWeight={800} sx={{ mb: 2, color: "#2E7D32" }}>
          Total: Rs {totalAmount}
        </Typography>

        <Button
          variant="contained"
          disabled={cartItems.length === 0}
          onClick={onOpenBooking}
          sx={{ bgcolor: "#2E7D32", "&:hover": { bgcolor: "#1b5e20" } }}
        >
          Book / Place Order
        </Button>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
