import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Chip,
  Grid,
  Stack,
  Button,
  Fab,
  Badge,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Skeleton,
  InputAdornment,
  MenuItem,
  Divider,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import StarIcon from "@mui/icons-material/Star";
import PhoneIcon from "@mui/icons-material/Phone";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShopCard from "../components/ShopCard";
import ProductCard from "../components/ProductCard";
import CartDrawer from "../components/CartDrawer";
import BookingModal from "../components/BookingModal";
import API from "../components/api";

const RELATED_IMAGE_LIBRARY = {
  seeds: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
  fertilizer: "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
  pesticide: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
  irrigation: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
  equipment: "https://images.unsplash.com/photo-1464983953574-0892a716854b",
  organic: "https://images.unsplash.com/photo-1464226184884-fa280b87c399",
  shop: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854",
  fallback: "https://images.unsplash.com/photo-1438109491414-7198515b166b",
};

const relatedImage = (width, height, keywords) => {
  const key = keywords.toLowerCase();

  let base = RELATED_IMAGE_LIBRARY.fallback;

  if (key.includes("shop") || key.includes("market") || key.includes("store") || key.includes("clinic")) {
    base = RELATED_IMAGE_LIBRARY.shop;
  }

  if (key.includes("seed") || key.includes("paddy") || key.includes("okra") || key.includes("chilli")) {
    base = RELATED_IMAGE_LIBRARY.seeds;
  }

  if (key.includes("organic") || key.includes("compost") || key.includes("bio") || key.includes("manure")) {
    base = RELATED_IMAGE_LIBRARY.organic;
  }

  if (key.includes("fertilizer") || key.includes("npk") || key.includes("urea") || key.includes("sulphate")) {
    base = RELATED_IMAGE_LIBRARY.fertilizer;
  }

  if (key.includes("pesticide") || key.includes("fungicide") || key.includes("insecticide")) {
    base = RELATED_IMAGE_LIBRARY.pesticide;
  }

  if (key.includes("irrigation") || key.includes("drip") || key.includes("sprinkler") || key.includes("pump") || key.includes("pipe")) {
    base = RELATED_IMAGE_LIBRARY.irrigation;
  }

  if (key.includes("equipment") || key.includes("tool") || key.includes("tractor") || key.includes("meter") || key.includes("blade")) {
    base = RELATED_IMAGE_LIBRARY.equipment;
  }

  return `${base}?auto=format&fit=crop&w=${width}&h=${height}&q=80`;
};

const SHOPS = [
  {
    id: 1,
    name: "Krishi Seva Kendra",
    category: "Seeds & Fertilizers",
    categories: ["Seeds", "Fertilizers"],
    address: "Near Yelahanka Old Town, Bangalore - 560064",
    distance: "0.8 km",
    phone: "+91 98450 12345",
    whatsapp: "919845012345",
    rating: 4.5,
    reviews: 128,
    hours: "Mon-Sat: 8AM - 7PM",
    image: relatedImage(600, 300, "agriculture,seed,store", 1001),
    products: [
      { id: 101, name: "Hybrid Tomato Seeds", price: 120, unit: "per packet", stock: "In Stock", image: relatedImage(300, 200, "tomato,seeds", 1101) },
      { id: 102, name: "DAP Fertilizer", price: 1350, unit: "per 50kg bag", stock: "In Stock", image: relatedImage(300, 200, "fertilizer,bag", 1102) },
      { id: 103, name: "Urea Fertilizer", price: 280, unit: "per 45kg bag", stock: "Limited", image: relatedImage(300, 200, "urea,fertilizer", 1103) },
      { id: 104, name: "Paddy Seeds (IR-64)", price: 85, unit: "per kg", stock: "In Stock", image: relatedImage(300, 200, "rice,paddy,seeds", 1104) },
      { id: 105, name: "Marigold Seeds", price: 45, unit: "per packet", stock: "In Stock", image: relatedImage(300, 200, "marigold,flower,seeds", 1105) },
      { id: 106, name: "Potassium Sulphate", price: 620, unit: "per 25kg bag", stock: "Out of Stock", image: relatedImage(300, 200, "agro,chemical,fertilizer", 1106) }
    ]
  },
  {
    id: 2,
    name: "Namma Raita Mitra",
    category: "Organic & Natural",
    categories: ["Organic", "Seeds"],
    address: "Yelahanka New Town, Sector 3, Bangalore - 560064",
    distance: "1.2 km",
    phone: "+91 80 2846 5678",
    whatsapp: "918028465678",
    rating: 4.8,
    reviews: 203,
    hours: "Mon-Sun: 7AM - 8PM",
    image: relatedImage(600, 300, "organic,farm,shop", 1002),
    products: [
      { id: 201, name: "Organic Vermicompost", price: 25, unit: "per kg", stock: "In Stock", image: relatedImage(300, 200, "vermicompost,organic", 1201) },
      { id: 202, name: "Neem Oil Pesticide", price: 180, unit: "per litre", stock: "In Stock", image: relatedImage(300, 200, "neem,pesticide", 1202) },
      { id: 203, name: "Cow Dung Manure", price: 15, unit: "per kg", stock: "In Stock", image: relatedImage(300, 200, "compost,manure", 1203) },
      { id: 204, name: "Panchagavya (5L)", price: 450, unit: "per can", stock: "Limited", image: relatedImage(300, 200, "organic,liquid,fertilizer", 1204) },
      { id: 205, name: "Bio-Fertilizer Packet", price: 95, unit: "per kg", stock: "In Stock", image: relatedImage(300, 200, "biofertilizer,organic", 1205) }
    ]
  },
  {
    id: 3,
    name: "Agro Equipment Hub",
    category: "Farm Equipment",
    categories: ["Equipment", "Irrigation"],
    address: "KIADB Industrial Area, Yelahanka, Bangalore - 560106",
    distance: "2.5 km",
    phone: "+91 99001 87654",
    whatsapp: "919900187654",
    rating: 4.3,
    reviews: 89,
    hours: "Mon-Sat: 9AM - 6PM",
    image: relatedImage(600, 300, "tractor,farm,equipment", 1003),
    products: [
      { id: 301, name: "Drip Irrigation Kit (1 acre)", price: 4500, unit: "per set", stock: "In Stock", image: relatedImage(300, 200, "drip,irrigation", 1301) },
      { id: 302, name: "Sprinkler System", price: 2800, unit: "per set", stock: "In Stock", image: relatedImage(300, 200, "sprinkler,irrigation", 1302) },
      { id: 303, name: "Hand Weeder Tool", price: 350, unit: "per piece", stock: "In Stock", image: relatedImage(300, 200, "garden,tool,weeder", 1303) },
      { id: 304, name: "Knapsack Sprayer (16L)", price: 1200, unit: "per piece", stock: "Limited", image: relatedImage(300, 200, "sprayer,pump,agriculture", 1304) },
      { id: 305, name: "Soil pH Meter", price: 850, unit: "per piece", stock: "In Stock", image: relatedImage(300, 200, "soil,meter,test", 1305) },
      { id: 306, name: "Water Pump (1HP)", price: 6500, unit: "per unit", stock: "In Stock", image: relatedImage(300, 200, "water,pump,agriculture", 1306) }
    ]
  },
  {
    id: 4,
    name: "Pesticide & Crop Protection",
    category: "Pesticides",
    categories: ["Pesticides", "Fertilizers"],
    address: "Doddaballapura Road, Yelahanka, Bangalore - 560064",
    distance: "1.8 km",
    phone: "+91 96320 45678",
    whatsapp: "919632045678",
    rating: 4.1,
    reviews: 67,
    hours: "Mon-Sat: 8:30AM - 6:30PM",
    image: relatedImage(600, 300, "pesticide,crop,agriculture", 1004),
    products: [
      { id: 401, name: "Chlorpyrifos 20% EC", price: 320, unit: "per litre", stock: "In Stock", image: relatedImage(300, 200, "pesticide,bottle", 1401) },
      { id: 402, name: "Mancozeb Fungicide", price: 145, unit: "per 500g", stock: "In Stock", image: relatedImage(300, 200, "fungicide,powder", 1402) },
      { id: 403, name: "Imidacloprid 17.8% SL", price: 480, unit: "per 250ml", stock: "Limited", image: relatedImage(300, 200, "insecticide,bottle", 1403) },
      { id: 404, name: "Copper Oxychloride", price: 210, unit: "per kg", stock: "In Stock", image: relatedImage(300, 200, "copper,fungicide", 1404) }
    ]
  },
  {
    id: 5,
    name: "Yelahanka Agro Mart",
    category: "Seeds & Organic",
    categories: ["Seeds", "Organic"],
    address: "Attur Layout, Yelahanka, Bangalore - 560064",
    distance: "2.1 km",
    phone: "+91 99867 22331",
    whatsapp: "919986722331",
    rating: 4.4,
    reviews: 96,
    hours: "Mon-Sat: 8AM - 7:30PM",
    image: relatedImage(600, 300, "seed,agriculture,market", 1005),
    products: [
      { id: 501, name: "Groundnut Seeds", price: 140, unit: "per kg", stock: "In Stock", image: relatedImage(300, 200, "groundnut,seeds", 1501) },
      { id: 502, name: "Green Gram Seeds", price: 110, unit: "per kg", stock: "In Stock", image: relatedImage(300, 200, "green-gram,seeds", 1502) },
      { id: 503, name: "Organic Potting Mix", price: 220, unit: "per bag", stock: "Limited", image: relatedImage(300, 200, "potting,mix,organic", 1503) },
      { id: 504, name: "Seaweed Bio Stimulant", price: 360, unit: "per litre", stock: "In Stock", image: relatedImage(300, 200, "seaweed,liquid,fertilizer", 1504) }
    ]
  },
  {
    id: 6,
    name: "GreenField Irrigation Point",
    category: "Irrigation Solutions",
    categories: ["Irrigation", "Equipment"],
    address: "Vidyaranyapura Main Road, Near Yelahanka, Bangalore - 560097",
    distance: "3.3 km",
    phone: "+91 97411 34009",
    whatsapp: "919741134009",
    rating: 4.6,
    reviews: 141,
    hours: "Mon-Sat: 9AM - 6:30PM",
    image: relatedImage(600, 300, "irrigation,farm,shop", 1006),
    products: [
      { id: 601, name: "HDPE Pipe Roll (50m)", price: 1850, unit: "per roll", stock: "In Stock", image: relatedImage(300, 200, "hdpe,pipe,irrigation", 1601) },
      { id: 602, name: "Drip Lateral Pipe", price: 12, unit: "per meter", stock: "In Stock", image: relatedImage(300, 200, "drip,lateral,pipe", 1602) },
      { id: 603, name: "Venturi Injector", price: 950, unit: "per piece", stock: "Limited", image: relatedImage(300, 200, "venturi,injector,irrigation", 1603) },
      { id: 604, name: "Rain Gun Sprinkler", price: 3200, unit: "per piece", stock: "In Stock", image: relatedImage(300, 200, "rain-gun,sprinkler", 1604) }
    ]
  },
  {
    id: 7,
    name: "Sri Lakshmi Fertilizer Depot",
    category: "Fertilizers",
    categories: ["Fertilizers", "Pesticides"],
    address: "Kogilu Cross, Yelahanka, Bangalore - 560064",
    distance: "1.6 km",
    phone: "+91 98801 11442",
    whatsapp: "919880111442",
    rating: 4.2,
    reviews: 74,
    hours: "Mon-Sat: 8AM - 6:45PM",
    image: relatedImage(600, 300, "fertilizer,agro,store", 1007),
    products: [
      { id: 701, name: "NPK 19:19:19", price: 760, unit: "per 25kg bag", stock: "In Stock", image: relatedImage(300, 200, "npk,fertilizer,bag", 1701) },
      { id: 702, name: "Zinc Sulphate", price: 280, unit: "per kg", stock: "In Stock", image: relatedImage(300, 200, "zinc,sulphate,fertilizer", 1702) },
      { id: 703, name: "Calcium Nitrate", price: 420, unit: "per kg", stock: "Limited", image: relatedImage(300, 200, "calcium,nitrate", 1703) },
      { id: 704, name: "Plant Growth Regulator", price: 240, unit: "per 500ml", stock: "In Stock", image: relatedImage(300, 200, "plant,growth,regulator", 1704) }
    ]
  },
  {
    id: 8,
    name: "Farmer Choice Agro Clinic",
    category: "Seeds & Pesticides",
    categories: ["Seeds", "Pesticides"],
    address: "Jakkur Main Road, Yelahanka, Bangalore - 560064",
    distance: "4.0 km",
    phone: "+91 96118 77221",
    whatsapp: "919611877221",
    rating: 4.7,
    reviews: 156,
    hours: "Mon-Sun: 7:30AM - 8PM",
    image: relatedImage(600, 300, "agro,clinic,seed", 1008),
    products: [
      { id: 801, name: "Chilli Seeds (Hybrid)", price: 210, unit: "per packet", stock: "In Stock", image: relatedImage(300, 200, "chilli,seeds", 1801) },
      { id: 802, name: "Okra Seeds", price: 95, unit: "per packet", stock: "In Stock", image: relatedImage(300, 200, "okra,seeds", 1802) },
      { id: 803, name: "Sticky Insect Trap", price: 30, unit: "per sheet", stock: "In Stock", image: relatedImage(300, 200, "insect,sticky,trap", 1803) },
      { id: 804, name: "Systemic Insecticide", price: 520, unit: "per litre", stock: "Limited", image: relatedImage(300, 200, "systemic,insecticide", 1804) }
    ]
  },
  {
    id: 9,
    name: "Yelahanka Tool & Tractor Supplies",
    category: "Equipment",
    categories: ["Equipment", "Irrigation"],
    address: "Bellary Road Service Lane, Yelahanka, Bangalore - 560064",
    distance: "4.6 km",
    phone: "+91 93428 66550",
    whatsapp: "919342866550",
    rating: 4.3,
    reviews: 102,
    hours: "Mon-Sat: 9AM - 7PM",
    image: relatedImage(600, 300, "tractor,tools,agriculture", 1009),
    products: [
      { id: 901, name: "Mini Tiller Blade Set", price: 1450, unit: "per set", stock: "In Stock", image: relatedImage(300, 200, "tiller,blade", 1901) },
      { id: 902, name: "Power Sprayer Hose", price: 480, unit: "per roll", stock: "In Stock", image: relatedImage(300, 200, "sprayer,hose", 1902) },
      { id: 903, name: "PVC Foot Valve", price: 160, unit: "per piece", stock: "In Stock", image: relatedImage(300, 200, "foot,valve,pvc", 1903) },
      { id: 904, name: "Engine Oil for Pump Set", price: 290, unit: "per litre", stock: "Limited", image: relatedImage(300, 200, "engine,oil,pump", 1904) }
    ]
  }
];

const FILTERS = ["All", "Seeds", "Fertilizers", "Equipment", "Pesticides", "Organic", "Irrigation"];

const parseDistance = (distanceText) => {
  const value = parseFloat((distanceText || "").replace(/[^0-9.]/g, ""));
  return Number.isNaN(value) ? Number.MAX_SAFE_INTEGER : value;
};

const to24Hour = (hour, minute, suffix) => {
  let h = Number(hour);
  if (suffix.toUpperCase() === "PM" && h !== 12) h += 12;
  if (suffix.toUpperCase() === "AM" && h === 12) h = 0;
  return h * 60 + Number(minute || 0);
};

const isShopOpenNow = (hoursText) => {
  if (!hoursText) return false;
  const matches = hoursText.match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)\s*-\s*(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/i);
  if (!matches) return false;

  const [, sh, sm, ss, eh, em, es] = matches;
  const start = to24Hour(sh, sm, ss);
  const end = to24Hour(eh, em, es);

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  if (end < start) {
    return currentMinutes >= start || currentMinutes <= end;
  }

  return currentMinutes >= start && currentMinutes <= end;
};

const ShopHeader = ({ shop }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(shop.image);

  return (
    <Card sx={{ borderRadius: 3, border: "1px solid #e8f5e9", mb: 3 }}>
      <Box sx={{ position: "relative" }}>
        {!imgLoaded && <Skeleton variant="rectangular" width="100%" height={220} />}
        <Box
          component="img"
          src={imageSrc}
          alt={shop.name}
          onLoad={() => setImgLoaded(true)}
          onError={() => {
            setImageSrc(relatedImage(600, 300, "agriculture,shop"));
            setImgLoaded(true);
          }}
          sx={{
            width: "100%",
            height: 220,
            objectFit: "cover",
            display: imgLoaded ? "block" : "none",
          }}
        />
      </Box>
      <CardContent>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
        >
          <Box>
            <Typography variant="h5" fontWeight={800} color="#1b5e20">
              {shop.name}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.8 }}>
              <StarIcon sx={{ color: "#f9a825" }} />
              <Typography variant="body1" fontWeight={700}>
                {shop.rating}
              </Typography>
              <Typography color="text.secondary">({shop.reviews} reviews)</Typography>
            </Stack>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              {shop.address}
            </Typography>
            <Typography sx={{ mt: 0.5, fontWeight: 700 }}>{shop.hours}</Typography>
          </Box>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2}>
            <Button
              component="a"
              href={`tel:${shop.phone.replace(/\s+/g, "")}`}
              startIcon={<PhoneIcon />}
              variant="outlined"
              color="success"
            >
              {shop.phone}
            </Button>
            <Button
              component="a"
              target="_blank"
              rel="noreferrer"
              href={`https://wa.me/${shop.whatsapp}?text=${encodeURIComponent("Hi, I'm interested in your products")}`}
              startIcon={<WhatsAppIcon />}
              variant="contained"
              sx={{ bgcolor: "#2E7D32", "&:hover": { bgcolor: "#1b5e20" } }}
            >
              WhatsApp
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

const AgriShops = ({ farmer }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("distanceAsc");
  const [openNowOnly, setOpenNowOnly] = useState(false);
  const [highRatedOnly, setHighRatedOnly] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);
  const [productSearch, setProductSearch] = useState("");
  const [productSort, setProductSort] = useState("relevance");
  const [productStockFilter, setProductStockFilter] = useState("All");
  const [cartOpen, setCartOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [submittingOrder, setSubmittingOrder] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [toast, setToast] = useState({ open: false, severity: "success", message: "" });

  const filteredShops = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return SHOPS.filter((shop) => {
      const categoryMatch =
        activeCategory === "All" || shop.categories.includes(activeCategory);

      const ratingMatch = !highRatedOnly || shop.rating >= 4.5;

      const openMatch = !openNowOnly || isShopOpenNow(shop.hours);

      const searchMatch =
        !term ||
        shop.name.toLowerCase().includes(term) ||
        shop.category.toLowerCase().includes(term) ||
        shop.categories.some((cat) => cat.toLowerCase().includes(term));

      return categoryMatch && searchMatch && ratingMatch && openMatch;
    }).sort((a, b) => {
      if (sortBy === "ratingDesc") return b.rating - a.rating;
      if (sortBy === "distanceAsc") return parseDistance(a.distance) - parseDistance(b.distance);
      if (sortBy === "reviewsDesc") return b.reviews - a.reviews;
      return a.name.localeCompare(b.name);
    });
  }, [searchTerm, activeCategory, sortBy, openNowOnly, highRatedOnly]);

  const visibleProducts = useMemo(() => {
    if (!selectedShop) return [];

    const term = productSearch.trim().toLowerCase();

    return [...selectedShop.products]
      .filter((product) => {
        const termMatch =
          !term ||
          product.name.toLowerCase().includes(term) ||
          product.unit.toLowerCase().includes(term);

        const stockMatch =
          productStockFilter === "All" || product.stock === productStockFilter;

        return termMatch && stockMatch;
      })
      .sort((a, b) => {
        if (productSort === "priceAsc") return a.price - b.price;
        if (productSort === "priceDesc") return b.price - a.price;
        if (productSort === "nameAsc") return a.name.localeCompare(b.name);
        if (productSort === "stockFirst") {
          const score = { "In Stock": 2, Limited: 1, "Out of Stock": 0 };
          return score[b.stock] - score[a.stock];
        }
        return 0;
      });
  }, [selectedShop, productSearch, productSort, productStockFilter]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeDeliveryThreshold = 2000;
  const amountToFreeDelivery = Math.max(freeDeliveryThreshold - totalAmount, 0);

  const handleAddToCart = (shop, product, quantity) => {
    if (product.stock === "Out of Stock") {
      setToast({ open: true, severity: "warning", message: "This product is currently out of stock." });
      return;
    }

    setCartItems((prev) => {
      const key = `${shop.id}-${product.id}`;
      const existing = prev.find((item) => `${item.shopId}-${item.id}` === key);

      if (existing) {
        return prev.map((item) =>
          `${item.shopId}-${item.id}` === key
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity,
          shopId: shop.id,
          shopName: shop.name,
        },
      ];
    });

    setToast({ open: true, severity: "success", message: `${product.name} added to cart.` });
  };

  const handleUpdateQuantity = (item, qty) => {
    if (qty <= 0) {
      setCartItems((prev) =>
        prev.filter((x) => !(`${x.shopId}-${x.id}` === `${item.shopId}-${item.id}`))
      );
      return;
    }

    setCartItems((prev) =>
      prev.map((x) =>
        `${x.shopId}-${x.id}` === `${item.shopId}-${item.id}` ? { ...x, quantity: qty } : x
      )
    );
  };

  const handleRemoveItem = (item) => {
    setCartItems((prev) =>
      prev.filter((x) => !(`${x.shopId}-${x.id}` === `${item.shopId}-${item.id}`))
    );
  };

  const handleConfirmBooking = async (formData) => {
    if (!formData.customerName || !formData.phone || !formData.deliveryAddress || !formData.deliveryDate) {
      setToast({ open: true, severity: "error", message: "Please fill all required booking details." });
      return;
    }

    if (cartItems.length === 0) {
      setToast({ open: true, severity: "error", message: "Your cart is empty." });
      return;
    }

    setSubmittingOrder(true);

    try {
      const firstShop = SHOPS.find((shop) => shop.id === cartItems[0].shopId);

      const payload = {
        shopId: firstShop?.id,
        shopName: firstShop?.name || "Multiple Shops",
        items: cartItems.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          unit: item.unit,
          quantity: item.quantity,
          subtotal: item.quantity * item.price,
        })),
        totalAmount,
        customerName: formData.customerName,
        phone: formData.phone,
        deliveryAddress: formData.deliveryAddress,
        deliveryDate: formData.deliveryDate,
        paymentMethod: formData.paymentMethod,
        notes: formData.notes,
      };

      const { data } = await API.post("/shops/orders", payload);

      setToast({
        open: true,
        severity: "success",
        message: `Order placed successfully. Order ID: ${data.orderId}`,
      });
      setBookingOpen(false);
      setCartOpen(false);
      setCartItems([]);
    } catch (error) {
      setToast({
        open: true,
        severity: "error",
        message: error.response?.data?.message || "Failed to place order. Please try again.",
      });
    } finally {
      setSubmittingOrder(false);
    }
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 3 },
        background: "linear-gradient(180deg, #eef8f0 0%, #f9fcf6 100%)",
        minHeight: "100vh",
      }}
    >
      {!selectedShop ? (
        <>
          <Card
            sx={{
              borderRadius: 4,
              border: "1px solid #d7ebdc",
              background: "linear-gradient(135deg, #f8fff8 0%, #e8f5e9 48%, #f3fff6 100%)",
              mb: 3,
            }}
          >
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Stack
                direction={{ xs: "column", lg: "row" }}
                spacing={2}
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", lg: "center" }}
              >
                <Box>
                  <Typography variant="h4" fontWeight={900} sx={{ color: "#1b5e20", mb: 0.5 }}>
                    AgriShops Near Yelahanka
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Discover trusted local suppliers for seeds, fertilizers, protection and farm equipment
                  </Typography>
                </Box>
                <Stack direction={{ xs: "row", sm: "row" }} spacing={1}>
                  <Chip label={`${filteredShops.length} shops`} color="success" sx={{ fontWeight: 700 }} />
                  <Chip label={`${cartCount} items in cart`} variant="outlined" sx={{ fontWeight: 700 }} />
                </Stack>
              </Stack>

              <Grid container spacing={1.2} sx={{ mt: 1.2 }}>
                <Grid item xs={12} md={6} lg={5}>
                  <TextField
                    fullWidth
                    placeholder="Search by shop name, category or product type"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": { borderRadius: 3, bgcolor: "#fff" },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2.5}>
                  <TextField
                    select
                    fullWidth
                    label="Sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3, bgcolor: "#fff" } }}
                  >
                    <MenuItem value="distanceAsc">Nearest first</MenuItem>
                    <MenuItem value="ratingDesc">Top rated</MenuItem>
                    <MenuItem value="reviewsDesc">Most reviewed</MenuItem>
                    <MenuItem value="nameAsc">Name A-Z</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={4.5}>
                  <Stack direction="row" spacing={1} sx={{ height: "100%", alignItems: "center", flexWrap: "wrap" }}>
                    <Chip
                      icon={<TuneIcon />}
                      label="Open now"
                      color={openNowOnly ? "success" : "default"}
                      onClick={() => setOpenNowOnly((prev) => !prev)}
                      clickable
                      sx={{ fontWeight: 700 }}
                    />
                    <Chip
                      icon={<StarIcon />}
                      label="4.5+ rating"
                      color={highRatedOnly ? "success" : "default"}
                      onClick={() => setHighRatedOnly((prev) => !prev)}
                      clickable
                      sx={{ fontWeight: 700 }}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Stack direction="row" spacing={1} sx={{ mb: 2.2, flexWrap: "wrap", rowGap: 1 }}>
            {FILTERS.map((category) => (
              <Chip
                key={category}
                label={category}
                clickable
                color={activeCategory === category ? "success" : "default"}
                onClick={() => setActiveCategory(category)}
                sx={{ fontWeight: 700, borderRadius: 2 }}
              />
            ))}
          </Stack>

          {filteredShops.length === 0 ? (
            <Card sx={{ borderRadius: 3, p: 2.5, border: "1px solid #e8f5e9", bgcolor: "#fff" }}>
              <Typography variant="h6" fontWeight={800} color="#1b5e20" gutterBottom>
                No shops matched these filters
              </Typography>
              <Typography color="text.secondary">
                Try removing a filter or searching with fewer keywords.
              </Typography>
            </Card>
          ) : (
            <Grid container spacing={2.2} alignItems="stretch">
            {filteredShops.map((shop) => (
              <Grid item xs={12} sm={6} lg={4} key={shop.id} sx={{ display: "flex" }}>
                <ShopCard shop={shop} onViewProducts={setSelectedShop} />
              </Grid>
            ))}
            </Grid>
          )}
        </>
      ) : (
        <>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => setSelectedShop(null)}
            sx={{ mb: 2, color: "#2E7D32", fontWeight: 700 }}
          >
            Back to Shops
          </Button>

          <ShopHeader shop={selectedShop} />

          <Card sx={{ mb: 2, borderRadius: 3, border: "1px solid #e8f5e9" }}>
            <CardContent sx={{ p: 2 }}>
              <Grid container spacing={1.2} alignItems="center">
                <Grid item xs={12} md={5}>
                  <TextField
                    fullWidth
                    placeholder="Search products by name"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2.5, bgcolor: "#fff" } }}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <TextField
                    select
                    fullWidth
                    label="Sort products"
                    value={productSort}
                    onChange={(e) => setProductSort(e.target.value)}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2.5, bgcolor: "#fff" } }}
                  >
                    <MenuItem value="relevance">Relevance</MenuItem>
                    <MenuItem value="priceAsc">Price low to high</MenuItem>
                    <MenuItem value="priceDesc">Price high to low</MenuItem>
                    <MenuItem value="nameAsc">Name A-Z</MenuItem>
                    <MenuItem value="stockFirst">Stock priority</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={6} md={2}>
                  <TextField
                    select
                    fullWidth
                    label="Stock"
                    value={productStockFilter}
                    onChange={(e) => setProductStockFilter(e.target.value)}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2.5, bgcolor: "#fff" } }}
                  >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="In Stock">In Stock</MenuItem>
                    <MenuItem value="Limited">Limited</MenuItem>
                    <MenuItem value="Out of Stock">Out of Stock</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Chip
                    icon={<LocalShippingIcon />}
                    color={amountToFreeDelivery === 0 ? "success" : "default"}
                    variant={amountToFreeDelivery === 0 ? "filled" : "outlined"}
                    label={
                      amountToFreeDelivery === 0
                        ? "Free delivery unlocked"
                        : `Rs ${amountToFreeDelivery} for free delivery`
                    }
                    sx={{ fontWeight: 700, width: "100%", justifyContent: "flex-start" }}
                  />
                </Grid>
              </Grid>
              <Divider sx={{ my: 1.5 }} />
              <Typography variant="body2" color="text.secondary" fontWeight={600}>
                Showing {visibleProducts.length} product{visibleProducts.length === 1 ? "" : "s"}
              </Typography>
            </CardContent>
          </Card>

          <Grid container spacing={2} alignItems="stretch">
            {visibleProducts.map((product) => (
              <Grid item xs={6} md={3} key={product.id} sx={{ display: "flex" }}>
                <ProductCard
                  product={product}
                  onAddToCart={(p, qty) => handleAddToCart(selectedShop, p, qty)}
                />
              </Grid>
            ))}
          </Grid>

          {visibleProducts.length === 0 && (
            <Card sx={{ mt: 2, borderRadius: 3, p: 2, border: "1px solid #e8f5e9" }}>
              <Typography variant="subtitle1" fontWeight={700} color="#1b5e20">
                No products matched your current filters
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Change stock filter or clear search to see all products.
              </Typography>
            </Card>
          )}
        </>
      )}

      <Fab
        color="success"
        onClick={() => setCartOpen(true)}
        sx={{ position: "fixed", right: 24, bottom: 24, bgcolor: "#2E7D32" }}
      >
        <Badge badgeContent={cartCount} color="error">
          <ShoppingCartIcon />
        </Badge>
      </Fab>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOpenBooking={() => setBookingOpen(true)}
        totalAmount={totalAmount}
      />

      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        onConfirm={handleConfirmBooking}
        loading={submittingOrder}
        farmer={farmer}
      />

      <Snackbar
        open={toast.open}
        autoHideDuration={2500}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={toast.severity}
          onClose={() => setToast((prev) => ({ ...prev, open: false }))}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AgriShops;
