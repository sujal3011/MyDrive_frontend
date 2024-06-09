import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const RestoreDialog = ({ open, handleClose, handleRestore }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{"Folder in Bin"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This folder is in your bin. To view this folder, you will need to restore it from your bin.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleRestore} color="primary">
                    Restore
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RestoreDialog;
