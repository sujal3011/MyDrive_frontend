import * as React from 'react';
import Card from '@mui/material/Card';
import { Box } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState,useEffect } from 'react';

export default function MediaCard() {

    const [user, setUser] = useState();

    const getUserDetails = async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/auth/getUser`, {
          method: 'POST',
    
          headers: {
            "auth-token": localStorage.getItem("token")
          },
    
        });
        const json = await response.json();
        // console.log(json);
        setUser(json);
      }
    

    useEffect(()=>{

        if(localStorage.getItem("token")){
            getUserDetails();
        }
      },[]);
    

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',  height: '100vh',width: '100vw' }}>

    <Card raised sx={{ height: '50%',width: '50%' }}>

      <CardMedia 
        component="img"
        image={user && user.profile_photo}
        title="profile photo"
        sx={{ height: '50%',objectFit: "contain",mt : 2 }}
      />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{  textAlign:"center" }} >
          {user && user.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{  textAlign:"center" }}>
         {user && user.email}
        </Typography>
      </CardContent>

      <CardActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
        <Button size="small" variant="contained">Edit Profile</Button>
      </CardActions>

    </Card>
    
    </Box>
  );
}