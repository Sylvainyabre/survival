import NavBar from "../../navBar.js";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

const Profile = () => {

    const [userData, setUserData] = useState();

    
    return(
        <div>
        
        {userData ? (
            <Box mt={10}>
                <Grid container direction="column" spacing={2} >
                <Grid item xs={12} ml={10}>
                  <Typography style={{ fontSize: "75px", color:"black" }}>
                    Hi {userData.firstName} {userData.lastName}
                  </Typography>
                </Grid>
                <Grid item xs={12} style={{paddingTop:"0px",paddingLeft:"49px"}} ml={10} >
                  <Typography style={{fontSize: ".95rem", color:"#5b5b5b"}}>
                    Email: {userData.email}
                  </Typography>
                </Grid>
                </Grid>

            </Box>
        ) : (
            <Box mt={10} mr={10} ml={10}>
              <Grid container direction="column" spacing={2}>
                <Grid item xs={12}>
                  <Typography style={{ fontSize: "3rem" }}>Loading...</Typography>
                </Grid>
              </Grid>
            </Box>
          )}
          
        </div>
      );
};
export default Profile;