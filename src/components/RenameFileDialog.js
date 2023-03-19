import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import fileContext from '../context/files/fileContext';

export default function RenameFileDialog({open , setOpen, file_id}) {

    const [file, setFile] = React.useState({name:""});
    const context = React.useContext(fileContext);
    const {editFile}=context;


    const onChange=(e)=>{
        setFile({name:e.target.value}); 
    }

    const handleClick=()=>{
        editFile(file_id,file.name);
        setFile({name:""});
        setOpen(false);
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
                <DialogTitle>Rename file</DialogTitle>
                <DialogContent>
                    
                <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="file name"
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
        </div>
    );
}
