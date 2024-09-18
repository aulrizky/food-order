import { Routes, Route, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DaftarResep from "../pages/DaftarResep";
import HalamanMakanan from "../pages/HalamanMakanan";
import KeranjangSaya from "../pages/KeranjangSaya";
import History from "../pages/historySaya";
import PrivateRoute from "../services/PrivateRoute";
import Favorite from "../pages/Favorite";

function Layouts() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<PrivateRoute />}>
        <Route path="daftar-resep" element={<DaftarResep />} />
        <Route path="halaman-makanan/:foodId" element={<HalamanMakanan />} />
        <Route path="keranjang-saya" element={<KeranjangSaya />} />
        <Route path="history-saya" element={<History />} />
        <Route path="favorites" element={<Favorite />} />
      </Route>
    </Routes>
  );
}

export default Layouts;
