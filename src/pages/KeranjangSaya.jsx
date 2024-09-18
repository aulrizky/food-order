import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Icon,
  IconButton,
  Typography,
  Container,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Checkbox,
  FormControlLabel,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import NavBar from "../components/NavBar";
import CartCard from "../components/CartCard";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import AddCartDialog from "../components/AddCartDialog";
import notFoundImage from "../public/svg/SearchNotFound.svg";
import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import DeleteSweep from "@mui/icons-material/DeleteSweep";
import CheckOutDialog from "../components/CheckOutDialog";
import CheckoutIcon from "../public/svg/checkout.png";
import { getMyCart, checkoutCart, deleteCart } from "../services/apis";

export default function KeranjangSaya() {
  const { id } = useParams();
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [openCartDialog, setOpenCartDialog] = useState(false);
  const [openCheckoutDialog, setOpenCheckoutDialog] = useState(false);
  const [cartMessage, setCartMessage] = useState("");
  const [foodData, setFoodData] = useState({});
  const [checkedItems, setCheckedItems] = useState({});
  const [quantities, setQuantities] = useState({});
  const [openDialogDeleted, setOpenDialogDeleted] = useState(false);
  const [deletedFoodName, setDeletedFoodName] = useState("");
  const [deletedFoodId, setDeletedFoodId] = useState(null);
  const [cart, setCart] = useState(0);
  const [listCheckout, setListCheckout] = React.useState([]);
  const [total, setTotal] = useState(0);
  const [warnMassage, setWarnMassage] = useState("");

  const hanldeSetListCheckout = (cartId) => {
    const temp = listCheckout;
    temp.push(cartId);
    setListCheckout(temp);
  };

  const fetchFoodCart = async () => {
    try {
      const response = await getMyCart();
      // console.log(response);
      // response.data.forEach((item) => {
      //   initialCheckedItems[item.foodId] = false;
      //   initialQuantities[item.qty] = 1;
      // });

      setFoodData(response.data);

      const cartIds = response.data.data.map((item) => item.cartId);
      const initialCheckedItems = {};
      cartIds.forEach((item) => {
        initialCheckedItems[item] = false;
      });
      setCheckedItems(initialCheckedItems);

      const initialQuantities = {};
      cartIds.forEach((item) => {
        initialQuantities[item] = 1;
      });
      setQuantities(initialQuantities);
    } catch (error) {
      console.log(error.message);
      if (error.response.status === 404) {
        setIsDataEmpty(true);
      }
    }
  };

  useEffect(() => {
    fetchFoodCart();
  }, []);

  const handleCheckboxChange = (cartId) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [cartId]: !prevCheckedItems[cartId], // Toggle checked status
    }));
  };

  const foods = foodData.data || [];
  // console.log(foods);
  const handleCheckout = async () => {
    try {
      const cartIds = Object.keys(checkedItems).filter(
        (orderId) => checkedItems[orderId]
      );
      const payload = cartIds.map((val) => ({
        cartId: val,
      }));
      console.log("Payload for checkoutCart:", payload);
      const response = await checkoutCart(payload);

      console.log("Checkout successful Makanan:", response.data);
      fetchFoodCart();
      setOpenCartDialog(true);
      // setOpenCheckoutDialog(true);
      setCartMessage(`Berhasil Checkout Makanan`);
      // setWarnMassage("Apakah anda yakin untuk mengcheckout semua pesanan?");
    } catch (error) {
      console.error("Error checking out cart:", error);
    }
  };

  const handleRemoveFoodCart = async () => {
    try {
      if (deletedFoodId) {
        await deleteCart(deletedFoodId);

        const updatedFoods = foodData.foods.filter(
          (item) => item.foodId !== deletedFoodId
        );
        setFoodData((prevData) => ({
          ...prevData,
          foods: updatedFoods,
        }));
        setOpenDialogDeleted(false);
        setDeletedFoodId(null);
        setDeletedFoodName("");
      }
    } catch (error) {
      console.error("Error deleting food from cart:", error);
    }
  };

  const handleOpenCheckoutDialog = () => {
    setOpenCheckoutDialog(true);
    setWarnMassage("Apakah anda yakin untuk mengcheckout semua pesanan?");
  };

  const handleDeleteClick = (foodId, foodName) => {
    setDeletedFoodId(foodId);
    setDeletedFoodName(foodName);
    setOpenDialogDeleted(true);
  };

  const handleCloseDialogDeleted = () => {
    setOpenDialogDeleted(false);
    setDeletedFoodId(null);
    setDeletedFoodName("");
  };

  return (
    <>
      <NavBar cart={cart}></NavBar>
      <AddCartDialog
        open={openCartDialog}
        setOpen={setOpenCartDialog}
        message={cartMessage}
        handleRefetchData={fetchFoodCart}
      />
      {/* <CheckOutDialog
        open={openCheckoutDialog}
        setOpen={setOpenCheckoutDialog}
        message={warnMassage}
        image={CheckoutIcon}
        color={"#00C853"}
        // handleCheckOut={handleCheckout}
        checkedItems={checkedItems}
      /> */}
      <Container maxWidth="lg">
        <Box
          sx={{
            padding: { xs: 2, sm: 2, md: 2, lg: 4 },
            display: "flex",
            alignItems: "center",
          }}
          colors="black"
        >
          <IconButton
            aria-label="Example"
            onClick={() => navigate("/daftar-resep")}
          >
            <ArrowBackIosNewRoundedIcon></ArrowBackIosNewRoundedIcon>
          </IconButton>
          <Typography fontSize="36px" fontWeight="600" color="#263238">
            Keranjang Saya
          </Typography>
        </Box>
        {foods.length === 0 ? (
          <Box
            display="flex"
            flexDirection="column"
            marginX="auto"
            alignItems="center"
          >
            <Box display="flex" flexDirection="column" marginX="auto">
              <img src={notFoundImage} alt="notFound" width={500} />
              <Typography
                sx={{
                  fontSize: "24px",
                  textAlign: "center",
                  fontWeight: "700",
                }}
              >
                Makanan Kosong
              </Typography>
            </Box>
          </Box>
        ) : (
          <>
            {foodData.data.map((data, index) => (
              <CartCard
                // isChecked={listCheckout.includes(data.cartId)}
                dataCart={data}
                handleCheckboxChange={handleCheckboxChange}
                setQuantitiesBucket={setQuantities}
                setTotalBucket={setTotal}
                key={index}
              ></CartCard>
            ))}
          </>
        )}
        <Grid
          container
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          gap={2}
        >
          <Grid item>
            <Typography
              sx={{
                fontWeight: "400",
                marginTop: "10px",
              }}
            >
              Total Pesanan: Rp.
              {/* {foods.reduce(
                (total, item) =>
                  total +
                  (checkedItems[item.foodId]
                    ? quantities[item.foodId] * item.price
                    : 0),
                0
              )} */}
              {total}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              href="/daftar-makanan"
              variant="outlined"
              size="medium"
              disableElevation
              sx={{
                color: "#00E696",
                textTransform: "none",
                border: "1px solid #00E696",
                "&:hover": {
                  backgroundColor: "#00E696",
                },
                marginTop: "15px",
                marginRight: "8px",
              }}
            >
              <Box display="flex" gap={2}>
                <Typography sx={{ fontWeight: "700" }}>Kembali</Typography>
              </Box>
            </Button>
            <Button
              variant="contained"
              size="medium"
              disableElevation
              sx={{
                textTransform: "none",
                backgroundColor: "#00E696",
                "&:hover": {
                  backgroundColor: "#01BFBF",
                },
                marginTop: "15px",
              }}
              onClick={handleCheckout}
              // onClick={handleOpenCheckoutDialog}
            >
              <Box display="flex" gap={2}>
                <Typography sx={{ fontWeight: "700", paddingX: "22px" }}>
                  Beli
                </Typography>
              </Box>
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
