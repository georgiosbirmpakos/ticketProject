import React, { useEffect, useState } from 'react';
import { AdminMoviesService } from '../movies/admin-movies-service';

export default function AdminEventsPage() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        loadData();
    }, [])


    async function loadData() {
        const data = await AdminMoviesService.fetchMoviesList();
        console.log('data', data)
        setData(data);
    }

    return (
        <React.Fragment>
            Admin Events page
        </React.Fragment>
    );
}
