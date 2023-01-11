import { Box, Button, Grid } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { MovieDto } from '../../../modules/movie/movie-dto';
import { AdminMoviesService } from './admin-movies-service';
import MovieCardComponent from './components/MovieCardComponent';
import MovieDialogCreate from './components/MovieDialogCreate';
import MovieDialogDelete from './components/MovieDialogDelete';
import MoviesTable from './components/MoviesTable';
import { Add } from '@mui/icons-material';
import { MovieListItemDto } from '../../../modules/movie/movie-list-item-dto';

export default function AdminMoviesPage() {
    const [movies, setMovies] = useState<MovieListItemDto[]>([]);
    const [isDialogCreateOpen, setIsDialogCreateOpen] = useState<boolean>(false);
    const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState<boolean>(false);
    const [selectedMovie, setSelectedMovie] = useState<MovieDto | null>(null);

    useEffect(() => {
        loadData();
    }, [])


    async function loadData() {
        setMovies([]);
        const fetchMoviesListResponseDto = await AdminMoviesService.fetchMoviesList();
        console.log('movies', fetchMoviesListResponseDto)
        setMovies(fetchMoviesListResponseDto.movies);
    }


    function createMovieClicked() {
        setSelectedMovie(null);
        setIsDialogCreateOpen(true);
    }

    function deleteMovieClicked(movie: MovieDto) {
        setSelectedMovie(movie);
        setIsDialogDeleteOpen(true);
    }

    async function afterAdd() {
        setIsDialogCreateOpen(false);
        await loadData();
    }

    async function afterDelete() {
        setIsDialogDeleteOpen(false);
        await loadData();
    }

    return (
        <Fragment>
            <Box style={{ width: '100%', height: '100%' }}>
                <Grid container direction="row" padding={2}
                    justifyContent="space-between"
                    alignItems="center">
                    <Grid item>
                    </Grid>
                    <Grid item>
                        <Button onClick={createMovieClicked} variant="contained" startIcon={<Add />}>
                            Δημιουργία Ταινίας
                        </Button>
                    </Grid>
                </Grid>

                <MoviesTable movies={movies}
                    onViewAction={(movie) => deleteMovieClicked(movie)}
                    onEditAction={(movie) => deleteMovieClicked(movie)}
                    onDeleteAction={(movie) => deleteMovieClicked(movie)} />

            </Box>
            {isDialogCreateOpen && (
                <MovieDialogCreate open={isDialogCreateOpen}
                    onCancel={() => setIsDialogCreateOpen(false)}
                    afterAdd={afterAdd} />
            )}
            {isDialogDeleteOpen && selectedMovie && (
                <MovieDialogDelete open={isDialogDeleteOpen}
                    onCancel={() => setIsDialogDeleteOpen(false)}
                    afterDelete={afterDelete} movie={selectedMovie} />
            )}
        </Fragment>
    );
}
