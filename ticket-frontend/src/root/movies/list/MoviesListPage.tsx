import React, { useEffect, useState } from 'react';
import { Typography, Divider, CircularProgress } from '@mui/material';
import ScrollToTopOnMount from '../../shared/components/ScrollToTopOnMount';
import MoviesGridLayoutComponent from '../../../modules/movie/components/MoviesGridLayoutComponent';
import MovieIcon from '@mui/icons-material/Movie';
import { MovieListItemDto } from '../../../modules/movie/dtos/movie-list-item-dto';
import { useSnackbar } from 'notistack';
import { MoviesListService } from './movies-list-service';

export default function MoviesListPage() {
    const [isWaitingFetch, setIsWaitingFetch] = useState<boolean>(false);
    const [movies, setMovies] = useState<MovieListItemDto[]>([]);
    const { enqueueSnackbar } = useSnackbar();


    useEffect(() => {
        async function loadData() {
            setIsWaitingFetch(true);
            setMovies([]);
            try {
                const fetchMoviesListResponseDto = await MoviesListService.fetchMoviesPlayingNow();
                console.log('fetchMoviesListResponseDto', fetchMoviesListResponseDto)
                setMovies(fetchMoviesListResponseDto.movies);
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
                    <React.Fragment>
                        <ScrollToTopOnMount />
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap', marginTop: 10
                        }}>
                            <MovieIcon sx={{ marginLeft: 4 }} fontSize='large' />
                            <Typography sx={{ fontSize: 'xx-large', marginLeft: 3, fontWeight: 'bolder' }}>ΠΑΙΖΟΝΤΑΙ ΤΩΡΑ</Typography>
                        </div>
                        <Divider variant="middle" style={{ marginBottom: 10 }} />
                        <MoviesGridLayoutComponent movies={movies} />
                    </React.Fragment>
                )}
        </React.Fragment>
    );
}
