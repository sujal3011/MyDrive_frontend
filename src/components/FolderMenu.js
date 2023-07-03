import React, { useContext, useEffect, useState } from 'react'
import folderContext from '../context/folders/folderContext';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import StarIcon from '@mui/icons-material/Star';
import ShareIcon from '@mui/icons-material/Share';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function FolderMenu({open,anchorEl,setAnchorEl,setDialogOpenfolder,folder_id}) {
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const foldercontext = useContext(folderContext);
const {addFolderToStarred,deleteFolder} = foldercontext;

  return (
    <div>
     
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => {
            setDialogOpenfolder(true);
            setAnchorEl(null);
        }} disableRipple>
          <DriveFileRenameOutlineIcon />
          Rename
        </MenuItem>
        <MenuItem  onClick={() => { 
                addFolderToStarred(folder_id);
                setAnchorEl(null);
            }} disableRipple>
          <StarIcon/>
          Add to Starred
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />

        <MenuItem onClick={()=>{
            deleteFolder(folder_id)
            setAnchorEl(null);
        }} disableRipple>
          <DeleteIcon/>
          Remove
        </MenuItem>
      </StyledMenu>
    </div>
  );
}