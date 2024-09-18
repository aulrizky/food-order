import {
  Card,
  CardContent,
  CardActions,
  AccordionSummary,
  Typography,
  AccordionActions,
  Accordion,
  AccordionDetails,
  CardMedia,
  Box,
  Grid,
  Divider,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import formatCurrency from "../util/FormatCurrency";

export default function HistoryCart({ dataHistory }) {
  // console.log(dataHistory);
  const jumlah = (quantity, price) => {
    const result = quantity * price;
    return result;
  };
  return (
    <>
      {dataHistory &&
        dataHistory.map((data, index) => {
          return (
            <Accordion key={index} sx={{ marginBottom: 2 }}>
              <AccordionSummary>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={3}>
                    <Typography variant="h6">
                      Tanggal Pesanan : {data.tanggalOrder}
                    </Typography>
                  </Grid>
                  <Grid item xs={3} display="flex" alignItems="center">
                    <LocalMallIcon />
                    <Typography sx={{ marginLeft: 1 }}>
                      ORD{data.orderId}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>QTY: {data.totalItem}</Typography>
                  </Grid>
                  <Grid item xs={4} display="flex" justifyContent="flex-end">
                    <Typography color={"#00E969"}>Tampilkan Detail</Typography>
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                {data.orderDetails.map((order, index) => {
                  return (
                    <Card
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        // maxWidth: 600,
                        border: "none",
                        boxShadow: "none",
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{ width: 150, height: 150, borderRadius: 1 }}
                        image={order.imageFileName}
                        alt="Gambar"
                      />
                      <CardContent sx={{ flex: "1 0 auto", pl: 2 }}>
                        <Typography variant="h6" component="div">
                          {order.foodName}
                        </Typography>
                        <Typography variant="body1" component="div">
                          Jumlah:
                          {formatCurrency(jumlah(order.quantity, order.price))}
                        </Typography>
                      </CardContent>
                      <Divider orientation="vertical" flexItem />
                      <Box sx={{ pl: 2 }}>
                        <Typography variant="body1" component="div">
                          Total Harga
                        </Typography>
                        <Typography variant="h6" component="div">
                          {formatCurrency(order.totalHarga)}
                        </Typography>
                      </Box>
                    </Card>
                  );
                })}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Typography>
                    Total Harga: {formatCurrency(data.totalOrder)}
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>
          );
        })}
    </>
  );
}
