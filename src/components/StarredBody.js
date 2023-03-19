import React, { useContext, useEffect } from 'react'
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



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



const StarredBody = () => {


    const [contextMenu, setContextMenu] = React.useState(null);


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
        fetchStarredFiles();
        fetchStarredFolders();

    }, [])


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
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

                <Typography variant="h5" gutterBottom>
                    Folders
                </Typography>

                <Grid container spacing={2} sx={{ display: "flex", my: "0.5rem" }}>
                    {
                        folders.map((item) => {

                            return (

                                <Box sx={{ m: "0.5rem" }} key={item._id} >

                                    <Grid item xs={2} onContextMenu={handleContextMenu} style={{ cursor: 'context-menu', maxWidth: "100%" }}>
                                        <NavLink to={`/folders/${item._id}`}><Item sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', cursor: "pointer" }}>

                                            <FolderOpenOutlinedIcon fontSize='large' sx={{ mx: "0.5rem" }} />
                                            <Chip label={`${item.name}`} variant="outlined" sx={{ mx: "0.5rem" }} />

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

                <Grid container spacing={2} sx={{ display: "flex", my: "0.5rem" }}>
                    {
                        files.map((item) => {
                            return (


                                <Box key={item._id} sx={{ mx: "0.5rem", my: "0.5rem" }}>
                                    <Grid item xs={3} onContextMenu={handleContextMenu} style={{ cursor: 'context-menu', width: "100%", maxWidth: "100%" }} >
                                        <NavLink to="/"><Item sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', cursor: "pointer", textDecoration: "none" }}>

                                            <FolderOpenOutlinedIcon fontSize='large' sx={{ mx: "0.5rem" }} />
                                            <Chip sx={{ mx: "0.5rem" }} label={`${item.original_name}`} variant="contained" />

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