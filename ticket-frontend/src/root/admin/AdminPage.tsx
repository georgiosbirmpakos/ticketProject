import { Box, Tab, Tabs } from '@mui/material';
import React, { Fragment, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AuthService } from '../../modules/auth/AuthService';
import { RoleEnum } from '../../modules/auth/role-enum';

export default function AdminPage() {
    const [value, setValue] = React.useState(0);
    const [isUserAuthorizedForRoles, setIsUserAuthorizedForRoles] = React.useState(false);

    const tabs = [
        {
            name: 'ΤΑΙΝΙΕΣ',
            to: '/admin/movies'
        },
        {
            name: 'ΚΑΤΑΣΤΗΜΑΤΑ',
            to: '/admin/providers'
        },
        {
            name: 'ΑΙΘΟΥΣΕΣ',
            to: '/admin/halls'
        },
        {
            name: 'ΠΡΟΒΟΛΕΣ',
            to: '/admin/events'
        }
    ];

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const isUserAuthorizedForRoles = AuthService.isUserAuthorizedForRoles([RoleEnum.TICKET_ADMIN]);
        if (!isUserAuthorizedForRoles) {
            navigate('/unauthorized');
            return;
        }
        setIsUserAuthorizedForRoles(isUserAuthorizedForRoles);
        handleLocationChange();

        function handleLocationChange() {
            if (location.pathname.startsWith('/admin/movies')) {
                setValue(0);
            } else if (location.pathname.startsWith('/admin/providers')) {
                setValue(1);
            } else if (location.pathname.startsWith('/admin/halls')) {
                setValue(2);
            } else if (location.pathname.startsWith('/admin/events')) {
                setValue(3);
            } else {
                // console.error('unknown location: ' + location.pathname);
                // navigate('/admin/movies');
            }
        }
    }, [location, navigate]);



    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Fragment>
            {isUserAuthorizedForRoles && (
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
            )}
        </Fragment>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}
