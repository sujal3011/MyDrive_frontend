import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import fileContext from '../context/files/fileContext';

export default function FileDialog({open , setOpen}) {

    const [selectedFile, setSelectedFile] = React.useState();
    const [isFilePicked, setIsFilePicked] = React.useState(false); 

    const context = React.useContext(fileContext);
    const {addFile}=context;



    const handleChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setIsFilePicked(true);
      }

    const handleClick=()=>{
        addFile(selectedFile,window.location.pathname);
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
                <DialogTitle>Upload a file</DialogTitle>
                <DialogContent>
                    
                    <TextField
                        autoFocus
                        margin="dense"
                        id="file"
                        // label={`${item} name`}
                        type="file"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClick}>Upload</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
