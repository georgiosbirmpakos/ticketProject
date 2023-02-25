import React, { useEffect, useRef, useState } from 'react';
import { Typography, Divider, Stack, Button, Box, Card, CardContent, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import ScrollToTopOnMount from '../../shared/components/ScrollToTopOnMount';
import { EventDto } from '../../../modules/event/dtos/event-dto';
import { useSnackbar } from 'notistack';
import { EventsDetailsService } from './events-details-service';
import { DateTimePicker } from '@mui/x-date-pickers';
import MovieCardComponent from './components/MovieCardComponent';
import EventOtherDetailsCardComponent from './components/EventOtherDetailsCardComponent';
import TicketsMapComponent from './components/TicketsMapComponent';
import { TicketDto } from '../../../modules/ticket/dtos/ticket-dto';

export default function EventDetailsPage() {
    const [searchParams] = useSearchParams();

    const [isWaitingFetch, setIsWaitingFetch] = useState<boolean>(false);
    const [event, setEvent] = useState<EventDto | null>(null);
    const { enqueueSnackbar } = useSnackbar();
    const [selectedTickets, setSelectedTickets] = useState<Record<number, TicketDto>>({});



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

                            <Grid container spacing={2} className="center">
                                <Grid item xs={12} justifyItems="center" justifyContent="center" textAlign="center">
                                    <h2>
                                        Εισιτήρια
                                    </h2>
                                </Grid>
                                <Grid item xs={6} className="center">
                                    <MovieCardComponent style={{ margin: 2 }} movie={event.movieRef} />
                                </Grid>
                                <Grid item xs={6} className="center" style={{ minHeight: "100%", flexGrow: 1 }}>
                                    <EventOtherDetailsCardComponent style={{ margin: 2 }} event={event} />
                                </Grid>
                            </Grid>
                            <br></br>
                            <Grid container spacing={2} className="center">
                                <Grid item padding={1} xs={6} className="center" >
                                    <TicketsMapComponent tickets={event.tickets}
                                        onSelectedTicketsChange={(selectedTickets) => { setSelectedTickets(selectedTickets) }} />
                                </Grid>
                                <Grid item padding={1} xs={6} className="center" >
                                    <Card>
                                        <CardContent sx={{ justifyItems: "center", justifyContent: "center", textAlign: "center" }}>
                                            <p>{`Selected Tickets: ${Object.values(selectedTickets).length} `}</p>
                                            <p>{`Total Cost is: ${Object.values(selectedTickets).length * event.eventPrice} €`}</p>
                                            <Button color='primary' variant='contained' disabled={!Object.values(selectedTickets).length}>ΑΓΟΡΑ</Button>

                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                            <br></br>
                        </React.Fragment>
                    ) : (
                        <p>Σφάλμα στην εύρεση προβολής</p>
                    )
                )}
        </Box >
    );
}
