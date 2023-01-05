import React, { useRef } from 'react';
import { Typography, Divider, Stack, Button, Box } from '@mui/material';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import ScrollToTopOnMount from '../../shared/components/ScrollToTopOnMount';

export default function EventDetailsPage() {
  const movieDescription = 'O Νικ Φιούρι, διευθυντής της κατασκοπευτικής οργάνωσης Α.Σ.Π.Ι.Δ.Α., στρατολογεί τους Τόνι Σταρκ, Στιβ Ρότζερς, Μπρους Μπάνερ και Θορ για τη δημιουργία μιας ομάδας με σκοπό να σταματήσουν τον αδελφό του Θορ, τον Λόκι, στην προσπάθειά του να υποτάξει τη Γη.'
  const { id } = useParams();

  const myRef = useRef<HTMLDivElement>(null);

  const ticketClick = () => {
    (myRef.current as HTMLDivElement).scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <React.Fragment>
      <ScrollToTopOnMount />
      <div style={{ justifyContent: 'center', display: 'flex', marginTop: 10, marginBottom: 10 }}>
        <Box sx={{ width: '75%', border: 0.5, borderColor: '#bdbdbd', borderRadius: 5 }} justifyContent='center' display={'block'}>
          <Stack direction={'row'} justifyContent='space-between' alignItems='center'>
            <Typography sx={{ color: 'black', fontSize: 'xx-large', marginLeft: 2, fontWeight: 'bolder' }}>Movie Title {id}</Typography>
            <Button onClick={ticketClick} variant='contained' sx={{ ":hover": { backgroundColor: '#920b17' }, borderRadius: 15, backgroundColor: '#E63946', height: 40, width: 100, marginRight: 2 }} >ΕΙΣΙΤΗΡΙΑ</Button>
          </Stack>

          <Divider variant="middle" style={{ marginBottom: 10 }} />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ReactPlayer controls url={'https://www.youtube.com/watch?v=6ZfuNTqbHE8'} width='75%' />

          </div>
          <Divider variant="middle" style={{ marginBottom: 10, marginTop: 10 }} />

          <Box
            component="img"
            sx={{
              height: 300,
              width: 200,
              maxHeight: { xs: 300, md: 300 },
              maxWidth: { xs: 150, md: 200 },
              float: 'left',
              display: 'inline',
              marginLeft: 2,
              borderRadius: 3,
              marginBottom: 2

            }}
            src={require('./avengers_portrait.jpg')} />

          <Stack direction={'column'}>
            <Typography sx={{
              color: 'black', fontSize: 'small', marginLeft: 2,
              float: 'left', display: 'block'
            }}>
              Σκηνοθεσία: Anthony Russo & Joe Russo</Typography>
            <Typography sx={{ color: 'black', fontSize: 'small', marginLeft: 2, float: 'left' }}>Σενάριο:	ΚΡΙΣΤΟΦΕΡ ΜΑΡΚΟΥΣ & ΣΤΙΒΕΝ ΜακΦΙΛΙ</Typography>
            <Typography sx={{ color: 'black', fontSize: 'small', maxWidth: { xs: 300, md: 500 }, marginLeft: 2, float: 'left' }}>Ηθοποιοί:	ΓΚΟΥΙΝΕΘ ΠΑΛΤΡΟΟΥ, ΣΚΑΡΛΕΤ ΓΙΟΧΑΝΣΟΝ, ΠΟΛ ΡΑΝΤ, ΚΡΙΣ ΕΒΑΝΣ, Chris Hemsworth, Bradley Cooper, Pom Klementieff, Dave Bautista, Tilda Swinton, ΡΟΜΠΕΡΤ ΝΤΑΟΥΝΙ ΤΖΟΥΝΙΟΡ, ΤΖΟΝ ΦΑΒΡΟ, ΣΕΜΠΑΣΤΙΑΝ ΣΤΑΝ, ΤΖΟΣ ΜΠΡΟΛΙΝ, ΤΖΕΡΕΜΙ ΡΕΝΕΡ, ΚΡΙΣ ΧΕΜΣΓΟΥΟΡΘ, ΕΒΑΝΤΖΕΛΙΝ ΛΙΛΙ, ΜΠΡΙ ΛΑΡΣΟΝ, ΕΛΙΖΑΜΠΕΘ ΟΛΣΕΝ, ΤΟΜ ΧΟΛΑΝΤ, ΜΠΡΑΝΤΛΕΪ ΚΟΥΠΕΡ, ΜΑΡΚ ΡΑΦΑΛΟ, ΤΣΑΝΤΓΟΥΙΚ ΜΠΟΟΥΖΜΑΝ, ΝΤΕΪΒ ΜΠΑΟΥΤΙΣΤΑ, ΠΟΜ ΚΛΕΜΕΝΤΙΕΦ, ΜΙΣΕΛ ΦΑΪΦΕΡ, ΤΙΛΝΤΑ ΣΟΥΪΝΤΟΝ, Elizabeth Olsen, Chris Evans</Typography>
            <Typography sx={{
              color: 'black', fontSize: 'small', marginLeft: 2,
              float: 'left', display: 'block'
            }}>
              Διάρκεια:	188 λεπτά</Typography>
            <Typography sx={{
              color: 'black', fontSize: 'small', marginLeft: 2,
              float: 'left', display: 'block'
            }}>
              Πρεμιέρα:	Τετάρτη, 24 Απριλίου 2019</Typography>
            <Typography sx={{
              color: 'black', fontSize: 'small', marginLeft: 2,
              float: 'left', display: 'block'
            }}>
              Καταλληλότητα ταινίας:	ΚΑΤΑΛΛΗΛΗ ΑΝΩ ΤΩΝ 12 ΕΤΩΝ</Typography>

          </Stack>
          <Typography sx={{
            color: 'black', fontSize: 'x-large', marginLeft: 2, fontWeight: 'bolder', clear: 'both',
            float: 'left', display: 'block'
          }}>ΠΕΡΙΛΗΨΗ</Typography>
          <Divider variant="middle" style={{ marginBottom: 10, marginTop: 10, clear: 'both' }} />
          <Typography sx={{ color: 'black', fontSize: 'medium', marginLeft: 2, float: 'left' }}>{movieDescription}</Typography>

          <div ref={myRef}>
            <Typography sx={{
              color: 'black', fontSize: 'x-large', marginLeft: 2, fontWeight: 'bolder', clear: 'both',
              float: 'left', display: 'block'
            }}>ΕΙΣΙΤΗΡΙΑ</Typography>
            <Divider variant="middle" style={{ marginBottom: 10, marginTop: 10, clear: 'both' }} />
          </div>

        </Box>
      </div>
    </React.Fragment>
  );
}
