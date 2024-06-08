import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
// import fileContext from '../context/files/fileContext';
import folderContext from '../context/folders/folderContext';
import axios from 'axios';
const host = process.env.REACT_APP_SERVER_DOMAIN

export default function ShareFolderDialog({open , setOpen, folder_id}) {

    const [usersWithPermissions, setUsersWithPermissions] = React.useState([]);
    const [userWithoutPermissions, setUserWithoutPermissions] = useState([]);
    const [permissions, setPermissions] = useState({});
    const context = React.useContext(folderContext);

    const handleSave = async () => {
      console.log("inside sharefolder folder_id:",folder_id);
      // try {
      //   await axios.post(`${host}/share/item/${folder._id}/updatePermissions`, { permissions });
      //   setOpen(false);
      // } catch (err) {
      //   console.log(err);
      // }
    };

    useEffect(() => {
      console.log("inside sharefolder folder_id:",folder_id);
    }, [])
    

    const handlePermissionChange = (userId, newPermission) => {
      setPermissions(prevPermissions => ({
        ...prevPermissions,
        [userId]: newPermission,
      }));
    };

    React.useEffect( ()=>{
      console.log("folderId:",folder_id);
      const fetchUsers = async () => {
        try {
          const response1=await axios.post(`${host}/share/item/${folder_id}/users`);
          if(response1.data.success){
            console.log("usersWithPermissions:",response1.data.usersWithPermissions);
            setUsersWithPermissions(response1.data.usersWithPermissions);
          }

          const initialPermissions = response1.data.usersWithPermissions.reduce((acc, user) => {
            acc[user._id] = user.permission;
            return acc;
          }, {});
          setPermissions(initialPermissions);

          const response2=await axios.get(`${host}/auth/allusers`);
          if(response2.data.success){
            const allUsers=response2.data.users;
            const userIdsWithPermission=response1.data.usersWithPermissions.map(user=>user._id);
            const userWithoutPermissions=allUsers.filter(user=> !userIdsWithPermission.includes(user._id));
            setUserWithoutPermissions(userWithoutPermissions);
          }
        } catch (err) {
          console.log(err);
        }
      };
  
      fetchUsers();

    },[]);

    // const onChange=(e)=>{
    //     setFolder({name:e.target.value}); 
    // }

    // const handleClick=()=>{
    //     editFolder(folder_id,folder.name);
    //     setFolder({name:""});
    //     setOpen(false);
    // }


    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
            {/* <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Share Folder</DialogTitle>
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
            </Dialog> */}

    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Share Folder</DialogTitle>
      <DialogContent>
        <h3>Users with Permissions</h3>
        <ul>
          {usersWithPermissions.map(user => (
            <li key={user.userId}>
              <span>{user.email} - </span>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id={`permission-select-label-${user.userId}`}>Permission</InputLabel>
                <Select
                  labelId={`permission-select-label-${user.userId}`}
                  id={`permission-select-${user.userId}`}
                  value={permissions[user.userId] || 'view'}
                  onChange={(e) => handlePermissionChange(user.userId, e.target.value)}
                >
                  <MenuItem value="view">Viewer</MenuItem>
                  <MenuItem value="edit">Editor</MenuItem>
                </Select>
              </FormControl>
            </li>
          ))}
        </ul>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
        </div>
    );
}
