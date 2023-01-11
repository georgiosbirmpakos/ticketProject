import { Box, Button, Grid } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { MovieDto } from '../../../modules/movie/movie-dto';
import { AdminMoviesService } from './admin-movies-service';
import MovieDialogCreateComponent from './components/MovieDialogCreateComponent';
import MovieDialogDeleteComponent from './components/MovieDialogDeleteComponent';
import MoviesTable from './components/MoviesTable';
import { Add } from '@mui/icons-material';
import { MovieListItemDto } from '../../../modules/movie/movie-list-item-dto';
import MovieDialogUpdateComponent from './components/MovieDialogUpdateComponent';

export default function AdminMoviesPage() {
    const [movies, setMovies] = useState<MovieListItemDto[]>([]);
    const [isDialogCreateOpen, setIsDialogCreateOpen] = useState<boolean>(false);
    const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState<boolean>(false);
    const [isDialogUpdateOpen, setIsDialogUpdateOpen] = useState<boolean>(false);
    const [selectedMovie, setSelectedMovie] = useState<MovieDto | null>(null);
    const [readonly, setReadonly] = useState<boolean>(false);

    useEffect(() => {
        loadData();
    }, [])


    async function loadData() {
        setMovies([]);
        const fetchMoviesListResponseDto = await AdminMoviesService.fetchMoviesList();
        setMovies(fetchMoviesListResponseDto.movies);
    }


    function createMovieClicked() {
        setSelectedMovie(null);
        setIsDialogCreateOpen(true);
    }

    function viewMovieClicked(movie: MovieDto) {
        setSelectedMovie(movie);
        setReadonly(true);
        setIsDialogUpdateOpen(true);
    }

    function updateMovieClicked(movie: MovieDto) {
        setSelectedMovie(movie);
        setReadonly(false);
        setIsDialogUpdateOpen(true);
    }

    function deleteMovieClicked(movie: MovieDto) {
        setSelectedMovie(movie);
        setIsDialogDeleteOpen(true);
    }

    async function afterAdd() {
        setIsDialogCreateOpen(false);
        await loadData();
    }

    async function afterUpdate() {
        setIsDialogUpdateOpen(false);
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
                    onViewAction={(movie) => viewMovieClicked(movie)}
                    onEditAction={(movie) => updateMovieClicked(movie)}
                    onDeleteAction={(movie) => deleteMovieClicked(movie)} />

            </Box>
            {isDialogCreateOpen && (
                <MovieDialogCreateComponent open={isDialogCreateOpen}
                    onCancel={() => setIsDialogCreateOpen(false)}
                    afterAdd={afterAdd} />
            )}
            {isDialogUpdateOpen && selectedMovie?.movieId && (
                <MovieDialogUpdateComponent open={isDialogUpdateOpen}
                    movieId={selectedMovie.movieId}
                    readonly={readonly}
                    onCancel={() => setIsDialogUpdateOpen(false)}
                    afterUpdate={afterUpdate} />
            )}
            {isDialogDeleteOpen && selectedMovie && (
                <MovieDialogDeleteComponent open={isDialogDeleteOpen}
                    onCancel={() => setIsDialogDeleteOpen(false)}
                    afterDelete={afterDelete} movie={selectedMovie} />
            )}
        </Fragment>
    );
}
