import React, { useContext, useEffect, useState } from 'react'
import folderContext from '../context/folders/folderContext';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


const FolderContextMenu = ({contextMenufolder,setContextMenufolder,handleCloseFolder,setDialogOpenfolder,folder_id}) => {

    const foldercontext = useContext(folderContext);
    const { folders, getFolders,addFolderToStarred,deleteFolder} = foldercontext;


  return (
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
            // console.log(item.name);
            deleteFolder(folder_id)
            setContextMenufolder(null)
        }}>Delete</MenuItem>

        <MenuItem onClick={handleCloseFolder}>Share</MenuItem>
        <MenuItem onClick={handleCloseFolder}>Download</MenuItem>

        <MenuItem onClick={() => { 
                addFolderToStarred(folder_id);
                setContextMenufolder(null);
            }}>Add to Starred</MenuItem>
    </Menu>
  )
}

export default FolderContextMenu