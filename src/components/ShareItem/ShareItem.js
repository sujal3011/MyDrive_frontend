import React, { useEffect, useState } from 'react';
import folderContext from '../../context/folders/folderContext';
import axios from 'axios';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  Typography,
  List,
  ListItem,
  ListItemText,
  FormControl,
  InputLabel,
  Card,
  CardActions,
  CardContent,
  Divider,
  Chip,
  IconButton
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material'; 
import { useParams,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';

const host = process.env.REACT_APP_SERVER_DOMAIN;

export default function ShareItem({id,itemType}) {

  const navigate = useNavigate();  

  const [usersWithPermissions, setUsersWithPermissions] = useState([]);
  const [usersWithoutPermissions, setUsersWithoutPermissions] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [initialPermissions, setInitialPermissions] = useState([]);
  const [reload, setReload] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(false);
  const context = React.useContext(folderContext);

  const handleSave = async () => {
    try {

      // setLoading(true);

      const response=await axios.post(`${host}/share/item/${id}/updatePermissions`, { itemType,permissions });
      if(response.data.success){
        setLoading(false);
        setReload(!reload);
        toast.success("User permissions updated successfully");
      }


    } catch (err) {
      console.log(err);
    }
  };

  const handlePermissionChange = (userId, newPermission) => {
    console.log("userId,newPermission:",userId,newPermission);
    setPermissions(prevPermissions => ({
      ...prevPermissions,
      [userId]: newPermission,
    }));
    console.log("permissions:",permissions);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        
        // setLoading(true);

        //fetching owner of the item
        let res;
        if(itemType==='file'){
          res = await axios.get(`${host}/files/${id}/owner`);
          if(res.data.success) setOwner(res.data.owner);

        }else if(itemType==='folder'){
          res = await axios.get(`${host}/folders/${id}/owner`);
          if(res.data.success) setOwner(res.data.owner);
        }

        const response1 = await axios.get(`${host}/share/item/${id}/users`);
        if (response1.data.success) {
          setUsersWithPermissions(response1.data.usersWithPermissions);
        }

        const initialPermissions = response1.data.usersWithPermissions.reduce((acc, user) => {
          acc[user._id] = user.permission;
          return acc;
        }, {});
        setInitialPermissions(initialPermissions);

        const response2 = await axios.get(`${host}/auth/allusers`);
        if (response2.data.success) {
          const allUsers = response2.data.users;
          const userIdsWithPermission = response1.data.usersWithPermissions.map(user => user._id);
          const usersWithoutPermissions = allUsers.filter(user => !userIdsWithPermission.includes(user._id));
          setUsersWithoutPermissions(usersWithoutPermissions);
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };

    fetchUsers();
  }, [id,reload]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if(loading){
    return <Loader/>
  }

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>


        <Card style={{width:'40%', overflow: 'hidden', boxShadow: 'grey 16px 14px 30px'}}>

        <CardContent>
            <div>
            <Typography variant="h6">Users With Access</Typography>
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            <List>

                <ListItem>
                    <ListItemText primary={owner?.email} />
                    <Chip style={{marginRight:"10px"}} label={'Owner'}/>
    
                </ListItem>

                {usersWithPermissions.filter(user=>user.email!==owner.email).map(user => (
                <ListItem key={user._id}>
                    <ListItemText primary={user.email} />
                    <Chip style={{marginRight:"10px"}} label={(initialPermissions[user._id]==='edit' ? 'Editor' : 'Viewer')} />
                    <FormControl style={{width:'30%'}}>
                    <InputLabel>Permission</InputLabel>
                    <Select
                        // value={(permissions && permissions['6669ca5fe5693c58f28ec5e6']) || ''}
                        value={permissions[user._id] || ''}
                        onChange={(e) => handlePermissionChange(user._id, e.target.value)}
                    >
                        <MenuItem value="Viewer">Viewer</MenuItem>
                        <MenuItem value="Editor">Editor</MenuItem>
                        <Divider />
                        <MenuItem value="Remove access">Remove access</MenuItem>
                    </Select>
                    </FormControl>
                </ListItem>
                ))}
            </List>
            </div>

            <Typography variant="h6" style={{ marginTop: '2rem' }}>Add Users</Typography>
            <TextField
                label="Search Users"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearch}
                fullWidth
            />
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            <List>
                {usersWithoutPermissions
                .filter(user => user.email!==owner.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()))
                .map(user => (
                    <ListItem key={user._id}>
                    <ListItemText primary={user.email} />
                    <FormControl style={{width:'30%'}}>
                        <InputLabel>Permission</InputLabel>
                        <Select
                        value={permissions[user._id] || ''}
                        onChange={(e) => handlePermissionChange(user._id, e.target.value)}
                        >
                        <MenuItem value="Viewer">Viewer</MenuItem>
                        <MenuItem value="Editor">Editor</MenuItem>
                        </Select>
                    </FormControl>
                    </ListItem>
                ))}
            </List>
            </div>
            </div>
        </CardContent>
        <CardActions style={{ display: 'flex', justifyContent: 'end' }}>
        <Button size="small" variant="contained" onClick={handleSave}>Update</Button>
        <Button size="small" variant="contained" onClick={() => navigate(-1)}>Close</Button>
        </CardActions>
        </Card>
  </div>  
  );
}
