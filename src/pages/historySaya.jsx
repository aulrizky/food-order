import React, { useEffect, useState } from "react";
import {
  Icon,
  IconButton,
  Typography,
  Container,
  Box,
  Grid,
} from "@mui/material";
import NavBar from "../components/NavBar";
import HistoryCart from "../components/HistoryCart";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { useNavigate } from "react-router-dom";
import { historyCart } from "../services/apis";

export default function History() {
  const [dataHistory, setDataHistory] = useState([]);
  const navigate = useNavigate();
  const [cart, setCart] = useState(0);
  const [isDataEmpty, setIsDataEmpty] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [sortBy, setSortBy] = useState("oderId,asc");

  useEffect(() => {
    async function fetchHistory() {
      try {
        const response = await historyCart(pageNumber, pageSize, sortBy);
        console.log(response.data.data);
        // console.log(response.data);
        setDataHistory(response.data.data);
        console.log(response);
        setIsDataEmpty(false);
      } catch (error) {
        console.log(error.message);
        if (error.response.status === 404) {
          setIsDataEmpty(true);
        }
      }
    }
    fetchHistory();
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
            History saya
          </Typography>
        </Box>
        {isDataEmpty ? (
          <Box
            sx={{
              padding: { xs: 2, sm: 2, md: 2, lg: 4 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography fontSize="36px" fontWeight="600" color="#263238">
              Tidak ada data
            </Typography>
          </Box>
        ) : (
          <HistoryCart dataHistory={dataHistory} />
        )}
      </Container>
    </>
  );
}
