import React, { useEffect, useState } from 'react';
import { AdminService } from '../admin-shared/admin-service';

export default function AdminProvidersPage() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        loadData();
    }, [])


    async function loadData() {
        const data = await AdminService.fetchMoviesList();
        console.log('data', data)
        setData(data);
    }

    return (
        <React.Fragment>
            Admin Providers page
        </React.Fragment>
    );
}
