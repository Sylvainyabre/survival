import React, { useState,useEffect } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { RegisterUser } from "../../api/auth";
import { Navigate } from 'react-router-dom';
const Register = ({setLogin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [success,setSuccess] = useState(false)
  const handleRegistration = () => {
    RegisterUser({
      email: email,
      firstName: first,
      lastName: last,
      password: password,
      phone_number: phoneNum,
    }).then((res)=>{
        setSuccess(res.data.success)
    });
  };
  useEffect(()=>{
    if(success){
        Navigate("/login")
    }
  })
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12}>
          <Typography style={{ fontWeight: "bold", fontSize: "3rem" }}>
            Create an Account
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="firstName"
            label="First Name"
            variant="standard"
            onChange={(e) => setFirst(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="lastName"
            label="Last Name"
            variant="standard"
            onChange={(e) => setLast(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="email"
            label="Email"
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="phone"
            label="Phone Number"
            variant="standard"
            onChange={(e) => setPhoneNum(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="password"
            label="Password"
            variant="standard"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            //error={error}
            //helperText={error ? "Sign Up Failed!" : " "}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => handleRegistration()}
          >
            Sign Up
          </Button>
        </Grid>
        <Grid item xs={12} style={{ paddingTop: "10rem" }}>
          <Typography style={{ fontSize: "1rem" }}>
            Have an Account?
            <Button
              variant="text"
              style={{ textDecorationLine: "underline" }}
              onClick={() => setLogin(true)}
            >
              Log In
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Register;
