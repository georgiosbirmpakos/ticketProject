import React from 'react';
import { Typography, Divider, Stack, Button, Box } from '@mui/material';
import ReactPlayer from 'react-player';

export default function EventListPage() {
  const movieDescription = 'O Νικ Φιούρι, διευθυντής της κατασκοπευτικής οργάνωσης Α.Σ.Π.Ι.Δ.Α., στρατολογεί τους Τόνι Σταρκ, Στιβ Ρότζερς, Μπρους Μπάνερ και Θορ για τη δημιουργία μιας ομάδας με σκοπό να σταματήσουν τον αδελφό του Θορ, τον Λόκι, στην προσπάθειά του να υποτάξει τη Γη.'

  return (
    <React.Fragment>
    <Stack direction={'row'} justifyContent='space-between' alignItems='center'>
    <Typography sx={{color:'black', fontSize:'xx-large', marginLeft:2, fontWeight:'bolder'}}>Movie Title</Typography>
    <Button variant='contained' sx={{":hover":{backgroundColor: '#920b17'},borderRadius:15, backgroundColor: '#E63946',height:40,  width:100, marginRight:2}} >ΕΙΣΙΤΗΡΙΑ</Button>
    </Stack>

    <Divider variant="middle" style={{marginBottom:10}} />
    <div style={{display:'flex', justifyContent:'center'}}>
    <ReactPlayer controls url={'https://www.youtube.com/watch?v=6ZfuNTqbHE8'}/>
    
    </div>
    <Divider variant="middle" style={{marginBottom:10, marginTop:10}} />

    
    <Box
        component="img"
        sx={{
          height: 300,
          width: 200,
          maxHeight: { xs: 300, md: 300 },
          maxWidth: { xs: 150, md: 200 },
          float:'left', 
          display:'inline',
          marginLeft:10,
          borderRadius:3
        }}
        alt="The house from the offer."
        src={require('./avengers_portrait.jpg')}
      />
      <Stack direction={'column'}>
      <Typography sx={{color:'black', fontSize:'x-large', marginLeft:2, fontWeight:'bolder', 
          float:'left', display:'block'}}>ΠΕΡΙΛΗΨΗ</Typography>
      <Typography sx={{color:'black', fontSize:'medium', marginLeft:2,float:'left'}}>{movieDescription}</Typography>
      </Stack>
    </React.Fragment>
  );
}
