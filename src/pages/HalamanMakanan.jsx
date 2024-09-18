import React, { useEffect, useState } from "react";
import { Icon, IconButton, Typography, Container, Box } from "@mui/material";
import NavBar from "../components/NavBar";
import FoodProfile from "../components/FoodProfile";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { useNavigate, useParams } from "react-router-dom";
import { getFoodDetail } from "../services/apis";
// useNavigate;

export default function HalamanMakanan() {
  const navigate = useNavigate();
  const { foodId } = useParams();
  const [detailMakanan, setDetailMakanan] = useState([]);
  const [cart, setCart] = useState(0);
  const [isDataEmpty, setIsDataEmpty] = useState(false);

  async function fetchMakanan(foodId) {
    try {
      console.log("foodId", foodId);
      const response = await getFoodDetail(foodId);
      console.log(response.data);
      console.log("foodId", response.data.data.foodId);
      setDetailMakanan(response.data.data);

      if (response.data.total === 0) {
        setIsDataEmpty(true);
      } else {
        setIsDataEmpty(false);
      }
      // setIsPageError(false);
    } catch (error) {
      console.log(error.message);
      if (error.response.status === 404) {
        setIsDataEmpty(true);
      }
    }
  }
  useEffect(() => {
    fetchMakanan(foodId);
  }, []);

  return (
    <>
      <NavBar cart={cart}></NavBar>
      <Container maxWidth="lg">
        <Box
          sx={{
            padding: { xs: 2, sm: 2, md: 2, lg: 4 },
            display: "flex",
            alignItems: "center",
          }}
          colors="black"
        >
          <IconButton onClick={() => navigate("/daftar-resep")}>
            <ArrowBackIosNewRoundedIcon></ArrowBackIosNewRoundedIcon>
          </IconButton>
          <Typography fontSize="36px" fontWeight="600" color="#263238">
            Detail Makanan
          </Typography>
        </Box>
        <FoodProfile
          cart={cart}
          setCart={setCart}
          detailMakanan={detailMakanan}
          fetchMakanan={fetchMakanan}
        ></FoodProfile>
      </Container>
    </>
  );
}
