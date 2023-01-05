import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { MovieModel } from '../../shared/models/movie-model';
import { AdminService } from '../admin-shared/admin-service';
import MovieCardComponent from './MovieCardComponent';

export default function AdminMoviesPage() {
    const [movies, setMovies] = useState<MovieModel[]>([]);

    useEffect(() => {
        loadData();
    }, [])


    async function loadData() {
        const movies = await AdminService.fetchMoviesList();
        console.log('movies', movies)
        setMovies(movies);
    }

    return (
        <div>
            Admin Movies page
            <Grid marginBottom={5} container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {movies.map((movie, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index} display='flex' style={{ marginTop: 15, display: 'flex-start', justifyContent: 'center', alignItems: 'center' }}>
                        <MovieCardComponent movie={movie} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
