import React, { useEffect, useState } from 'react'
import CarouselComponent from './components/Carousel';
import { Link } from 'react-router-dom'
import { Typography, Divider, Button, CircularProgress, Box } from '@mui/material';
import MoviesGridLayoutComponent from '../../modules/movie/components/MoviesGridLayoutComponent';
import MovieIcon from '@mui/icons-material/Movie';
import { Stack } from '@mui/system';
import '../shared/components/Footer.css';
import { MovieListItemDto } from '../../modules/movie/dtos/movie-list-item-dto';
import { useSnackbar } from 'notistack';
import { HomeService } from './home-service';

const HomePage = () => {
    const [isWaitingFetch, setIsWaitingFetch] = useState<boolean>(false);
    const [movies, setMovies] = useState<MovieListItemDto[]>([]);
    const { enqueueSnackbar } = useSnackbar();


    useEffect(() => {
        async function loadData() {
            setIsWaitingFetch(true);
            setMovies([]);
            try {
                const fetchMoviesListResponseDto = await HomeService.fetchMoviesPlayingNow();
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



    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
        // navigate
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box style={{ width: '100%', height: '100%' }}>
            {isWaitingFetch
                ? (
                    <CircularProgress />
                )
                : (
                    <React.Fragment>
                        <CarouselComponent movies={movies} />

                        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                            <Stack direction={'row'} alignContent='center' alignItems={'center'}>
                                <MovieIcon sx={{ marginLeft: 4 }} fontSize='large' />
                                <Typography sx={{ fontSize: 'xx-large', marginLeft: 2, fontWeight: 'bolder' }}>ΠΑΙΖΟΝΤΑΙ ΤΩΡΑ</Typography>

                            </Stack>

                            <Link to={'/events'}>
                                <Button sx={{ textDecoration: 'underline', marginRight: 5 }}> ΟΛΕΣ ΟΙ ΤΑΙΝΙΕΣ </Button>
                            </Link>
                        </div>

                        <Divider variant="middle" style={{ marginBottom: 10 }} />
                        <MoviesGridLayoutComponent movies={movies} />
                    </React.Fragment>
                )}

        </Box>
    )
}

export default HomePage
