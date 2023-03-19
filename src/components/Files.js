import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import fileContext from '../context/files/fileContext';
import Grid from '@mui/material/Grid';
import { NavLink } from 'react-router-dom';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import { Chip } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Files = () => {

  const [selectedFile, setSelectedFile] = React.useState();  //selectedFile contains information on the currently picked file.
  const [isFilePicked, setIsFilePicked] = React.useState(false);  //isFilePicked determines if a file has been picked or not.


  const context = React.useContext(fileContext);
  const {files,addFile,getFilesbyPath}=context;


  // const { id } = useParams();

  const handleChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setIsFilePicked(true);
  }


  useEffect(()=>{
    getFilesbyPath(window.location.pathname);
    console.log(files);

  },[])
 
  return (
    <Container>
      <input type="file" name="file" id="file" onChange={handleChange}></input>

        <button disabled={!isFilePicked?true:false} onClick={() => {addFile(selectedFile,window.location.pathname)}}>Upload</button>


        <div>
          {
            files.map((item) => {
              return (
                  <Grid item xs={2} key={item._id}>
                      <NavLink to="/"><Item sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',cursor:"pointer"}}>

                          <FolderOpenOutlinedIcon fontSize='large' />
                          <Chip label={`${item.original_name}`} variant="outlined" />

                      </Item></NavLink>
                  </Grid>
              )
          })
          }
        </div>



    </Container>


  )
}

export default Files