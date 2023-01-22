import React, { useState,useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { userLogin } from '../../api/auth';
import { Spinner } from 'flowbite-react';
import {useNavigate} from "react-router-dom"


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token,setToken] = useState(null)
  const [isSuccess,setIsSuccess] = useState(false)
  const [isLoading,setIsLoading] = useState(true)
  const navigate = useNavigate()
  const handleLogin = ()=>{
    userLogin({email:email,password:password})
    .then((res)=>{
        setIsSuccess(res?.data?.success)
        console.log(res)
        if(res?.data?.success){
            setToken(res?.data?.token)
            localStorage.setItem("jwtToken",res?.data?.token)
        }
        setIsLoading(false)
    })
  }
  useEffect(()=>{
    if(isSuccess){
        navigate("/home")
    }
  })
  return (
    <>
      {isLoading?(<Box ><Grid item xs={12}>
        <TextField
          id="email"
          label="Email"
          variant="standard"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="password"
          label="Password"
          variant="standard"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          error={false}
          // helperText={error ? "Login Failed!" : " "}
        />
      </Grid>
      <Grid item xs={12} mt={5}>
        <Button fullWidth  variant="contained" onClick={() => handleLogin()}>
          Sign In
        </Button>
      </Grid></Box>):<Spinner/>}
    </>
  );
};

export default Login;
