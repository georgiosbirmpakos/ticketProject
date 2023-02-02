import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { MovieDto } from '../../../modules/movie/dtos/movie-dto';
import { AdminMoviesService } from '../movies/admin-movies-service';

export default function AdminUsersPage() {
    const [movies, setMovies] = useState<MovieDto[]>([]);

    useEffect(() => {
        loadData();
    }, [])


    async function loadData() {
        // setMovies([]);
        // const movies = await AdminMoviesService.fetchMoviesList();
        // console.log('movies', movies)
        // setMovies(movies);
    }

    return (
        <Box style={{ width: '100%', height: '100%' }}>
            Admin Users page

        </Box>
    );
}
