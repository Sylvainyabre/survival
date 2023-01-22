import * as React from 'react';
import {AppBar, Toolbar, IconButton, Typography, Stack, Button} from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import {useNavigate} from "react-router-dom";

function NavBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate();

    return (
      <AppBar position='static'>
        <Toolbar>
            <IconButton size='large' edge='start' color='inherit' aria-label='logo'>

            </IconButton>
            <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
                <Button color='inherit' style={{fontWeight: '550', fontSize: '2rem'}} onClick={ () => navigate("/home")}>
                    SURVIVAL GUIDE
                </Button>
            </Typography>
            <Stack direction='row' spacing={2}>
                <Button color='inherit' style={{fontSize: '1rem'}} onClick={ () => navigate("/tasks")}>
                    Tasks
                </Button>
                <Button color='inherit' style={{fontSize: '1rem'}} onClick={ () => navigate("/tasks/task/new")}>
                    New Task
                    
                </Button>
                <Button color='inherit'
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <Avatar sx={{bgcolor: deepPurple[500], width: 40, height: 40 }}></Avatar>
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
            </Stack>
        </Toolbar>
      </AppBar>
    );
  }

export default NavBar;