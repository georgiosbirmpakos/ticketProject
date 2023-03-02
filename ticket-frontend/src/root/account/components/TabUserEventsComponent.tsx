import React, { useEffect, useState } from 'react'
import { Box, CircularProgress, Grid } from '@mui/material'
import { EventDto } from '../../../modules/event/dtos/event-dto';
import { AccountService } from '../account-service';
import { useSnackbar } from 'notistack';
import EventDetailsCardComponent from './EventDetailsCardComponent';

const TabUserEventsComponent = () => {
    const [isWaitingFetch, setIsWaitingFetch] = useState(true);
    const [events, setEvents] = useState<EventDto[]>([]);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        async function loadData() {
            setIsWaitingFetch(true);
            setEvents([]);
            try {
                const fetchUserEventsResponseDto = await AccountService.fetchUserEvents();
                console.log('fetchUserEventsResponseDto', fetchUserEventsResponseDto)
                setEvents(fetchUserEventsResponseDto.events);
                setIsWaitingFetch(false);
            } catch (e) {
                console.error(e);
                enqueueSnackbar('Αποτυχημένη εύρεση των προβολών χρήστη', { variant: 'error' });
                setIsWaitingFetch(false);
            }
        }

        loadData();

    }, [])

    return (
        <Box style={{ width: '100%' }}>
            {isWaitingFetch
                ? (
                    <CircularProgress />
                )
                : (
                    <React.Fragment>
                        <Grid container spacing={2} className="center-align-stretch">
                            {events.map(event => (
                                <Grid key={event.eventId} item padding={1} xs={12} sm={6} className="center">
                                    <EventDetailsCardComponent style={{ margin: 2 }} event={event} />
                                </Grid>
                            ))}

                        </Grid>
                    </React.Fragment>
                )
            }

        </Box >
    )
}

export default TabUserEventsComponent