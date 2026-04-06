import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Stack,
  Button,
  Skeleton,
  Box,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import PhoneIcon from "@mui/icons-material/Phone";

const getCategoryColor = (category) => {
  if (category.includes("Seeds")) return "success";
  if (category.includes("Fertilizers")) return "primary";
  if (category.includes("Equipment")) return "warning";
  if (category.includes("Pesticides")) return "error";
  if (category.includes("Organic")) return "secondary";
  if (category.includes("Irrigation")) return "info";
  return "default";
};

const ShopCard = ({ shop, onViewProducts }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(shop.image);

  const fallbackShopImage =
    "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&h=300&q=80";

  return (
    <Card
      elevation={2}
      sx={{
        height: { xs: "100%", sm: 520 },
        width: "100%",
        borderRadius: 3,
        border: "1px solid #e8f5e9",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 10px 22px rgba(27, 94, 32, 0.12)",
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        {!imgLoaded && (
          <Skeleton variant="rectangular" width="100%" height={180} />
        )}
        <CardMedia
          component="img"
          height="190"
          image={imageSrc}
          alt={shop.name}
          onLoad={() => setImgLoaded(true)}
          onError={() => {
            if (imageSrc !== fallbackShopImage) {
              setImgLoaded(false);
              setImageSrc(fallbackShopImage);
              return;
            }
            setImgLoaded(true);
          }}
          sx={{ display: imgLoaded ? "block" : "none" }}
        />
      </Box>

      <CardContent
        sx={{
          flexGrow: 1,
          display: "grid",
          gridTemplateRows: { xs: "72px 28px 54px 26px auto", sm: "72px 28px 54px 26px 44px" },
          rowGap: 1.2,
          p: 2.2,
          height: "100%",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={1}
          sx={{ height: 72 }}
        >
          <Typography
            variant="h6"
            fontWeight={700}
            color="#1b5e20"
            sx={{
              height: 52,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              lineHeight: 1.25,
              flex: 1,
              pr: 0.5,
            }}
          >
            {shop.name}
          </Typography>
          <Chip
            label={shop.category}
            color={getCategoryColor(shop.category)}
            size="small"
            sx={{
              fontWeight: 700,
              flexShrink: 0,
              mt: 0.25,
              borderRadius: 1.5,
              maxWidth: "52%",
              "& .MuiChip-label": {
                overflow: "hidden",
                textOverflow: "ellipsis",
              },
            }}
          />
        </Stack>

        <Stack direction="row" alignItems="center" spacing={0.6} sx={{ minHeight: 28 }}>
          <StarIcon sx={{ color: "#f9a825", fontSize: 20 }} />
          <Typography variant="body2" fontWeight={600}>
            {shop.rating}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ({shop.reviews} reviews)
          </Typography>
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            height: 54,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            lineHeight: 1.35,
          }}
        >
          {shop.address}
        </Typography>

        <Stack direction="row" justifyContent="space-between" sx={{ height: 26, alignItems: "center" }}>
          <Typography variant="body2" sx={{ color: "#2E7D32", fontWeight: 700 }}>
            {shop.distance} away
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: 600, maxWidth: "58%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
          >
            {shop.hours}
          </Typography>
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ height: "100%" }}>
          <Button
            variant="outlined"
            color="success"
            fullWidth
            startIcon={<PhoneIcon />}
            component="a"
            href={`tel:${shop.phone.replace(/\s+/g, "")}`}
            sx={{ minHeight: 44, height: "100%" }}
          >
            Call
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={() => onViewProducts(shop)}
            sx={{
              bgcolor: "#2E7D32",
              "&:hover": { bgcolor: "#1b5e20" },
              minHeight: 44,
              height: "100%",
            }}
          >
            View Products
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ShopCard;
