import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";




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
        <Homepage></Homepage>
    </ThemeProvider>
  );
}

export default App;
