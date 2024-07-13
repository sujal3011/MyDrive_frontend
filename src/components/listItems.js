import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { NavLink } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderSharedIcon from '@mui/icons-material/FolderShared';

export const mainListItems = (
  <React.Fragment>

    <NavLink to="/" style={{ color: 'inherit', textDecoration: 'inherit'}}><ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="My Drive" />
    </ListItemButton></NavLink>

    <NavLink to="/shared-with-me" style={{ color: 'inherit', textDecoration: 'inherit'}}>
    <ListItemButton>
      <ListItemIcon>
        <FolderSharedIcon/>
      </ListItemIcon>
      <ListItemText primary="Shared with me" />
    </ListItemButton>
    </NavLink>


    <NavLink to="/starredPage" style={{ color: 'inherit', textDecoration: 'inherit'}}>
    <ListItemButton>
      <ListItemIcon>
        <StarIcon/>
      </ListItemIcon>
      <ListItemText primary="Starred" />
    </ListItemButton>
    </NavLink>

    <NavLink to="/trash" style={{ color: 'inherit', textDecoration: 'inherit'}}>
    <ListItemButton>
      <ListItemIcon>
        <DeleteIcon/>
      </ListItemIcon>
      <ListItemText primary="Bin" />
    </ListItemButton></NavLink>


  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);