import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route, Navigate} from "react-router-dom";



import Homepage from './Homepage.js';
import Tasktime from './Tasktime.js';
import './App.css';

const font =  "font-family: 'Lato', sans-serif";

const theme = createTheme({
  palette: {
    primary: {
      main: "#665cff",
      dark: "#7200e4",
    },
    background: {
      default: "#f3f6f4",
    },
  },
  typography: {
    fontFamily:  font
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow:"#4d4d4d",
          boxShadow: "none",
          borderRadius: "20px",
        },
      },
    },
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        
        <Route path="/home" element={<Homepage />} />
        <Route path="/tasktime" element={<Tasktime />} />
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route
            path="*"
            element={
              <div>
                <h2>404 Page not found etc</h2>
              </div>
            }
          />
      </Routes>
        
    </ThemeProvider>
  );
}

export default App;
