import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import { Box, Button } from '@mui/material';
import Loader from '../Loader/Loader';

const FilePreview = ({ fileId, handleClose }) => {
  const [fileUrl, setFileUrl] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false); // State for modal open/close
  const host = process.env.REACT_APP_SERVER_DOMAIN;

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await axios.get(`${host}/files/preview/${fileId}`, {
          responseType: 'blob',
        });
        const fileBlob = new Blob([response.data], { type: response.headers['content-type'] });
        const url = URL.createObjectURL(fileBlob);
        setFileUrl(url);
        setFileType(response.headers['content-type']);
        setOpen(true); // Open modal once file is fetched and ready to preview
      } catch (err) {
        setError('Failed to load file.');
      }
    };

    fetchFile();

    // Cleanup URL object
    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [fileId]);

  const handleCloseClick = () => {
    setOpen(false);
    handleClose();
  };

  const handleOpenInNewTab = () => {
    window.open(fileUrl, '_blank');
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!fileUrl) {
    return   <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      zIndex: 1300
    }}>
      <Loader />
    </div>
  }

  let modalContent;

  if (fileType.startsWith('image/')) {
    modalContent = (
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '90%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <img src={fileUrl} alt="Preview" style={{ width: '100%', height: '100%' }} />
        <Button onClick={handleCloseClick} variant="contained" color="primary" sx={{ mt: 2, mr: 2 }}>
          Close Preview
        </Button>
        <Button onClick={handleOpenInNewTab} variant="contained" color="secondary" sx={{ mt: 2 }}>
          Open in New Tab
        </Button>
      </Box>
    );
  } else if (fileType.startsWith('video/')) {
    modalContent = (
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '90%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <video controls style={{ width: '100%', height: '100%' }}>
          <source src={fileUrl} type={fileType} />
          Your browser does not support the video tag.
        </video>
        <Button onClick={handleCloseClick} variant="contained" color="primary" sx={{ mt: 2, mr: 2 }}>
          Close Preview
        </Button>
        <Button onClick={handleOpenInNewTab} variant="contained" color="secondary" sx={{ mt: 2 }}>
          Open in New Tab
        </Button>
      </Box>
    );
  } else if (fileType === 'application/pdf') {
    modalContent = (
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '90%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <iframe title="Preview" src={fileUrl} width="100%" height="100%"></iframe>
        <Button onClick={handleCloseClick} variant="contained" color="primary" sx={{ mt: 2, mr: 2 }}>
          Close Preview
        </Button>
        <Button onClick={handleOpenInNewTab} variant="contained" color="secondary" sx={{ mt: 2 }}>
          Open in New Tab
        </Button>
      </Box>
    );
  } else {
    modalContent = (
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <p>File type not supported for preview. Please download the file to view it.</p>
        <Button onClick={handleCloseClick} variant="contained" color="primary" sx={{ mt: 2, mr: 2 }}>
          Close Preview
        </Button>
        <Button onClick={handleOpenInNewTab} variant="contained" color="secondary" sx={{ mt: 2 }}>
          Open in New Tab
        </Button>
      </Box>
    );
  }

  return (
    <Modal
      open={open}
      onClose={handleCloseClick}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {modalContent}
    </Modal>
  );
};

export default FilePreview;
