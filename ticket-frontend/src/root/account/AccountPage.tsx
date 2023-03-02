import React, { useEffect } from 'react'
import { Box, Tab, Tabs } from '@mui/material'
import TabManageComponent from './components/TabManageComponent';
import TabUserEventsComponent from './components/TabUserEventsComponent';
import { GlobalState } from '../../modules/core/global-state';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (!GlobalState.instance.loggedUser) {
            navigate('/')
        }


    }, [])

    const tabs = [
        {
            name: 'ΔΙΑΧΕΙΡΙΣΗ ΛΟΓΑΡΙΑΣΜΟΥ',
        },
        {
            name: 'ΟΙ ΠΡΟΒΟΛΕΣ ΜΟΥ',
        },
    ];



    return (
        <Box style={{ width: '100%', height: '100%' }}>

            <Box sx={{ width: '100%' }}>
                <Tabs value={value} onChange={(e, newValue) => setValue(newValue)} aria-label="nav tabs example">
                    {tabs.map((tab, index) =>
                        <Tab key={index}
                            label={tab.name}
                        />
                    )}

                </Tabs>
            </Box>
            <br />

            {value === 0 && (
                <Box sx={{ width: '100%' }}>
                    <TabManageComponent></TabManageComponent>
                </Box>
            )}
            {value === 1 && (
                <Box sx={{ width: '100%' }}>
                    <TabUserEventsComponent></TabUserEventsComponent>
                </Box>
            )}
        </Box>
    )
}

export default LoginPage