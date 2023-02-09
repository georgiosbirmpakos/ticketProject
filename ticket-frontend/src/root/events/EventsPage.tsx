import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

export default function EventsPage() {
    return (
        <Box style={{ width: '100%', height: '100%' }}>
            <Outlet />
        </Box>
    );
}
