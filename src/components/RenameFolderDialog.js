import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import fileContext from '../context/files/fileContext';
import folderContext from '../context/folders/folderContext';
import { toast } from 'react-toastify';

export default function RenameFolderDialog({open , setOpen, folder_id}) {

    const [folder, setFolder] = React.useState({name:""});
    const context = React.useContext(folderContext);
    const {editFolder}=context;

    useEffect(() => {
        console.log("inside rename folder_id:",folder_id);
      }, [])


    const onChange=(e)=>{
        setFolder({name:e.target.value}); 
    }

    const handleClick=()=>{
        editFolder(folder_id,folder.name);
        setFolder({name:""});
        setOpen(false);
        toast.success("Folder renamed successfully!");
    }


    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Rename folder</DialogTitle>
                <DialogContent>
                    
                <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="folder name"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={onChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClick}>Update</Button>
                </DialogActions>
            </Dialog>
            {/* <ToastContainer /> */}
        </div>
    );
}
