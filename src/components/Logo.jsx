import { Typography, Box } from "@mui/material";
import logo from "../public/svg/logo.svg";
import { CenterBox } from "../styles";

export function Logo() {
  return (
    <Box sx={{ ...CenterBox, marginBottom: "15px", gap: "10px" }}>
      <Typography
        sx={{ fontSize: "25px", fontWeight: 700, lineHeight: "28px" }}
      >
        Buku Resep 79
      </Typography>
      <img src={logo} alt="logo" style={{ width: "50px" }} />
    </Box>
  );
}
