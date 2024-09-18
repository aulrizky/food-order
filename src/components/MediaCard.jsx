import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  IconButton,
  Box,
  Grid,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import formatCurrency from "../util/FormatCurrency";
import toast from "react-hot-toast";
import FavoriteDialog from "../components/FavoritDialog";
import AlertDialog from "../components/AlertDialog";
import WarnImage from "../public/svg/warn.svg";
import AddIcon from "@mui/icons-material/Add";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { putFavorite, postAddToCart, deleteCart } from "../services/apis";
import { useNavigate } from "react-router-dom"; // eslint-disable-next-line react/prop-types
export default function MediaCard({
  cart,
  setCart,
  dataMakanan,
  setIsPageError,
  fetchDataMakanan,
  currentPage,
  entries,
  sortBy,
  foodNameProperty,
  foodCategory,
  setDataMakanan,
}) {
  const [openFavoriteDialog, setOpenFavoriteDialog] = useState(false);
  const [openWarningDialog, setOpenWarningDialog] = useState(false);
  const [favoriteMessage, setFavoriteMessage] = useState("");
  const [warnMessage, setWarnMessage] = useState("");
  // const [statusFavorites, setStatusFavorites] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [isAddedtoCart, setIsAddedtoCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(Boolean);
  const navigate = useNavigate();
  const handleToHalamanMakanan = (foodId) => {
    navigate(`/halaman-makanan/${foodId}`);
  };
  const handleDeleteCart = async (foodId) => {
    try {
      const response = await deleteCart(foodId);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCartClick = async (foodId, statusChart, foodName) => {
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
        setWarnMessage("Berhasil Menghapus Resep dari Keranjang");
      } else {
        response = await postAddToCart(foodId);
        setWarnMessage("Berhasil Menambah Resep dari Keranjang");
      }
      fetchDataMakanan(
        currentPage,
        entries,
        sortBy,
        foodNameProperty,
        foodCategory
      );
      setOpenWarningDialog(true);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  async function putFoodFavorite(foodId, foodName, statusFavorite) {
    try {
      if (statusFavorite === false) {
        setFavoriteMessage(`Berhasil Menambah Resep ${foodName}`);
        // setStatusFavorites(true);
      } else if (statusFavorite === true) {
        setFavoriteMessage(`Berhasil Menghapus Resep ${foodName}`);
        // setStatusFavorites(false);
      }
      await putFavorite(foodId);
      fetchDataMakanan(
        currentPage,
        entries,
        sortBy,
        foodNameProperty,
        foodCategory
      );
      setOpenFavoriteDialog(true);
    } catch (error) {
      console.log("error change favorite", error);
      setIsPageError(true);
    }
  }

  const handleChange = (event, foodId, foodName, statusFavorite) => {
    console.log("status", statusFavorite);
    putFoodFavorite(foodId, foodName, statusFavorite);
  };
  useEffect(() => {
    fetchDataMakanan(
      currentPage,
      entries,
      sortBy,
      foodNameProperty,
      foodCategory
    );
  }, [currentPage, entries, sortBy, foodNameProperty, foodCategory]);

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
      {dataMakanan.map((data, index) => (
        <Grid item xs={6} sm={3} md={3} lg={3} key={index}>
          <Card sx={{ width: "100%" }}>
            <CardMedia
              component="img"
              height="140"
              image={data.imageFilename}
              alt={data.foodName}
              onClick={() => handleToHalamanMakanan(data.foodId)}
            />
            <CardContent
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Box>
                <Typography
                  gutterBottom
                  component="div"
                  variant="subtitle1"
                  color="greenyellow"
                >
                  {data.categories.categoryName}
                </Typography>
                <Typography variant="h5" color="black">
                  {data.foodName}
                </Typography>
                <Typography variant="subtitle1" color="black">
                  {formatCurrency(data.price)}
                </Typography>
                <FormGroup
                  sx={{
                    "&.MuiFormGroup-root": {
                      display: "flex",
                      justifyContent: "right",
                      position: "relative",
                      right: -17,
                    },
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={
                          <StarBorderRoundedIcon sx={{ color: "#00E969" }} />
                        }
                        checkedIcon={<StarIcon sx={{ color: "#00E969" }} />}
                      />
                    }
                    checked={data.isFavorite}
                    onChange={(event) => {
                      handleChange(
                        event,
                        data.foodId,
                        data.foodName,
                        data.isFavorite
                      );
                    }}
                  ></FormControlLabel>
                </FormGroup>
              </Box>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                size="small"
                variant="contained"
                onClick={() => handleCartClick(data.foodId, data.isCartDelete)}
                startIcon={
                  data.isCartDelete ? null : <ShoppingCartRoundedIcon />
                }
                sx={{
                  width: "auto",
                  backgroundColor: data.isCartDelete ? "#FFFFFF" : "#00E696",
                  color: data.isCartDelete ? "#00E696" : "#FFFFFF",
                  border: data.isCartDelete ? "#00E696 2px solid" : "#FFFFFF",
                  textTransform: "capitalize",
                  "&.hover": {
                    backgroundColor: data.isCartDelete ? "#FFFFFF" : "#00E696",
                    outline: "none",
                  },
                  "&.focus": {
                    outline: "none",
                  },
                }}
              >
                {data.isCartDelete ? "Batal" : "Tambah"}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </>
  );
}
