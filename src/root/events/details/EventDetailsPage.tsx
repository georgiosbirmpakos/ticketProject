import React from 'react';
import { Typography, Divider } from '@mui/material';

export default function EventDetailsPage() {
  return (
    <React.Fragment>
    <Typography sx={{color:'black', fontSize:'xx-large', marginLeft:2, fontWeight:'bolder'}}>ΠΑΙΖΟΝΤΑΙ ΤΩΡΑ</Typography>
    <Divider variant="middle" style={{marginBottom:10}} />
    </React.Fragment>
  );
}
