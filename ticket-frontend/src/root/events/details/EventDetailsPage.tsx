import React, { useEffect, useRef, useState } from 'react';
import { Typography, Divider, Stack, Button, Box, Card, CardContent, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import ReactPlayer from 'react-player';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import ScrollToTopOnMount from '../../shared/components/ScrollToTopOnMount';
import { EventDto } from '../../../modules/event/dtos/event-dto';
import { useSnackbar } from 'notistack';
import { EventsDetailsService } from './events-details-service';
import { DatePicker } from '@mui/x-date-pickers';
import MovieCardComponent from './components/MovieCardComponent';
import EventOtherDetailsCardComponent from './components/EventOtherDetailsCardComponent';

export default function EventDetailsPage() {
    const [searchParams] = useSearchParams();

    const [isWaitingFetch, setIsWaitingFetch] = useState<boolean>(false);
    const [event, setEvent] = useState<EventDto | null>(null);
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const { enqueueSnackbar } = useSnackbar();


    useEffect(() => {
        const eventIdStr = searchParams.get('eventId');
        const eventId = eventIdStr ? parseInt(eventIdStr) : NaN;
        if (isNaN(eventId)) {
            enqueueSnackbar('Η παράμετρος eventId απαιτείται για αυτή την σελίδα', { variant: 'error' });
            return;
        }

        async function loadData() {
            setIsWaitingFetch(true);
            setEvent(null);
            try {
                const fetchEventDetailsResponseDto = await EventsDetailsService.fetchEventDetails(eventId);
                console.log('fetchMoviesListResponseDto', fetchEventDetailsResponseDto)
                setEvent(fetchEventDetailsResponseDto.event);
                setIsWaitingFetch(false);
            } catch (e) {
                console.error(e);
                enqueueSnackbar('Αποτυχημένη εύρεση επιλογών φίλτρων', { variant: 'error' });
            }

        }


        loadData();
    }, [])

    return (
        <Box style={{ width: '100%', height: '100%' }}>
            <ScrollToTopOnMount />
            {isWaitingFetch
                ? (
                    <CircularProgress />
                ) : (event?.movieRef
                    ? (
                        <React.Fragment>

                            <Grid container>
                                <Grid item xs={12} justifyItems="center" justifyContent="center" textAlign="center">
                                    <h2>
                                        Εισιτήρια
                                    </h2>
                                </Grid>
                                <Grid item xs={6} justifyItems="center" justifyContent="center" textAlign="center">
                                    <MovieCardComponent style={{ margin: 2 }} movie={event.movieRef} />
                                </Grid>
                                <Grid item xs={6} justifyItems="center" justifyContent="center" textAlign="center">
                                    <EventOtherDetailsCardComponent style={{ margin: 2 }} event={event} />
                                </Grid>
                                <Grid item xs={12} justifyItems="center" justifyContent="center" textAlign="center">
                                    <MovieCardComponent movie={event.movieRef} />
                                </Grid>
                            </Grid>
                        </React.Fragment>
                    ) : (
                        <p>Σφάλμα στην εύρεση προβολής</p>
                    )
                )}
        </Box >
    );
}
