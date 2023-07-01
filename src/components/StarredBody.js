import React, { useContext, useEffect,useState } from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { NavLink } from 'react-router-dom';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import { Chip } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import folderContext from '../context/folders/folderContext';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import fileContext from '../context/files/fileContext';
import { Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



const StarredBody = () => {


    const [contextMenu, setContextMenu] = useState(null);
    const [query, setQuery] = useState("");

    const handleContextMenu = (event) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                    mouseX: event.clientX + 2,
                    mouseY: event.clientY - 6,
                }
                :
                null,
        );
    };

    const handleClose = () => {
        setContextMenu(null);
    };


    const filecontext = useContext(fileContext);
    const { files,fetchStarredFiles,removeFileFromStarred } = filecontext;

    const navigate = useNavigate();
    const foldercontext = useContext(folderContext);

    const { folders, fetchStarredFolders,removeFolderFromStarred} = foldercontext;

    const handleFileStarRemove = (id) => {
        removeFileFromStarred(id);
        setContextMenu(null);
    }

    const handleFolderStarRemove = (id) => {
        removeFolderFromStarred(id);
        setContextMenu(null);
    }


    useEffect(() => {
        fetchStarredFiles(query);
        fetchStarredFolders(query);

    }, [query])


    return (
        <Box
            component="main"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <Toolbar />

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4,display: 'flex', alignItems: 'center',justifyContent:'center' }}>

                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                >
                    <IconButton sx={{ p: '10px' }} aria-label="menu">
                    </IconButton>
                    <InputBase onChange={(e) => { setQuery(e.target.value) }}
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                    </IconButton>
                </Paper>
            </Container>

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

                <Typography variant="h5" gutterBottom>
                    Folders
                </Typography>

                <Grid container spacing={2} sx={{ display: "flex",justifyContent: { xs:"center",lg:"start"}, alignItems: 'center', my: "0.5rem"  }}>
                    {
                        folders.map((item) => {

                            return (

                                <Box sx={{ m: "0.5rem",width: {xs: '100%',sm: '40%',lg: '20%',}, }} key={item._id} >

                                    <Grid item xs={2} onContextMenu={handleContextMenu} style={{ cursor: 'context-menu', maxWidth: "100%" }}>
                                        <NavLink to={`/folders/${item._id}`}><Item sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', cursor: "pointer" }}>

                                            <FolderOpenOutlinedIcon fontSize='large' sx={{ mx: "0.5rem",width:'20%' }} />
                                            <Chip label={`${item.name}`} variant="outlined" sx={{ mx: "0.5rem",width:'80%' }} />

                                        </Item></NavLink>
                                    </Grid>

                                    <Menu
                                        open={contextMenu !== null}
                                        onClose={handleClose}
                                        anchorReference="anchorPosition"
                                        anchorPosition={
                                            contextMenu !== null
                                                ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                                                : undefined
                                        }
                                    >
                                        <MenuItem onClick={handleClose}>Rename</MenuItem>
                                        <MenuItem onClick={handleClose}>Delete</MenuItem>
                                        <MenuItem onClick={handleClose}>Share</MenuItem>
                                        <MenuItem onClick={handleClose}>Download</MenuItem>
                                        <MenuItem onClick={()=>{handleFolderStarRemove(item._id)}}>Remove from Starred</MenuItem>
                                    </Menu>

                                </Box>

                            )


                        })
                    }
                </Grid>



            </Container>


            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

                <Typography variant="h5" gutterBottom>
                    Files
                </Typography>

                <Grid container spacing={2} sx={{ display: "flex", my: "0.5rem",justifyContent: { xs:"center",lg:"start"}, alignItems: 'center' }}>
                    {
                        files.map((item) => {
                            return (


                                <Box key={item._id} sx={{ mx: "0.5rem", my: "0.5rem",width: {xs: '100%', sm: '40%',lg: '20%'}, }}>
                                    <Grid item xs={3} onContextMenu={handleContextMenu} style={{ cursor: 'context-menu', width: "100%", maxWidth: "100%" }} >
                                        <NavLink to="/"><Item sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', cursor: "pointer", textDecoration: "none" }}>

                                            <FolderOpenOutlinedIcon fontSize='large' sx={{ mx: "0.5rem",width:'20%'}} />
                                            <Chip sx={{ mx: "0.5rem",width:'80%'  }} label={`${item.original_name}`} variant="contained" />

                                        </Item></NavLink>
                                    </Grid>

                                    <Menu
                                        open={contextMenu !== null}
                                        onClose={handleClose}
                                        anchorReference="anchorPosition"
                                        anchorPosition={
                                            contextMenu !== null
                                                ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                                                : undefined
                                        }
                                    >
                                        <MenuItem onClick={handleClose}>Rename</MenuItem>
                                        <MenuItem onClick={handleClose}>Delete</MenuItem>
                                        <MenuItem onClick={handleClose}>Share</MenuItem>
                                        <MenuItem onClick={handleClose}>Download</MenuItem>
                                        <MenuItem onClick={()=>{handleFileStarRemove(item._id)}}>Remove from Starred</MenuItem>
                                    </Menu>


                                </Box>


                            )
                        })
                    }
                </Grid>



            </Container>
        </Box>
    )
}

export default StarredBody