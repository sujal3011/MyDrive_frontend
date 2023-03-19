import * as React from 'react';
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
import { NavLink } from 'react-router-dom';
import Dashbody from './Dashbody';
import { useNavigate } from "react-router-dom";
import FileDialog from './FileDialog'
import StarredBody from './StarredBody';

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

function DashboardContent() {

    

    const navigate = useNavigate();

    const onClickLogOut = () => {
        localStorage.removeItem("token");
        navigate("/login");

    }


    const [open, setOpen] = React.useState(true);
    const [dialogOpen, setDialogOpen] = React.useState(false);  //this state is for the dialog box that will open when the 'create folder' button is clicked
    const [filedialogOpen, setFiledialogOpen] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

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

                            {
                                (localStorage.getItem("token") ?

                                    <Button onClick={onClickLogOut} variant="contained" sx={{ color: 'white', backgroundColor: 'orange', borderColor: 'green', mx: "1rem" }}>Logout</Button>

                                    :

                                    ""




                                )
                            }

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


                            <Box sx={{display: 'flex',flexDirection: 'column', my: '0.5rem'}}>
                               
                            <Button sx={{ my: '1rem'}}
                                variant="outlined"
                                onClick={() => setDialogOpen(true)}
                            >Create folder</Button>

                            <Button sx={{ my: '0.5rem'}}
                                variant="outlined"
                                onClick={() => setFiledialogOpen(true)}
                            >Upload file</Button>

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
                    <StarredBody/>
                </Box>
            </ThemeProvider>

            <FormDialog open={dialogOpen} setOpen={setDialogOpen} purpose="Create" item="folder" />
            <FileDialog open={filedialogOpen} setOpen={setFiledialogOpen}/>
        </>
    );
}

export default function Dashboard() {
    return <DashboardContent />;
}