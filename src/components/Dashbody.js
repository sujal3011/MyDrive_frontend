import React, { useContext, useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { NavLink, Link } from 'react-router-dom';
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
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
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



const Dashbody = () => {

    const host = process.env.REACT_APP_SERVER_DOMAIN;
    const theme = useTheme();


    const [contextMenufolder, setContextMenufolder] = React.useState(null);
    const [contextMenufile, setContextMenufile] = React.useState(null);

    const [dialogOpenfolder, setDialogOpenfolder] = React.useState(false);  //this state is for the dialog box to rename the folder
    const [dialogOpenfile, setDialogOpenfile] = React.useState(false);  //this state is for the dialog box to rename the file


    const [contextFolder, setContextFolder] = useState("");  // This state will store the id of the folder that will be right clicked
    const [contextFile, setContextFile] = useState("");      // This state will store the id of the file that will be right clicked

    const [query, setQuery] = useState("");

    const handleCloseFile = () => {
        setContextMenufile(null);
    };
    const handleCloseFolder = () => {
        setContextMenufolder(null);
    };

    const filecontext = useContext(fileContext);
    const { files, getFilesbyPath, addToStarred, deleteFile, displayImageFile } = filecontext;

    const navigate = useNavigate();
    const foldercontext = useContext(folderContext);

    const { folders, getFolders, addFolderToStarred, deleteFolder } = foldercontext;

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getFolders(window.location.pathname,query);
            getFilesbyPath(window.location.pathname,query);

        }
        else {
            navigate('/login');
        }

    }, [window.location.pathname,query])


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
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: {xs: '100%', sm: '70%'}}}
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

                <Grid container spacing={2} sx={{ display: "flex", justifyContent: { xs: "center", lg: "start" }, alignItems: 'center', my: "0.5rem" }}>
                    {
                        folders.map((item) => {

                            return (
                                <>

                                    <Box sx={{
                                        m: "0.5rem", width: {
                                            xs: '100%', // 100% width on small screens
                                            sm: '40%', // 40% width on medium screens
                                            lg: '20%', // 20% width on large screens
                                        },
                                    }} key={item._id}
                                        onContextMenu={e => {
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

                                        <Grid item xs={2} style={{ cursor: 'context-menu', maxWidth: "100%" }}>
                                            <NavLink to={`/folders/${item._id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                                                <Item sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: "pointer" }}>

                                                    <FolderOpenOutlinedIcon fontSize='large' sx={{ mx: "0.5rem", width: '20%' }} />
                                                    <Chip label={`${item.name}`} variant="outlined" sx={{ mx: "0.5rem", width: '80%' }} />

                                                </Item>
                                            </NavLink>
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

                <Grid container spacing={2} sx={{ display: "flex", my: "0.5rem", justifyContent: { xs: "center", lg: "start" }, alignItems: 'center' }}>
                    {
                        files.map((item) => {
                            return (


                                <Box key={item._id} sx={{ mx: "0.5rem", my: "0.5rem", width: { xs: '100%', sm: '40%', lg: '20%' } }}

                                    onContextMenu={e => {
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
                                            (item.file_type === 'image/svg+xml' || item.file_type === 'image/png' || item.file_type === 'image/jpeg')

                                                ? <a href={`${host}/files/image/${item._id}`} target="_blank" >


                                                    <Card sx={{ maxWidth: 345 }}>
                                                        {/* <CardMedia
                                                            component="img"
                                                            alt="green iguana"
                                                            height="140"
                                                            image={`${host}/files/image/${item._id}`}
                                                        /> */}
                                                        <CardContent>
                                                            <Chip sx={{ mx: "0.5rem" }} label={`${item.original_name}`} variant="contained" />
                                                        </CardContent>

                                                    </Card>


                                                </a>

                                                :
                                                <Item sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', cursor: "pointer", textDecoration: "none" }}>

                                                    <FolderOpenOutlinedIcon fontSize='large' sx={{ mx: "0.5rem", width: '20%' }} />
                                                    <Chip sx={{ mx: "0.5rem", width: '80%' }} label={`${item.original_name}`} variant="contained" />

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