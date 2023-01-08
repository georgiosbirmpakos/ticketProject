import { Box, Drawer, Tab, Tabs } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AdminService } from './admin-shared/admin-service';
import TabPanel from './TabPanelComponent';

export default function AdminPage() {
    const [value, setValue] = React.useState(0);

    const tabs = [
        {
            name: 'Ταινίες',
            to: '/admin/movies'
        },
        {
            name: 'Καταστήματα',
            to: '/admin/providers'
        },
        {
            name: 'Προβολές',
            to: '/admin/events'
        },
        {
            name: 'Χρήστες',
            to: '/admin/users'
        }
    ];

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box style={{ width: '100%', height: '100%' }}>
            <Box sx={{ width: '100%' }}>
                <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
                    {tabs.map((tab, index) =>
                        <Tab key={index}
                            component={Link}
                            to={tab.to}
                            label={tab.name}
                        />
                    )}

                </Tabs>
            </Box>
            <Outlet />
        </Box>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}
