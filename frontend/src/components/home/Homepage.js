import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import journal from "./image1.png";
import { RegisterUser, userLogin } from "../../api/auth";
import Register from "./Register";
import Login from './Login';

const Homepage = () => {
  const [login, setLogin] = useState(true);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [email1, setEmail1] = useState("");
  const [password1, setPassword1] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [comMode, setComeMode] = useState("");
  


  const handleLogin = ()=>{
    userLogin({email:email,password:password})
    .then((res)=>console.log(res))
  }
 
  return (
    <Grid container direction="row">
      <Grid item xs={6}>
        <Box
          sx={{
            height: "120vh",
            backgroundColor: "primary.main",
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <img
              src={journal}
              alt="head logo"
              style={{ width: "600px", height: "600px", marginTop: "90px" }}
            />
            <Box mt={9} mr={10} ml={10}>
              <Typography
                align="center"
                style={{ fontWeight: "bold", fontSize: "2rem", color: "white" }}
              >
                Share tasks<br/>
                Stay accountable<br/>
                Succeed together
              </Typography>
            </Box>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box mt={30} mr={10} ml={10}>
          {login ? (
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={12}>
                <Typography style={{ fontWeight: "bold", fontSize: "3rem" }}>
                  Survival Guide
                </Typography>
              </Grid>
              <Grid item xs={12} style={{ paddingTop: "10rem" }}>
                <Typography style={{ fontWeight: "500", fontSize: "1.5rem" }}>
                  Ready to get things done?
                </Typography>
              </Grid>
              < Login/>
              <Grid item xs={12} style={{ paddingTop: "10rem" }}>
                <Typography style={{ fontSize: "1rem" }}>
                  New to Survival Guide?
                  <Button
                    variant="text"
                    style={{ textDecorationLine: "underline" }}
                    onClick={() => setLogin(false)}
                  >
                    Create Account
                  </Button>
                </Typography>
              </Grid>
            </Grid>
          ) : <Register setLogin={setLogin}/>}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Homepage;
