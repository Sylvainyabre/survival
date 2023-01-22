import Grid from '@mui/material/Grid';
import { useState, useRef, useEffect } from 'react'
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



const Tasktime = () => {
    function secondsUntilMidnight(){
        var midnight = new Date();
        midnight.setHours(24);
        midnight.setMinutes(0);
        midnight.setMilliseconds(0);
        return (midnight.getTime() - new Date().getTime()) / 1000;
      }
      const Ref = useRef(null);
      
      // The state for our timer
      const [timer, setTimer] = useState('00:00:00');
      
      
      const getTimeRemaining = (e) => {
          const total = Date.parse(e) - Date.parse(new Date());
          const seconds = Math.floor((total / 1000) % 60);
          const minutes = Math.floor((total / 1000 / 60) % 60);
          const hours = Math.floor((total / 1000 / 60 / 60) % 24);
          return {
              total, hours, minutes, seconds
          };
      }
      
      
      const startTimer = (e) => {
          let { total, hours, minutes, seconds } 
                      = getTimeRemaining(e);
          if (total >= 0) {
      
              // update the timer
              // check if less than 10 then we need to 
              // add '0' at the beginning of the variable
              setTimer(
                  (hours > 9 ? hours : '0' + hours) + ':' +
                  (minutes > 9 ? minutes : '0' + minutes) + ':'
                  + (seconds > 9 ? seconds : '0' + seconds)
              )
          }
      }
      
      
      const clearTimer = (e) => {
      
          // If you adjust it you should also need to
          // adjust the Endtime formula we are about
          // to code next
          setTimer('00:00:00');
      
          // If you try to remove this line the 
          // updating of timer Variable will be
          // after 1000ms or 1sec
          if (Ref.current) clearInterval(Ref.current);
          const id = setInterval(() => {
              startTimer(e);
          }, 1000)
          Ref.current = id;
      }
      
      const getDeadTime = () => {
          let deadline = new Date();
      
          // This is where you need to adjust if 
          // you entend to add more time
          deadline.setSeconds( secondsUntilMidnight());
          return deadline;
      }
      
      // We can use useEffect so that when the component
      // mount the timer will start as soon as possible
      
      // We put empty array to act as componentDid
      // mount only
      useEffect(() => {
          clearTimer(getDeadTime());
      }, []);
      

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {timer}
            </Grid>
            <Grid item xs={4}>
                <Item></Item>
                
            </Grid>
            
        </Grid>
        
        

    );
};
    
export default Tasktime;