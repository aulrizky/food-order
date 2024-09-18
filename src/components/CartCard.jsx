import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { Scale } from "@mui/icons-material";
import { putQty, deleteCart } from "../services/apis";
import formatCurrency from "../util/FormatCurrency";
export default function CartCard({
  isChecked,
  dataCart,
  handleCheckboxChange,
  setQuantitiesBucket,
  setTotalBucket,
}) {
  // console.log("data keranjang :", dataCart);
  const [quantities, setQuantities] = React.useState();
  const [cartChecked, setCartChecked] = React.useState(false);
  const [total, setTotal] = React.useState(0);

  const handleDeleteCart = async (foodId) => {
    try {
      const response = await deleteCart(foodId);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTotal = (qty, price) => {
    const total = qty * price;
    return total;
  };
  const handleIncrement = (cartId) => {
    setQuantities((prevQuantities) => prevQuantities + 1);

    setTotalBucket(
      (prevTotalBucket) =>
        prevTotalBucket + handleTotal(1, dataCart.foods.price)
    );
    putQty(quantities + 1, cartId);
  };
  const handleDecrement = (cartId) => {
    if (quantities > 1) {
      setQuantities((prevQuantities) => prevQuantities - 1);

      setTotalBucket(
        (prevTotalBucket) =>
          prevTotalBucket - handleTotal(quantities - 1, dataCart.foods.price)
      );

      putQty(quantities - 1, cartId);
    }
  };

  const handleCheckCart = (val) => {
    setCartChecked(!cartChecked);
    handleCheckboxChange(dataCart.cartId);

    if (!cartChecked) {
      setTotalBucket(
        (prevTotalBucket) =>
          prevTotalBucket + handleTotal(quantities, dataCart.foods.price)
      );
    } else {
      setTotalBucket(
        (prevTotalBucket) =>
          prevTotalBucket - handleTotal(quantities, dataCart.foods.price)
      );
    }
  };

  useEffect(() => {
    setQuantities(dataCart.qty);
  }, [dataCart]);

  useEffect(() => {
    setQuantitiesBucket((prevCheckedItems) => ({
      ...prevCheckedItems,
      [dataCart.cartId]: quantities,
    }));

    // putQty(quantities, dataCart.cartId);
  }, [quantities]);

  return (
    // {dataCart.map((data, index) =>(
    //   data.cartId
    // ))}

    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "2",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs>
          <Card
            sx={{
              display: "flex",
              alignItems: "center",
              padding: 2,
              width: "100%",
            }}
          >
            <Stack
              width={"100%"}
              direction="row"
              justifyContent={"space-between"}
              alignItems="center"
              spacing={2}
            >
              <Box sx={{ flex: 1 }}>
                <input
                  type="checkbox"
                  checked={cartChecked}
                  style={{ transform: "scale(1.5)" }}
                  onClick={handleCheckCart}
                />
              </Box>
              <Box sx={{ width: "100%" }}>
                <CardMedia
                  component="img"
                  image={dataCart.foods.imageFilename}
                  alt="gambar"
                  sx={{ width: "80", height: "80", borderRadius: "1" }}
                />
              </Box>
              <Box sx={{ width: "100%" }}>
                <Typography variant="h6">{dataCart.foods.foodName}</Typography>
              </Box>
              <Box sx={{ width: "100%" }}>
                <Typography variant="h6">
                  {formatCurrency(dataCart.foods.price)}
                </Typography>
              </Box>
              <Box sx={{ flex: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconButton
                    onClick={() => handleDecrement(dataCart.cartId)}
                    disabled={!cartChecked}
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                  <Typography variant="body2">{quantities}</Typography>
                  <IconButton
                    onClick={() => handleIncrement(dataCart.cartId)}
                    disabled={!cartChecked}
                  >
                    <ControlPointRoundedIcon />
                  </IconButton>
                </Box>
              </Box>
              <Box sx={{ flex: 2, textAlign: "center" }}>
                <Typography variant="body2">
                  {formatCurrency(
                    handleTotal(quantities, dataCart.foods.price)
                  )}
                </Typography>
              </Box>
              <Stack
                sx={{ flex: 1, textAlign: "center" }}
                direction={"row-reverse"}
              >
                <IconButton
                  onClick={() => handleDeleteCart(dataCart.foods.foodId)}
                >
                  <DeleteSweepIcon />
                </IconButton>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
