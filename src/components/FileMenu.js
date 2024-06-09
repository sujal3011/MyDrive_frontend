import React, { useContext, useEffect, useState } from 'react'
import fileContext from '../context/files/fileContext';
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
import StarBorderIcon from '@mui/icons-material/StarBorder';
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

export default function FileMenu({ open, anchorEl, setAnchorEl, setDialogOpenfile,setShareFileOpen, file, reload, setReload, isStarred ,isTrash=false}) {

    const handleClose = () => {
        setAnchorEl(null);
    };

    const filecontext = useContext(fileContext);
    const { addToStarred, removeFileFromStarred, deleteFile, downloadFile,restoreFileFromBin,MoveFileToBin} = filecontext;

    return (
        <div>
            {!isTrash &&
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
                        setDialogOpenfile(true);
                        setAnchorEl(null);
                    }} disableRipple>
                        <DriveFileRenameOutlineIcon />
                        Rename
                    </MenuItem>

                    <MenuItem onClick={() => {
                        setShareFileOpen(true);
                        setAnchorEl(null);
                    }} disableRipple>
                        <ShareIcon />
                        Share
                    </MenuItem>

                    {
                        !file.isStarred && <MenuItem onClick={() => {
                            setReload(!reload);
                            addToStarred(file.id,isStarred);
                            setAnchorEl(null);
                        }} disableRipple>
                            <StarBorderIcon />
                            Add to Starred
                        </MenuItem>
                    }

                    {
                        file.isStarred && <MenuItem onClick={() => {
                            setReload(!reload);
                            removeFileFromStarred(file.id,isStarred);
                            setAnchorEl(null);
                        }} disableRipple>
                            <StarIcon />
                            Remove from Starred
                        </MenuItem>
                    }

                    <MenuItem onClick={() => {
                        downloadFile(file.id);
                        setAnchorEl(null);
                    }} disableRipple>
                        <DownloadIcon />
                        Download
                    </MenuItem>

                    <Divider sx={{ my: 0.5 }} />

                    <MenuItem onClick={() => {
                        MoveFileToBin(file.id);
                        setReload(!reload);
                        setAnchorEl(null);
                    }} disableRipple>
                        <DeleteIcon />
                        Move to Bin
                    </MenuItem>
                </StyledMenu>
            }           

            
      {isTrash && 
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
            restoreFileFromBin(file.id);
            setReload(!reload);
            setAnchorEl(null);
          }} disableRipple>
            <DriveFileRenameOutlineIcon />
            Restore
          </MenuItem>

          <Divider sx={{ my: 0.5 }} />

          <MenuItem onClick={() => {
            deleteFile(file.id)
            setAnchorEl(null);
          }} disableRipple>
            <DeleteIcon />
            Delete permanently
          </MenuItem>
        </StyledMenu>
      }
        </div>
    );
}