import React from 'react'
import { BsHeart } from 'react-icons/bs'
import { IconButton, Badge } from '@mui/material';

const HearIcon = ({ color }) => {
  return (
    <IconButton>
      <Badge>
        <BsHeart sx={{ color }} />
      </Badge>
    </IconButton>
  )
}

export default HearIcon