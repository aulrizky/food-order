import React, { useState } from "react";
import {
  Container,
  Box,
  Card,
  CardMedia,
  Typography,
  Button,
  Divider,
  Stack,
} from "@mui/material";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import formatCurrency from "../util/FormatCurrency";
import FavoriteDialog from "../components/FavoritDialog";
import AlertDialog from "../components/AlertDialog";
import WarnImage from "../public/svg/warn.svg";
import { putFavorite, postAddToCart, deleteCart } from "../services/apis";
export default function FoodProfile({
  cart,
  setCart,
  detailMakanan,
  // fetchMakanan,
}) {
  const [isStarred, setIsStarred] = useState(false);
  const [isAddedtoCart, setIsAddedtoCart] = useState(false);
  const [openFavoriteDialog, setOpenFavoriteDialog] = useState(false);
  const [openWarningDialog, setOpenWarningDialog] = useState(false);
  const [favoriteMessage, setFavoriteMessage] = useState("");
  const [warnMessage, setWarnMessage] = useState("");
  // const [statusFavorites, setStatusFavorites] = useState(false);
  const [isFavorite, setIsFavorite] = useState(Boolean);

  async function putFoodFavorite(
    foodId,
    foodName,
    statusFavorite
    // fetchMakanan
  ) {
    try {
      if (statusFavorite === false) {
        setFavoriteMessage(`Berhasil Menambah Resep ${foodName}`);
        // setStatusFavorites(true);
      } else if (statusFavorite === true) {
        setFavoriteMessage(`Berhasil Menghapus Resep ${foodName}`);
        // setStatusFavorites(false);
      }
      await putFavorite(foodId);
      // fetchMakanan(foodId);
      // setOpenFavoriteDialog(true);
    } catch (error) {
      console.log("error change favorite", error);
      // setIsPageError(true);
    }
  }
  const handleCartClick = async (
    foodId,
    statusChart,
    foodName
    // fetchMakanan
  ) => {
    // if (isAddedtoCart) {
    //   setCart(cart - 1);
    // } else {
    //   setCart(cart + 1);
    // }
    // setIsAddedtoCart(!isAddedtoCart);
    try {
      let response;
      if (statusChart) {
        response = await deleteCart(foodId);
        setWarnMessage(`Berhasil Menghapus Resep ${foodName} dari Keranjang`);
      } else {
        response = await postAddToCart(foodId);
        setWarnMessage(`Berhasil Menambah Resep ${foodName} dari Keranjang`);
      }
      // fetchMakanan(foodId);
      setOpenWarningDialog(true);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (foodId, foodName, statusFavorite) => {
    console.log("status", statusFavorite);
    putFoodFavorite(foodId, foodName, statusFavorite);
  };
  const renderIngredients = (ingredient) => {
    return <div dangerouslySetInnerHTML={{ __html: ingredient }} />;
  };
  // const handleStarClick = () => {
  //   setIsStarred(!isStarred);
  // };
  return (
    <>
      <FavoriteDialog
        open={openFavoriteDialog}
        setOpen={setOpenFavoriteDialog}
        message={favoriteMessage}
      />
      <AlertDialog
        open={openWarningDialog}
        setOpen={setOpenWarningDialog}
        message={warnMessage}
        image={WarnImage}
        color={"#ff9966"}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-evenly",
        }}
      >
        <Card sx={{ maxWidth: 352 }}>
          <CardMedia
            width="352"
            height="200"
            image={detailMakanan.imageFilename}
            alt="makanan"
            component="img"
          ></CardMedia>
        </Card>
        <Box sx={{ width: 352 }}>
          <Typography variant="h5" color="black">
            {detailMakanan.foodName}
          </Typography>
          <Typography component="div" variant="subtitle1">
            <span style={{ color: "black" }}>Kategori :</span>
            <span style={{ color: "#00E696", marginLeft: 4 }}>
              {detailMakanan.categories?.categoryName}
            </span>
          </Typography>
          <Typography variant="subtitle1" color="black">
            {formatCurrency(detailMakanan.price)}
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" component="h4">
              Bahan Makanan
            </Typography>
            <Divider />
            <Typography variant="body1" component="ul" sx={{ pl: 2 }}>
              {renderIngredients(detailMakanan.ingredient)}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <Stack direction="column" spacing={2} justifyContent="space-evenly">
            <Button
              size="medium"
              variant="contained"
              onClick={() =>
                handleChange(
                  detailMakanan.foodId,
                  detailMakanan.foodName,
                  detailMakanan.isFavorite
                  // fetchMakanan
                )
              }
              startIcon={
                detailMakanan.isFavorite ? null : <StarBorderRoundedIcon />
              }
              sx={{
                width: "auto",
                backgroundColor: detailMakanan.isFavorite
                  ? "#FFFFFF"
                  : "#00E696",
                color: detailMakanan.isFavorite ? "#00E696" : "#FFFFFF",
                border: detailMakanan.isFavorite
                  ? "#00E696 2px solid"
                  : "#FFFFFF",
                "&:hover": {
                  backgroundColor: detailMakanan.isFavorite
                    ? "#FFFFFF"
                    : "#00E696",
                  outline: "none",
                },
                "&:focus": {
                  outline: "none",
                },
                textTransform: "none",
              }}
            >
              {detailMakanan.isFavorite ? "Batal" : "Tambah ke Favorite"}
            </Button>
            <Button
              size="medium"
              variant="contained"
              onClick={() =>
                handleCartClick(
                  detailMakanan.foodId,
                  detailMakanan.isCartDelete,
                  detailMakanan.foodName
                  // fetchMakanan
                )
              }
              startIcon={
                detailMakanan.isCartDelete ? null : <ShoppingCartRoundedIcon />
              }
              sx={{
                width: "auto",
                backgroundColor: detailMakanan.isCartDelete
                  ? "#FFFFFF"
                  : "#00E696",
                color: detailMakanan.isCartDelete ? "#00E696" : "#FFFFFF",
                border: detailMakanan.isCartDelete
                  ? "#00E696 2px solid"
                  : "#FFFFFF",
                textTransform: "capitalize",
                "&.hover": {
                  backgroundColor: detailMakanan.isCartDelete
                    ? "#FFFFFF"
                    : "#00E696",
                  outline: "none",
                },
                "&.focus": {
                  outline: "none",
                },
              }}
            >
              {detailMakanan.isCartDelete ? "Batal" : "Tambah ke Keranjang"}
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
