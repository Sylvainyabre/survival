import Grid from '@mui/material/Grid';

import * as React from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));



const Homepage = () => {
    function minutesUntilMidnight (){
        var midnight = new Date();
        midnight.setHours( 24 );
        midnight.setMinutes( 0 );
        midnight.setSeconds( 0 );
        midnight.setMilliseconds( 0 );
    
        return ( midnight.getTime() - new Date().getTime() ) / 1000 / 60;
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Item>{minutesUntilMidnight()}</Item>
            </Grid>
            <Grid item xs={4}>
                <Item></Item>
                
            </Grid>
            
        </Grid>
        
        

    );
};
    
export default Homepage;