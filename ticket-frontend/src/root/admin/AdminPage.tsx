import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminService } from './admin-shared/admin-service';

export default function AdminPage() {
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
            Admin page
            <Outlet />
        </React.Fragment>
    );
}
