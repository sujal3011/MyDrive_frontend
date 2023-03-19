import React, { useContext, useEffect, useState } from 'react'
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
import RenameFolderDialog from './RenameFolderDialog';
import RenameFileDialog from './RenameFileDialog';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



const Dashbody = () => {


    // const [contextMenu, setContextMenu] = React.useState(null);
    const [contextMenufolder, setContextMenufolder] = React.useState(null);
    const [contextMenufile, setContextMenufile] = React.useState(null);

    const [dialogOpenfolder, setDialogOpenfolder] = React.useState(false);  //this state is for the dialog box to rename the folder
    const [dialogOpenfile, setDialogOpenfile] = React.useState(false);  //this state is for the dialog box to rename the file

    



    const handleContextMenuFolder = (event) => {
        event.preventDefault();
        setContextMenufolder(
            contextMenufolder === null
                ? {
                    mouseX: event.clientX + 2,
                    mouseY: event.clientY - 6,
                }
                :
                null,
        );
    };


    const handleContextMenuFile = (event) => {
        event.preventDefault();
        setContextMenufile(
            contextMenufile === null
                ? {
                    mouseX: event.clientX + 2,
                    mouseY: event.clientY - 6,
                }
                :
                null,
        );
    };


    const handleCloseFile = () => {
        setContextMenufile(null);
    };

    const handleCloseFolder = () => {
        setContextMenufolder(null);
    };


    const filecontext = useContext(fileContext);
    const { files, getFilesbyPath, addToStarred } = filecontext;

    const navigate = useNavigate();
    const foldercontext = useContext(folderContext);

    const { folders, getFolders,addFolderToStarred,deleteFolder} = foldercontext;

    const handleFileStar = (id) => {
        addToStarred(id);
        setContextMenufile(null);
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getFolders();
            getFilesbyPath(window.location.pathname);

        }
        else {
            navigate('/');
        }

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

                                <>

                                <Box sx={{ m: "0.5rem" }} key={item._id} >

                                    <Grid item xs={2} onContextMenu={handleContextMenuFolder} style={{ cursor: 'context-menu', maxWidth: "100%" }}>
                                        <NavLink to={`/folders/${item._id}`}><Item sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', cursor: "pointer" }}>

                                            <FolderOpenOutlinedIcon fontSize='large' sx={{ mx: "0.5rem" }} />
                                            <Chip label={`${item.name}`} variant="outlined" sx={{ mx: "0.5rem" }} />

                                        </Item></NavLink>
                                    </Grid>

                                    <Menu
                                        open={contextMenufolder !== null}
                                        onClose={handleCloseFolder}
                                        anchorReference="anchorPosition"
                                        anchorPosition={
                                            contextMenufolder !== null
                                                ? { top: contextMenufolder.mouseY, left: contextMenufolder.mouseX }
                                                : undefined
                                        }
                                    >
                                        <MenuItem onClick={() => {
                                            setDialogOpenfolder(true)
                                            setContextMenufolder(null)
                                        }}>Rename folder</MenuItem>

                                        <MenuItem onClick={()=>{
                                            deleteFolder(item._id)
                                            setContextMenufolder(null)
                                        }}>Delete</MenuItem>

                                        <MenuItem onClick={handleCloseFolder}>Share</MenuItem>
                                        <MenuItem onClick={handleCloseFolder}>Download</MenuItem>
                                        <MenuItem onClick={() => { 
                                             addFolderToStarred(item._id);
                                             setContextMenufolder(null);
                                         }}>Add to Starred</MenuItem>
                                    </Menu>


                                </Box>
                                
                                <RenameFolderDialog open={dialogOpenfolder} setOpen={setDialogOpenfolder} folder_id={item._id} />
                                </>
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
                                    <Grid item xs={3} onContextMenu={handleContextMenuFile} style={{ cursor: 'context-menu', width: "100%", maxWidth: "100%" }} >
                                        <NavLink to="/"><Item sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', cursor: "pointer", textDecoration: "none" }}>

                                            <FolderOpenOutlinedIcon fontSize='large' sx={{ mx: "0.5rem" }} />
                                            <Chip sx={{ mx: "0.5rem" }} label={`${item.original_name}`} variant="contained" />

                                        </Item></NavLink>
                                    </Grid>

                                    <Menu
                                        open={contextMenufile !== null}
                                        onClose={handleCloseFile}
                                        anchorReference="anchorPosition"
                                        anchorPosition={
                                            contextMenufile !== null
                                                ? { top: contextMenufile.mouseY, left: contextMenufile.mouseX }
                                                : undefined
                                        }
                                    >
                                       <MenuItem onClick={() => setDialogOpenfile(true)}>Rename file</MenuItem>
                                        <MenuItem onClick={handleCloseFile}>Delete</MenuItem>
                                        <MenuItem onClick={handleCloseFile}>Share</MenuItem>
                                        <MenuItem onClick={handleCloseFile}>Download</MenuItem>
                                        <MenuItem onClick={() => { handleFileStar(item._id) }}>Add to Starred</MenuItem>
                                    </Menu>

                                    <RenameFileDialog open={dialogOpenfile} setOpen={setDialogOpenfile} file_id={item._id} />
                                </Box>


                            )
                        })
                    }
                </Grid>



            </Container>
        </Box>

        
    )
}

export default Dashbody