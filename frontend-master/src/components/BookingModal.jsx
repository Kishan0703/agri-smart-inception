import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const BookingModal = ({ open, onClose, onConfirm, loading, farmer }) => {
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    deliveryAddress: "Yelahanka, Bangalore",
    deliveryDate: "",
    notes: "",
    paymentMethod: "Cash on Delivery",
  });

  useEffect(() => {
    if (!open) return;

    setForm((prev) => ({
      ...prev,
      customerName: farmer?.name || prev.customerName || "",
    }));
  }, [open, farmer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onConfirm(form);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 800, color: "#1b5e20" }}>Booking Details</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Full Name"
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Phone Number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Delivery Address"
            name="deliveryAddress"
            value={form.deliveryAddress}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Preferred Delivery Date"
            name="deliveryDate"
            type="date"
            value={form.deliveryDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="Order Notes (optional)"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
          />

          <FormControl>
            <FormLabel>Payment Method</FormLabel>
            <RadioGroup
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
            >
              <FormControlLabel value="Cash on Delivery" control={<Radio />} label="Cash on Delivery" />
              <FormControlLabel value="UPI" control={<Radio />} label="UPI" />
              <FormControlLabel value="Bank Transfer" control={<Radio />} label="Bank Transfer" />
            </RadioGroup>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          sx={{ bgcolor: "#2E7D32", "&:hover": { bgcolor: "#1b5e20" } }}
        >
          Confirm Booking
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingModal;
