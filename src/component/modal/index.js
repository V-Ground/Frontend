import React from 'react'

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const defaultStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 660,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  outline: 0
};

const index = ({ open, handleOnModalClose, children }) => {
  return (
    <Modal
      open={open}
      onClose={handleOnModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={defaultStyle}>
        {children}
      </Box>
    </Modal>
  )
}

export default index
