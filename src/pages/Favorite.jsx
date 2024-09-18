import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import MediaCard from "../components/MediaCard";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

import {
  Box,
  Button,
  Container,
  containerClasses,
  FormControl,
  Grid,
  Hidden,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import FilterListIcon from "@mui/icons-material/FilterList";
import { myFavorites } from "../services/apis";
const FilterDesktop = ({
  foodName,
  handleSearch,
  setFoodName,
  foodCategory,
  handleChangeFoodCategory,
  handleClickResetFilter,
  sortBy,
  handleChangeSortBy,
}) => {
  const [filterMenu, setFilterMenu] = useState(null);
  const openFilterMenu = Boolean(filterMenu);
  const handleClickFilterMenu = (event) => {
    setFilterMenu(event.currentTarget);
  };
  const handleCloseFilterMenu = () => {
    setFilterMenu(null);
  };

  return (
    <Box
      display={{ xs: "none", md: "flex" }}
      justifyContent="center"
      gap={1}
      width="70vw"
      paddingTop="1em"
      margin="auto"
    >
      <TextField
        id="search"
        variant="outlined"
        size="small"
        placeholder="Cari Resep"
        value={foodName}
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <IconButton>
              <SearchRoundedIcon />
            </IconButton>
          ),
          endAdornment: (
            <IconButton
              onClick={() => {
                setFoodName("");
              }}
            >
              <ClearRoundedIcon />
            </IconButton>
          ),
        }}
        sx={{ width: "50%" }}
        style={{ backgroundColor: "#FFFFFF" }}
      />
      <Box>
        <Button
          id="filter"
          size="large"
          variant="outlined"
          aria-controls={openFilterMenu ? "filter" : undefined}
          aria-haspopup="true"
          aria-expanded={openFilterMenu ? "true" : undefined}
          onClick={handleClickFilterMenu}
          sx={{
            textTransform: "none",
            color: "#9697A0",
            backgroundColor: "#FFFFFF",
            "&.MuiButton-outlined": { borderColor: "#9697A0" },
          }}
        >
          <Box display="flex" gap={2}>
            <Typography>Filter</Typography>
            <FilterListIcon></FilterListIcon>
          </Box>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={filterMenu}
          open={openFilterMenu}
          onClose={handleCloseFilterMenu}
          MenuListProps={{
            "aria-labelledby": "filter",
          }}
          transformOrigin={{ horizontal: "center", vertical: "top" }}
          anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        >
          <Box padding={3} display="flex" flexDirection="column" gap={3}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <Typography sx={{ fontWeight: "700" }}>Kategori</Typography>
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <Select
                      labelId="foodCategory"
                      id="foodCategory"
                      value={foodCategory}
                      onChange={handleChangeFoodCategory}
                    >
                      <MenuItem value="">ALL</MenuItem>
                      <MenuItem value="1">Master Chef</MenuItem>
                      <MenuItem value="2">Hard</MenuItem>
                      <MenuItem value="3">Normal</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  onClick={handleClickResetFilter}
                  variant="text"
                  sx={{ textTransform: "none", color: "#EA4335" }}
                >
                  <Typography>Bersihkan filter</Typography>
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" gap={1}>
                  <Button
                    variant="outlined"
                    onClick={handleCloseFilterMenu}
                    sx={{
                      color: "#01BFBF",
                      textTransform: "none",
                      fontWeight: "700",
                    }}
                  >
                    Batal
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleCloseFilterMenu}
                    sx={{
                      backgroundColor: "#01BFBF",
                      textTransform: "none",
                      fontWeight: "700",
                      "&:hover": { backgroundColor: "#01BFBF" },
                      color: "white",
                    }}
                  >
                    Terapkan
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Menu>
      </Box>
      <Box sx={{ width: "auto" }}>
        <FormControl
          sx={{ maxWidth: 120, backgroundColor: "white" }}
          size="small"
          fullWidth
        >
          <InputLabel id="sortBy"> Sort By</InputLabel>
          <Select
            labelId="sortBy"
            id="sortBy"
            value={sortBy}
            label="Sort by"
            onChange={handleChangeSortBy}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="foods.foodName,asc">Nama Makanan A-Z</MenuItem>
            <MenuItem value="foods.foodName,desc">Nama Makanan Z-A</MenuItem>
            <MenuItem value="foods.price,desc">
              Harga (Tinggi - Rendah)
            </MenuItem>
            <MenuItem value="foods.price,asc">Harga (Rendah - Tinggi)</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};
const FilterMobile = ({
  foodName,
  handleSearch,
  setFoodName,
  foodCategory,
  handleChangeFoodCategory,
  handleClickResetFilter,
  sortBy,
  handleChangeSortBy,
}) => {
  const [filterMenuMobile, setFilterMenuMobile] = useState(null);

  const openFilterMenuMobile = Boolean(filterMenuMobile);

  const handleClickFilterMenuMobile = (event) => {
    setFilterMenuMobile(event.currentTarget);
  };
  const handleCloseFilterMenuMobile = () => {
    setFilterMenuMobile(null);
  };
  return (
    <Hidden mdUp>
      <Box marginX={2}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography
              sx={{ fontSize: "22px", fontWeight: "700", textAlign: "center" }}
            >
              Daftar Makanan
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="search"
              variant="outlined"
              size="small"
              placeholder="Cari Resep"
              value={foodName}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <IconButton>
                    <SearchRoundedIcon />
                  </IconButton>
                ),
                endAdornment: (
                  <IconButton
                    onClick={() => {
                      setFoodName("");
                    }}
                  >
                    <ClearRoundedIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              size="large"
              id="filterMobile"
              variant="outlined"
              aria-controls={openFilterMenuMobile ? "filterMobile" : undefined}
              aria-haspopup="true"
              aria-expanded={openFilterMenuMobile ? "true" : undefined}
              onClick={handleClickFilterMenuMobile}
              sx={{
                textTransform: "none",
                color: "black",
                "&.MuiButton-outlined": {
                  borderColor: "#B4B4BB",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 2,
                },
              }}
            >
              <Typography>Filter</Typography>
              <FilterListIcon></FilterListIcon>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={filterMenuMobile}
              open={openFilterMenuMobile}
              onClose={handleCloseFilterMenuMobile}
              MenuListProps={{
                "aria-labelledby": "filterMobile",
              }}
              transformOrigin={{ horizontal: "center", vertical: "top" }}
              anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
            >
              <Box
                padding={3}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                gap={3}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <Typography sx={{ fontWeight: "700" }}>
                        Kategori
                      </Typography>
                      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <Select
                          labelId="foodCategory"
                          id="foodCategory"
                          value={foodCategory}
                          onChange={handleChangeFoodCategory}
                        >
                          <MenuItem value="">ALL</MenuItem>
                          <MenuItem value="1">Master chef</MenuItem>
                          <MenuItem value="2">Hard</MenuItem>
                          <MenuItem value="3">Normal</MenuItem>
                        </Select>
                      </FormControl>
                    </Stack>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Button
                      onClick={handleClickResetFilter}
                      variant="text"
                      sx={{ textTransform: "none", color: "#EA4335" }}
                    >
                      <Typography>Bersihkan filter</Typography>
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Box display="flex" gap={1}>
                      <Button
                        variant="outlined"
                        onClick={handleCloseFilterMenuMobile}
                        sx={{
                          color: "#01BFBF",
                          textTransform: "none",
                          fontWeight: "700",
                        }}
                      >
                        Batal
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleCloseFilterMenuMobile()}
                        fullWidth
                        disableElevation
                        sx={{
                          backgroundColor: "#01BFBF",
                          textTransform: "none",
                          fontWeight: "700",
                          "&:hover": { backgroundColor: "#01BFBF" },
                          color: "white",
                        }}
                      >
                        Terapkan
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Menu>
          </Grid>
          <Grid item xs={6}>
            <FormControl
              maxWidth
              sx={{ backgroundColor: "white" }}
              size="small"
            >
              <InputLabel id="sortBy"> Sort By</InputLabel>
              <Select
                labelId="sortBy"
                id="sortBy"
                value={sortBy}
                label="Sort by"
                onChange={handleChangeSortBy}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="foods.foodName,asc">Nama Makanan A-Z</MenuItem>
                <MenuItem value="foods.foodName,desc">
                  Nama Makanan Z-A
                </MenuItem>
                <MenuItem value="foods.price,asc">
                  Harga (Tinggi - Rendah)
                </MenuItem>
                <MenuItem value="foods.price,desc">
                  Harga (Rendah - Tinggi)
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Hidden>
  );
};

export default function Favorite() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [dataMakanan, setDataMakanan] = useState([]);
  const [cart, setCart] = useState(0);
  const [sortBy, setSortBy] = useState("foods.foodName,asc");
  const [foodName, setFoodName] = useState("");
  const [foodCategory, setFoodCategory] = useState("");
  const [entries, setEntries] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  // const [pageNumber, setPageNumber] = useState("");
  const [totalData, setTotalData] = useState(0);

  const handleSearch = (event) => {
    setFoodName(event.target.value);
  };
  const handleChangeFoodCategory = (event) => {
    setFoodCategory(event.target.value);
  };
  const handleClickResetFilter = () => {
    setFoodCategory("");
  };
  const handleChangeSortBy = (event) => {
    setSortBy(event.target.value);
  };
  const handleClickEntries = (value) => {
    if (value === entries) {
      return;
    }
    setEntries(value);
  };
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const [tempFoodName, setTempFoodName] = useState("");
  const [tempFoodCategory, setTempFoodCategory] = useState("");
  const [tempSortBy, setTempSortBy] = useState("");
  const [isPageError, setIsPageError] = useState(false);
  const [isDataEmpty, setIsDataEmpty] = useState(false);

  async function fetchDataMakanan(
    currentPage,
    entries,
    sortBy,
    foodName,
    foodCategory
  ) {
    setIsLoading(true);
    try {
      const response = await myFavorites(
        currentPage,
        entries,
        sortBy,
        foodName,
        foodCategory
      );
      setDataMakanan(response.data.data);
      setTotalData(response.data.total);

      if (response.data.total === 0) {
        setIsDataEmpty(true);
      } else {
        setIsDataEmpty(false);
      }
      setIsPageError(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setIsDataEmpty(true);
        console.log(error);
      } else {
        setIsPageError(true);
      }
    } finally {
      setIsLoading(false);
    }
  }
  const handleApplySearch = () => {
    setFoodName(tempFoodName);
    setCurrentPage(1);
  };
  const handleApplyFilter = () => {
    setSortBy(tempSortBy);
    setFoodCategory(tempFoodCategory);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchDataMakanan(currentPage, entries, sortBy, foodName, foodCategory);
  }, [currentPage, entries, sortBy, foodName, foodCategory]);

  useEffect(() => {
    console.log(totalData);
    console.log(entries);
    const total = Math.ceil(totalData / entries);
    setTotalData(total);
  }, [totalData, entries]);

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
            Makanan Favorit
          </Typography>
        </Box>
        <FilterDesktop
          foodName={foodName}
          handleSearch={handleSearch}
          setFoodName={setFoodName}
          foodCategory={foodCategory}
          handleChangeFoodCategory={handleChangeFoodCategory}
          handleClickResetFilter={handleClickResetFilter}
          sortBy={sortBy}
          handleChangeSortBy={handleChangeSortBy}
        ></FilterDesktop>
        <FilterMobile
          foodName={foodName}
          handleSearch={handleSearch}
          setFoodName={setFoodName}
          foodCategory={foodCategory}
          handleChangeFoodCategory={handleChangeFoodCategory}
          handleClickResetFilter={handleClickResetFilter}
          sortBy={sortBy}
          handleChangeSortBy={handleChangeSortBy}
        ></FilterMobile>
        <Box sx={{ padding: { xs: 2, sm: 2, md: 2, lg: 4 } }}>
          <Grid container spacing={{ xs: 2, sm: 2, md: 2, lg: 4 }}>
            <MediaCard
              cart={cart}
              setCart={setCart}
              dataMakanan={dataMakanan}
              fetchDataMakanan={fetchDataMakanan}
              isPageError={isPageError}
              currentPage={currentPage}
              entries={entries}
              sortBy={sortBy}
              foodNameProperty={foodName}
              foodCategory={foodCategory}
              setDataMakanan={setDataMakanan}
            />
          </Grid>
          <Grid container spacing={1} sx={{ paddingTop: "2em" }}>
            <Grid item xs={6} sm={6} md={6}>
              <Box display="flex" justifyContent={{ xs: "left", md: "left" }}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography
                    sx={{
                      color: "#787885",
                      fontWeight: "400",
                      fontSize: { xs: "14px", md: "16px" },
                    }}
                  >
                    Entries
                  </Typography>
                  <IconButton
                    aria-label="entries"
                    size="small"
                    onClick={() => {
                      handleClickEntries(8);
                    }}
                    sx={{
                      "&.focus": {
                        outline: "none",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        backgroundColor: entries === 8 ? "#00E696" : "initial",
                        fontSize: { xs: "14px", md: "16px" },
                        color: entries === 8 ? "white" : "#787885",
                        paddingY: 0.5,
                        paddingX: 1,
                        borderRadius: entries === 8 ? "4px" : "initial",
                      }}
                    >
                      8
                    </Typography>
                  </IconButton>
                  <IconButton
                    aria-label="entries"
                    size="small"
                    onClick={() => {
                      handleClickEntries(16);
                    }}
                    sx={{
                      "&.focus": {
                        outline: "none",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        backgroundColor: entries === 16 ? "#00E696" : "initial",
                        fontSize: { xs: "14px", md: "16px" },
                        color: entries === 16 ? "white" : "#787885",
                        paddingY: 0.5,
                        paddingX: 1,
                        borderRadius: entries === 16 ? "4px" : "initial",
                      }}
                    >
                      16
                    </Typography>
                  </IconButton>
                  <IconButton
                    aria-label="entries"
                    size="small"
                    onClick={() => {
                      handleClickEntries(24);
                    }}
                    sx={{
                      "&.focus": {
                        outline: "none",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        backgroundColor: entries === 24 ? "#00E696" : "initial",
                        fontSize: { xs: "14px", md: "16px" },
                        color: entries === 24 ? "white" : "#787885",
                        paddingY: 0.5,
                        paddingX: 1,
                        borderRadius: entries === 24 ? "4px" : "initial",
                      }}
                    >
                      24
                    </Typography>
                  </IconButton>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <Box display="flex" justifyContent={{ xs: "right", md: "right" }}>
                <Pagination
                  count={4}
                  page={currentPage}
                  onChange={handlePageChange}
                  sx={{
                    "& .MuiPaginationItem-root": {
                      color: "#00E696",
                      fontWeight: "bold",
                      border: "none",
                      "&.Mui-selected": {
                        backgroundColor: "#00E696",
                        color: "#FFFFFF",
                      },
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                      "&:focus": {
                        outline: "none",
                      },
                    },
                  }}
                ></Pagination>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
