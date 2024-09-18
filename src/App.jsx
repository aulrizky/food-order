import "./styles/index.css";
import Layouts from "./layouts";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { theme } from "./styles";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Toaster />
      <Router>
        <Layouts />
      </Router>
    </ThemeProvider>
  );
}

export default App;
