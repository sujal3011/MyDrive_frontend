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
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useTheme } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FolderMenu from './FolderMenu';
import FileMenu from './FileMenu';
import FilePreview from './FilePreview/FilePreview';
import Loader from './Loader/Loader';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



const Dashbody = () => {

    const host = process.env.REACT_APP_SERVER_DOMAIN;

    const [dialogOpenfolder, setDialogOpenfolder] = React.useState(false); 
    const [dialogOpenfile, setDialogOpenfile] = React.useState(false);
    const [contextFolder, setContextFolder] = useState({id:"",isStarred:false});
    const [contextFile, setContextFile] = useState({id:"",isStarred:false});
    const [query, setQuery] = useState("");


    const filecontext = useContext(fileContext);
    const { files, getFilesbyPath, addToStarred, deleteFile, displayImageFile } = filecontext;

    const navigate = useNavigate();
    const foldercontext = useContext(folderContext);

    const { folders, getFolders, addFolderToStarred, deleteFolder } = foldercontext;

    const [anchorElfolder, setAnchorElfolder] = React.useState(null);
    const openfoldermenu = Boolean(anchorElfolder);

    const [anchorElfile, setAnchorElfile] = React.useState(null);
    const openfilemenu = Boolean(anchorElfile);

    const [reload, setReload] = useState(false);

    const [previewFileId, setPreviewFileId] = useState(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setIsLoading(true);
            getFolders(window.location.pathname, query);
            getFilesbyPath(window.location.pathname, query);
            setIsLoading(false);

        }
        else navigate('/login');

    }, [window.location.pathname, query,reload])

    const handleFileClick = (fileId) => {
        setPreviewFileId(fileId);
        setIsPreviewOpen(true);
    };

    const handleClosePreview = () => {
        setIsPreviewOpen(false);
    };

    if(isLoading) return <Loader/>

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

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: { xs: '100%', sm: '70%' } }}
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
                        folders.filter(folder=>!folder.isDeleted).map((item) => {

                            return (
                                <>

                                    <Box sx={{
                                        m: "0.5rem", backgroundColor: "white", width: {
                                            xs: '100%', // 100% width on small screens
                                            sm: '40%', // 40% width on medium screens
                                            lg: '20%', // 20% width on large screens
                                        },
                                    }} key={item._id}
                                        onContextMenu={e => {
                                            e.preventDefault();
                                            setAnchorElfolder(e.currentTarget);
                                            setContextFolder({id:item._id,isStarred:item.isStarred});

                                        }}>

                                        <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} style={{ cursor: 'context-menu', maxWidth: "100%" }}>

                                            <NavLink to={`/folders/${item._id}`} style={{ color: 'inherit', textDecoration: 'inherit', width: '100%' }}>
                                                <Item sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: "pointer" }}>

                                                    <FolderOpenOutlinedIcon fontSize='large' sx={{ mx: "0.5rem", width: '20%' }} />
                                                    <Chip label={`${item.name}`} variant="outlined" sx={{ mx: "0.5rem", width: '80%' }} />

                                                </Item>
                                            </NavLink>

                                            <IconButton
                                                aria-label="more"
                                                id="long-button"
                                                aria-controls={openfoldermenu ? 'long-menu' : undefined}
                                                aria-expanded={openfoldermenu ? 'true' : undefined}
                                                aria-haspopup="true"
                                                onClick={(event) => {
                                                    setReload(!reload);
                                                    setAnchorElfolder(event.currentTarget);
                                                    setContextFolder({id:item._id,isStarred:item.isStarred});
                                                }}
                                            >
                                                <MoreVertIcon />
                                            </IconButton>

                                        </Grid>
                                    </Box>

                                </>
                            )
                        })
                    }
                    <RenameFolderDialog open={dialogOpenfolder} setOpen={setDialogOpenfolder} folder_id={contextFolder.id} />

                    

                    <FolderMenu open={openfoldermenu} anchorEl={anchorElfolder} setAnchorEl={setAnchorElfolder} setDialogOpenfolder={setDialogOpenfolder} folder={contextFolder} reload={reload} setReload={setReload} isStarredPage={false} />
                </Grid>

            </Container>

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

                <Typography variant="h5" gutterBottom>
                    Files
                </Typography>

                <Grid container spacing={2} sx={{ display: "flex", my: "0.5rem", justifyContent: { xs: "center", lg: "start" }, alignItems: 'center' }}>
                    {
                        files.filter(file=>!file.isDeleted).map((item) => {
                            return (


                                <Box key={item._id} sx={{ mx: "0.5rem", my: "0.5rem", width: { xs: '100%', sm: '40%', lg: '20%' },backgroundColor: "white" }}

                                    onContextMenu={e => {
                                        e.preventDefault();
                                        setAnchorElfile(e.currentTarget);
                                        setContextFile({id:item._id,isStarred:item.isStarred});

                                    }}
                                    // onClick={() => handleFileClick(item._id)} 
                                >
                                    <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} item xs={3} style={{ cursor: 'context-menu', width: "100%", maxWidth: "100%" }} >

                                        {
                                                <Item sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', cursor: "pointer", textDecoration: "none", width: '100%' }}>

                                                    <FolderOpenOutlinedIcon fontSize='large' sx={{ mx: "0.5rem", width: '20%' }} />
                                                    
                                                    <Chip sx={{ mx: "0.5rem", width: '80%' }} label={`${item.original_name}`} variant="contained" onClick={() => handleFileClick(item._id)}/>

                                                </Item>
                                        }

                                        <IconButton
                                            aria-label="more"
                                            id="long-button"
                                            aria-controls={openfoldermenu ? 'long-menu' : undefined}
                                            aria-expanded={openfoldermenu ? 'true' : undefined}
                                            aria-haspopup="true"
                                            onClick={(event) => {
                                                setAnchorElfile(event.currentTarget);
                                                setContextFile({id:item._id,isStarred:item.isStarred});
                                            }}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>

                                    </Grid>

                                </Box>

                            )
                        })
                    }
                    <RenameFileDialog open={dialogOpenfile} setOpen={setDialogOpenfile} file_id={contextFile.id} />

                    <FileMenu open={openfilemenu} anchorEl={anchorElfile} setAnchorEl={setAnchorElfile} setDialogOpenfile={setDialogOpenfile} file={contextFile} reload={reload} setReload={setReload} isStarredPage={false}/>

                </Grid>

            </Container>
            {isPreviewOpen && <FilePreview fileId={previewFileId} handleClose={handleClosePreview} />}
        </Box>

    )
}

export default Dashbody