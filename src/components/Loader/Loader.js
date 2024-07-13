// import * as React from 'react';
// import CircularProgress from '@mui/material/CircularProgress';
// import Box from '@mui/material/Box';

// export default function Loader() {

//   React.useEffect(()=>{
//     console.log("Inside Loader");
//   },[]);
  

//   return (
//     <Box sx={{ display: 'flex', width:'100vw', height:'100vh' }}>
//       <CircularProgress />
//     </Box>
//   );
// }


import React from 'react';
import { CircularProgress, Backdrop } from '@mui/material';

const Loader = () => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;
