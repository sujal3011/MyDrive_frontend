import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// Function to convert file to base64  
function convertToBase64(file){
  return new Promise((resolve,reject)=>{
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload=()=>{
      resolve(fileReader.result);
    }
    fileReader.onerror = (error) =>{
      reject(error);
    }
  })
}

const theme = createTheme();

export default function SignUp() {

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:"",profile_photo:""});

  const onChange = async (e) => {

    if(e.target.type==='file'){
      const file = e.target.files[0];
      const base64 = await convertToBase64(file); //converting the image from binary format to a string
      // console.log(base64);  
      setCredentials({ ...credentials, [e.target.name]: base64 });

    }
    
    else{
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
}

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(credentials.cpassword==credentials.password){
    
    const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/auth/createUser`, {
      method: 'POST',

      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password ,profile_photo: credentials.profile_photo })

  });

  const json = await response.json();
  // console.log(json);

  if (json.success) {   //checking if we successfully got the response or not
      //saving the auth token and redirecting

      localStorage.setItem("token", json.token);  //saving the auth token that we got on logging in the localstorage so that it can be used to fetch the notes of the logged in user

      navigate('/');   //redirecting to the home page


  }
  else {
      alert("Error");
  }

  }

  else{
    alert("Confirm password must be same as password")
  }

  };

  return (

    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField onChange={onChange}
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField onChange={onChange}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField onChange={onChange}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField onChange={onChange}
                  required
                  fullWidth
                  name="cpassword"
                  label="Confirm Password"
                  type="password"
                  id="cpassword"
                  autoComplete="new-password"
                />
              </Grid>

              <Grid item xs={12} sx={{ color: 'rgba(0, 0, 0, 0.6)' ,ml:2 }}>
              Choose profile photo
              </Grid>

              <Grid item xs={12}>
                <TextField onChange={onChange}
                  required
                  fullWidth
                  name="profile_photo"
                  label=""
                  type="file"
                  id="profile_photo"
                  autoComplete="profile_photo"
                />
              </Grid>


              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to="/login" variant="body2">
                  Already have an account? Sign in
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box>

       
        <a href={`${process.env.REACT_APP_SERVER_DOMAIN}/auth/google`}>
        <div class="google-btn">
          <div class="google-icon-wrapper">
            <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
          </div>
          <div class="btn-text"><b>Google</b></div>
        </div>
        </a>

        <div class="google-btn">
          <div class="google-icon-wrapper">
            <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg"/>
          </div>
          <div class="btn-text"><b>Facebook</b></div>
        </div>

        <div class="google-btn">
          <div class="google-icon-wrapper">
            <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"/>
          </div>
          <div class="btn-text"><b>Github</b></div>
        </div>

        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}