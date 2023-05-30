import React, { useContext, useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { NavLink,Link } from 'react-router-dom';
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
import FolderContextMenu from './FolderContextMenu';
import FileContextMenu from './FileContextMenu';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



const Dashbody = () => {

    const host = process.env.REACT_APP_SERVER_DOMAIN;


    // const [contextMenu, setContextMenu] = React.useState(null);
    const [contextMenufolder, setContextMenufolder] = React.useState(null);
    const [contextMenufile, setContextMenufile] = React.useState(null);

    const [dialogOpenfolder, setDialogOpenfolder] = React.useState(false);  //this state is for the dialog box to rename the folder
    const [dialogOpenfile, setDialogOpenfile] = React.useState(false);  //this state is for the dialog box to rename the file


    const [contextFolder, setContextFolder] = useState("");  // This state will store the id of the folder that will be right clicked
    const [contextFile, setContextFile] = useState("");      // This state will store the id of the file that will be right clicked

    const handleCloseFile = () => {
        setContextMenufile(null);
    };
    const handleCloseFolder = () => {
        setContextMenufolder(null);
    };

    const filecontext = useContext(fileContext);
    const { files, getFilesbyPath, addToStarred,deleteFile,displayImageFile} = filecontext;

    const navigate = useNavigate();
    const foldercontext = useContext(folderContext);

    const { folders, getFolders,addFolderToStarred,deleteFolder} = foldercontext;

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getFolders(window.location.pathname);
            getFilesbyPath(window.location.pathname);

        }
        else {
            navigate('/login');
        }

    }, [window.location.pathname])


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

                                <Box sx={{ m: "0.5rem" }} key={item._id} 
                                onContextMenu={e=>{
                                    e.preventDefault();
                                    setContextMenufolder(
                                        contextMenufolder === null
                                            ? {
                                                mouseX: e.clientX + 2,
                                                mouseY: e.clientY - 6,
                                            }
                                            :
                                            null,
                                    );
                                    setContextFolder(item._id);

                                }}>

                                    <Grid item xs={2}  style={{ cursor: 'context-menu', maxWidth: "100%" }}>
                                        <NavLink to={`/folders/${item._id}`}><Item sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', cursor: "pointer" }}>

                                            <FolderOpenOutlinedIcon fontSize='large' sx={{ mx: "0.5rem" }} />
                                            <Chip label={`${item.name}`} variant="outlined" sx={{ mx: "0.5rem" }} />

                                        </Item></NavLink>
                                    </Grid>
                                </Box>

                                </>
                                )
                            })
                    }
                    <RenameFolderDialog open={dialogOpenfolder} setOpen={setDialogOpenfolder} folder_id={contextFolder} />
                    <FolderContextMenu contextMenufolder={contextMenufolder} setContextMenufolder={setContextMenufolder} handleCloseFolder={handleCloseFolder} setDialogOpenfolder={setDialogOpenfolder} folder_id={contextFolder}></FolderContextMenu>
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


                                <Box key={item._id} sx={{ mx: "0.5rem", my: "0.5rem" }}
                                
                                onContextMenu={e=>{
                                    e.preventDefault();
                                    setContextMenufile(
                                        contextMenufile === null
                                            ? {
                                                mouseX: e.clientX + 2,
                                                mouseY: e.clientY - 6,
                                            }
                                            :
                                            null,
                                    );
                                    setContextFile(item._id);

                                }}
                                >
                                    <Grid item xs={3} style={{ cursor: 'context-menu', width: "100%", maxWidth: "100%" }} >

                                        {
                                            (item.file_type==='image/svg+xml' || item.file_type==='image/png' || item.file_type==='image/jpeg') 
                                            
                                            ?   <a href={`${host}/files/image/${item._id}`} target="_blank" >
                                                <Item sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', cursor: "pointer", textDecoration: "none" }}>

                                                    <FolderOpenOutlinedIcon fontSize='large' sx={{ mx: "0.5rem" }} />
                                                    <Chip sx={{ mx: "0.5rem" }} label={`${item.original_name}`} variant="contained" />

                                                </Item>
                                                </a>

                                            :   
                                                <Item sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', cursor: "pointer", textDecoration: "none" }}>

                                                    <FolderOpenOutlinedIcon fontSize='large' sx={{ mx: "0.5rem" }} />
                                                    <Chip sx={{ mx: "0.5rem" }} label={`${item.original_name}`} variant="contained" />

                                                </Item>
                                                
                                        }       

                                    </Grid>
                                    

                                </Box>

                            )
                        })
                    }
                    <RenameFileDialog open={dialogOpenfile} setOpen={setDialogOpenfile} file_id={contextFile} />
                    <FileContextMenu contextMenufile={contextMenufile} setContextMenufile={setContextMenufile} handleCloseFile={handleCloseFile} setDialogOpenfile={setDialogOpenfile} file_id={contextFile}></FileContextMenu>  
                </Grid>

            </Container>
        </Box>
        
    )
}

export default Dashbody