import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import folderContext from '../context/folders/folderContext';

export default function FormDialog({open , setOpen,purpose,item}) {

    const [folder, setFolder] = React.useState({name:""});
    const context=React.useContext(folderContext);
    const {addFolder}=context;



    const onChange=(e)=>{
        setFolder({name:e.target.value});
    }

    const handleClick=()=>{
        addFolder(folder.name,window.location.pathname);
        setFolder({name:""});
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
                <DialogTitle>{purpose} {item}</DialogTitle>
                <DialogContent>
                    
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label={`${item} name`}
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={onChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClick}>{purpose}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
