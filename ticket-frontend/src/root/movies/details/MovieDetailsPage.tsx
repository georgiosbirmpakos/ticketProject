import React, { useEffect, useState } from 'react';
import { Typography, Divider, Stack, Button, Box, CircularProgress } from '@mui/material';
import ReactPlayer from 'react-player';
import { Link, useSearchParams } from 'react-router-dom';
import ScrollToTopOnMount from '../../shared/components/ScrollToTopOnMount';
import { useSnackbar } from 'notistack';
import { MoviesDetailsService } from './movies-details-service';
import { MovieDto } from '../../../modules/movie/dtos/movie-dto';

export default function MovieDetailsPage() {
    const movieDescription = 'O Νικ Φιούρι, διευθυντής της κατασκοπευτικής οργάνωσης Α.Σ.Π.Ι.Δ.Α., στρατολογεί τους Τόνι Σταρκ, Στιβ Ρότζερς, Μπρους Μπάνερ και Θορ για τη δημιουργία μιας ομάδας με σκοπό να σταματήσουν τον αδελφό του Θορ, τον Λόκι, στην προσπάθειά του να υποτάξει τη Γη.'

    const [searchParams] = useSearchParams();
    console.log('searchParams', searchParams)


    const [isWaitingFetch, setIsWaitingFetch] = useState<boolean>(false);
    const [movie, setMovie] = useState<MovieDto | null>(null);
    const { enqueueSnackbar } = useSnackbar();


    useEffect(() => {
        async function loadData() {
            setIsWaitingFetch(true);
            setMovie(null);
            try {
                const movieIdStr = searchParams.get('movieId');
                const movieId = movieIdStr ? parseInt(movieIdStr) : NaN;
                if (isNaN(movieId)) {
                    throw new Error('movieId is NaN')
                }
                const fetchMovieDetailsResponseDto = await MoviesDetailsService.fetchMovieDetails(movieId);
                console.log('fetchMoviesListResponseDto', fetchMovieDetailsResponseDto)
                setMovie(fetchMovieDetailsResponseDto.movie);
                setIsWaitingFetch(false);
            } catch (e) {
                console.error(e);
                enqueueSnackbar('Αποτυχημένη εύρεση λίστας ταινιών', { variant: 'error' });
                setIsWaitingFetch(false);
            }
        }

        loadData();
    }, [])

    return (
        <React.Fragment>
            {isWaitingFetch
                ? (
                    <CircularProgress />
                )
                : (
                    movie && (
                        <React.Fragment>
                            <ScrollToTopOnMount />
                            <div style={{ justifyContent: 'center', display: 'flex', marginTop: 10, marginBottom: 10 }}>
                                <Box sx={{ width: '75%', border: 0.5, borderColor: '#bdbdbd', borderRadius: 5 }} justifyContent='center' display={'block'}>
                                    <Stack direction={'row'} justifyContent='space-between' alignItems='center'>
                                        <Typography sx={{ fontSize: 'xx-large', marginLeft: 2, fontWeight: 'bolder' }}>{movie.name}</Typography>
                                        <Button component={Link} to={'/events/list?movieId=' + movie.movieId} variant='contained' sx={{ borderRadius: 15, height: 40, width: 100, marginRight: 2 }} >ΠΡΟΒΟΛΕΣ</Button>
                                    </Stack>

                                    <Divider variant="middle" style={{ marginBottom: 10 }} />
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <ReactPlayer controls url={movie.trailerSrcUrl} width='75%' />

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
                                        src={`${movie.imageMimePrefix},${movie.image}`} />

                                    <Stack direction={'column'}>
                                        <Typography sx={{
                                            marginLeft: 2,
                                            float: 'left', display: 'block'
                                        }}>
                                            <b>Σκηνοθεσία:</b> {movie.directors}
                                        </Typography>
                                        <Typography sx={{ fontSize: 'small', marginLeft: 2, float: 'left' }}>
                                            <b>Σενάριο:</b>	{movie.script}
                                        </Typography>
                                        <Typography sx={{ fontSize: 'small', maxWidth: { xs: 300, md: 500 }, marginLeft: 2, float: 'left' }}>
                                            <b>Ηθοποιοί:</b>	{movie.actors}
                                        </Typography>
                                        <Typography sx={{
                                            fontSize: 'small', marginLeft: 2,
                                            float: 'left', display: 'block'
                                        }}>
                                            <b>Διάρκεια:</b>	{movie.duration} λεπτά</Typography>
                                        <Typography sx={{
                                            fontSize: 'small', marginLeft: 2,
                                            float: 'left', display: 'block'
                                        }}>
                                            <b>Έτος:</b>	{movie.year}
                                        </Typography>
                                        <Typography sx={{
                                            fontSize: 'small', marginLeft: 2,
                                            float: 'left', display: 'block'
                                        }}>
                                            <b>Καταλληλότητα:</b>	{movie.appropriateness}</Typography>
                                    </Stack>
                                    <Typography sx={{
                                        fontSize: 'x-large', marginLeft: 2, fontWeight: 'bolder', clear: 'both',
                                        float: 'left', display: 'block'
                                    }}>
                                        ΠΕΡΙΛΗΨΗ
                                    </Typography>
                                    <Divider variant="middle" style={{ marginBottom: 10, marginTop: 10, clear: 'both' }} />
                                    <Typography sx={{ fontSize: 'medium', marginLeft: 2, float: 'left' }}>{movie.description}</Typography>

                                </Box>
                            </div>
                        </React.Fragment>
                    )
                )}
        </React.Fragment>
    );
}
