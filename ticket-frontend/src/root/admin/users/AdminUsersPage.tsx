import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { MovieModel } from '../../shared/models/movie-model';
import { AdminService } from '../admin-shared/admin-service';

export default function AdminUsersPage() {
    const [movies, setMovies] = useState<MovieModel[]>([]);

    useEffect(() => {
        loadData();
    }, [])


    async function loadData() {
        setMovies([]);
        const movies = await AdminService.fetchMoviesList();
        console.log('movies', movies)
        setMovies(movies);
    }

    return (
        <Box style={{ width: '100%', height: '100%' }}>
            Admin Users page

        </Box>
    );
}
