import React from 'react';
import { Outlet } from 'react-router-dom';
import MoviesGridLayoutComponent from '../../modules/movie/components/MoviesGridLayoutComponent';
import { Divider, Typography } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import Footer from '../shared/components/Footer';
import MuiNavbar from '../shared/components/MuiNavbar';
import ScrollToTopOnMount from '../shared/components/ScrollToTopOnMount';

export default function EventsPage() {
    return (
        <React.Fragment>
            <Outlet />
        </React.Fragment>
    );
}
