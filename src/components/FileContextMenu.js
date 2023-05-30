import React, { useContext, useEffect, useState } from 'react'
import fileContext from '../context/files/fileContext';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const FileContextMenu = ({contextMenufile,setContextMenufile,handleCloseFile,setDialogOpenfile,file_id}) => {

    const filecontext = useContext(fileContext);
    const { files, getFilesbyPath, addToStarred,deleteFile,displayImageFile} = filecontext;

  return (
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
        <MenuItem onClick={()=>{
            deleteFile(file_id);
            setContextMenufile(null);
        }}>Delete</MenuItem>

        <MenuItem onClick={handleCloseFile}>Share</MenuItem>
        <MenuItem onClick={handleCloseFile}>Download</MenuItem>
        <MenuItem onClick={() => { 
            addToStarred(file_id);
            setContextMenufile(null);
         }}>Add to Starred</MenuItem>
    </Menu>
)
}

export default FileContextMenu