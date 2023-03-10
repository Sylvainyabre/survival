import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route, Navigate } from "react-router-dom";
import Tasktime from "./Tasktime.js";
import "./App.css";
import Tasks from "./components/tasks/Tasks";
import Homepage from "./components/home/Homepage";
import Profile from "./components/home/Profile";
import TaskUpdate from "./components/tasks/TaskUpdate";
import TaskCreate from "./components/tasks/TaskCreate";
import PrivateRoute from "./PrivateRoute";
import { Spinner } from "flowbite-react";
import { Suspense } from "react";
import jwt_decode from "jwt-decode";
import Live from "./components/tasks/Live";
import NavBar from './navBar';

const font = "font-family: 'Lato', sans-serif";

const theme = createTheme({
  palette: {
    primary: {
      main: "#b1acff",
      dark: "#918bff",
    },
    background: {
      default: "#f3f6f4",
    },
  },
  typography: {
    fontFamily: font,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "#4d4d4d",
          borderRadius: "20px",
        },
      },
    },
  },
});

//check if token exists and set the current User to it
const token = localStorage.getItem("jwtToken");
//console.log("Saved "+ saved_courses)
if (token) {
  const decoded = jwt_decode(token);
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    window.location.href = "/home";
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<Spinner />}>
        <NavBar/>
        <Routes>
          <Route path="/home" element={<Homepage />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasktime" element={<Tasktime />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/live" element={<Live />} />
          <Route path="/tasks/task/update/:taskId" element={<TaskUpdate />} />

          <Route path="/tasks/task/new" element={<TaskCreate />} />
          <Route
            path="/"
            element={<PrivateRoute token={token} isLoading={false} />}
          >
            <Route path="/tasktime" element={<Tasktime />} />
            <Route path="/tasks" element={<Tasks />} />

            <Route path="/profile" element={<Profile />} />

            <Route path="/live" element={<Live />} />
            <Route path="/tasks/task/update/:taskId" element={<TaskUpdate />} />

            <Route path="/tasks/task/new" element={<TaskCreate />} />
          </Route>
          <Route
            path="*"
            element={
              <div>
                <h2>404 Page not found etc</h2>
              </div>
            }
          />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
