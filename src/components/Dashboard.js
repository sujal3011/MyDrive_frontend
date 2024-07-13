import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems } from './listItems';
import { Button } from '@mui/material';
import FormDialog from './Dialog'  //this is the dialog box to create new folder
import { NavLink,useParams } from 'react-router-dom';
import Dashbody from './Dashbody';
import { useNavigate } from "react-router-dom";
import FileDialog from './FileDialog'
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddMenu from './AddMenu';
import StarredBody from './StarredBody';
import Trash from './Trash/Trash';
import ShareItem from './ShareItem/ShareItem';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import SharedWithMeBody from './SharedWithMe/SharedWithMeBody';
import Button1 from './Buttons/Button1';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();

const Dashboard = ({ page }) => {

    const {id,itemType} = useParams();
    const navigate = useNavigate();

    const onClickLogOut = () => {
        localStorage.removeItem("token");
        navigate("/login");

    }


    const [open, setOpen] = React.useState(false);
    const [dialogOpen, setDialogOpen] = React.useState(false); 
    const [filedialogOpen, setFiledialogOpen] = React.useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const addMenuOpen = Boolean(anchorEl);

    const [user, setUser] = useState("");

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }


    const toggleDrawer = () => {
        setOpen(!open);
    };


    const getUserDetails = async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/auth/getUser`, {
            method: 'POST',

            headers: {
                "auth-token": localStorage.getItem("token")
            },

        });
        const json = await response.json();
        const name = json.name;
        const name_arr = name.split(" ");
        const firstname_firstcharacter = name_arr[0][0].toUpperCase();
        const lastname_firstcharacter = name_arr[name_arr.length - 1][0].toUpperCase();
        setUser(firstname_firstcharacter + lastname_firstcharacter);
    }

    useEffect(() => {

        if (localStorage.getItem("token")) {
            getUserDetails();
        }
    }, []);

    return (
        <>
            <ThemeProvider theme={mdTheme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <AppBar position="absolute" open={open}>
                        <Toolbar
                            sx={{
                                pr: '24px', // keep right padding when drawer closed
                            }}
                        >

                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={toggleDrawer}
                                sx={{
                                    marginRight: '36px',
                                    ...(open && { display: 'none' }),
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                sx={{ flexGrow: 1 }}
                            >
                                MyDrive
                            </Typography>

                            {/* <Paper
                                component="form"
                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                            >
                                <IconButton sx={{ p: '10px' }} aria-label="menu">
                                </IconButton>
                                <InputBase onClick={(e)=>{setQuery(e.target.value)}}
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="Search"
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                    <SearchIcon />
                                </IconButton>
                                <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                                </IconButton>
                            </Paper> */}

                            {
                                (localStorage.getItem("token") ?

                                    // <Button onClick={onClickLogOut} variant="outlined" sx={{ color: 'blue', backgroundColor: 'white', borderColor: 'blue', mx: "1rem" }}>Logout</Button>
                                    // <Button1 title={"LOGOUT"} onClick={onClickLogOut}/>
                                    <Button
                                        onClick={onClickLogOut}
                                        variant="contained"
                                        sx={{
                                            backgroundColor: 'white',
                                            color: '#1976d2',
                                            borderRadius: '8px',
                                            border: '2px solid #1976d2',
                                            '&:hover': {
                                            backgroundColor: 'white',
                                            marginRight:'70px'
                                            },
                                        }}
                                        >
                                        LOGOUT
                                    </Button>

                                    :

                                    ""

                                )
                            }

                            <NavLink style={{ color: 'inherit', textDecoration: 'inherit' }} to="/profile"><Avatar sx={{ bgcolor: deepPurple[500] }} >{user}</Avatar></NavLink>

                        </Toolbar>
                    </AppBar>
                    <Drawer variant="permanent" open={open}>
                        <Toolbar
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                px: [1],
                            }}
                        >


                            <Box sx={{ display: 'flex', flexDirection: 'column', my: '0.5rem' }}>

                                <Button
                                    id="demo-customized-button"
                                    aria-controls={addMenuOpen ? 'demo-customized-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={addMenuOpen ? 'true' : undefined}
                                    variant="outlined"
                                    disableElevation
                                    onClick={handleClick}
                                    endIcon={<KeyboardArrowDownIcon />}
                                >
                                    New
                                </Button>
                            </Box>



                            <IconButton onClick={toggleDrawer}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </Toolbar>
                        <Divider />
                        <List component="nav">
                            {mainListItems}
                            {/* <Divider sx={{ my: 1 }} />
                            {secondaryListItems} */}
                        </List>
                    </Drawer>
                    {page === "home" && <Dashbody />}
                    {page === "starred" && <StarredBody />}
                    {page === "trash" && <Trash/>}
                    {page === "share" && <ShareItem id={id} itemType={itemType}/>}
                    {page === "shared-with-me" && <SharedWithMeBody/>}

                </Box>
            </ThemeProvider>

            <FormDialog open={dialogOpen} setOpen={setDialogOpen} purpose="Create" item="folder" />
            <FileDialog open={filedialogOpen} setOpen={setFiledialogOpen} />
            <AddMenu open={addMenuOpen} anchorEl={anchorEl} setAnchorEl={setAnchorEl} setFiledialogOpen={setFiledialogOpen} setFolderdialogOpen={setDialogOpen} />
        </>
    );
}

export default Dashboard