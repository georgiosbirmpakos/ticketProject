import { Box, Button, Grid } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { MovieModel } from '../../shared/models/movie-model';
import { AdminMoviesService } from './admin-movies-service';
import MovieCardComponent from './components/MovieCardComponent';
import MovieDialogCreate from './components/MovieDialogCreate';
import MovieDialogDelete from './components/MovieDialogDelete';
import MoviesTable from './components/MoviesTable';
import { Add } from '@mui/icons-material';

export default function AdminMoviesPage() {
    const [movies, setMovies] = useState<MovieModel[]>([]);
    const [isDialogCreateOpen, setIsDialogCreateOpen] = useState<boolean>(false);
    const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState<boolean>(false);
    const [selectedMovie, setSelectedMovie] = useState<MovieModel | null>(null);

    useEffect(() => {
        loadData();
    }, [])


    async function loadData() {
        setMovies([]);
        const movies = await AdminMoviesService.fetchMoviesList();
        console.log('movies', movies)
        setMovies(movies);
    }


    function createMovieClicked() {
        setSelectedMovie(null);
        setIsDialogCreateOpen(true);
    }

    function deleteMovieClicked(movie: MovieModel) {
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

                <Grid marginBottom={5} container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {movies.map((movie, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index} display='flex' style={{ marginTop: 15, display: 'flex-start', justifyContent: 'center', alignItems: 'center' }}>
                            <MovieCardComponent movie={movie} onDelete={(movie) => deleteMovieClicked(movie)} />
                        </Grid>
                    ))}
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
