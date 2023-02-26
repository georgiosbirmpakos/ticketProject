import React, { useEffect, useState } from 'react';
import { Button, Box, Card, CardContent, CircularProgress, Grid, Alert } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import ScrollToTopOnMount from '../../shared/components/ScrollToTopOnMount';
import { EventDto } from '../../../modules/event/dtos/event-dto';
import { useSnackbar } from 'notistack';
import { EventsDetailsService } from './events-details-service';
import MovieCardComponent from './components/MovieCardComponent';
import EventOtherDetailsCardComponent from './components/EventOtherDetailsCardComponent';
import TicketsMapComponent from './components/TicketsMapComponent';
import { TicketDto } from '../../../modules/ticket/dtos/ticket-dto';
import { GlobalState } from '../../../modules/core/global-state';
import { BookTicketRequestDto } from './dtos/book-ticket-dto';
import { TypeUtils } from '../../../modules/core/type-utils';

export default function EventDetailsPage() {
    const [searchParams] = useSearchParams();

    const [isWaitingFetch, setIsWaitingFetch] = useState<boolean>(false);
    const [event, setEvent] = useState<EventDto | null>(null);
    const { enqueueSnackbar } = useSnackbar();
    const [selectedTickets, setSelectedTickets] = useState<Record<number, TicketDto>>({});
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(GlobalState.instance.loggedUser != null);

    console.log('GlobalState.instance.loggedUser', GlobalState.instance.loggedUser)
    console.log('isLoggedIn', isLoggedIn)



    useEffect(() => {

        loadData();
    }, [])

    async function loadData() {
        const eventIdStr = searchParams.get('eventId');
        const eventId = eventIdStr ? parseInt(eventIdStr) : NaN;
        if (isNaN(eventId)) {
            enqueueSnackbar('Η παράμετρος eventId απαιτείται για αυτή την σελίδα', { variant: 'error' });
            return;
        }
        setIsWaitingFetch(true);
        setEvent(null);
        setSelectedTickets([]);
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

    async function onBuyTicketClicked() {
        try {
            const bookTicketRequestDto = new BookTicketRequestDto();
            bookTicketRequestDto.ticketsIds = Object.values(selectedTickets).map(ticket => ticket.ticketId).filter(TypeUtils.isNonNullable);
            const bookTicketResponseDto = await EventsDetailsService.bookTicket(bookTicketRequestDto);
            enqueueSnackbar('Επιτυχία αγοράς εισιτηρίων ', { variant: 'success' });
            await loadData();
        } catch (e: any) {
            console.error(e);
            enqueueSnackbar('Αποτυχία αγοράς εισιτηρίων ', { variant: 'error' })
        }
    }

    return (
        <Box style={{ width: '100%', height: '100%' }}>
            <ScrollToTopOnMount />
            {isWaitingFetch
                ? (
                    <CircularProgress />
                ) : (event?.movieRef
                    ? (
                        <React.Fragment>

                            <Grid container spacing={2} className="center-align-stretch">
                                <Grid item padding={1} xs={12} justifyItems="center" justifyContent="center" textAlign="center">
                                    <h2>
                                        Εισιτήρια
                                    </h2>
                                </Grid>
                                <Grid item padding={1} xs={12} sm={6} className="center">
                                    <MovieCardComponent style={{ margin: 2 }} movie={event.movieRef} />
                                </Grid>
                                <Grid item padding={1} xs={12} sm={6} className="center">
                                    <EventOtherDetailsCardComponent style={{ margin: 2 }} event={event} />
                                </Grid>
                                <Grid item padding={1} xs={12} sm={6} className="center" >
                                    <TicketsMapComponent tickets={event.tickets}
                                        onSelectedTicketsChange={(selectedTickets) => { setSelectedTickets(selectedTickets) }} />
                                </Grid>
                                <Grid item padding={1} xs={12} sm={6} className="center" >
                                    <Card sx={{ height: "100%" }}>
                                        <CardContent sx={{ justifyItems: "center", justifyContent: "center", textAlign: "center" }}>
                                            <p>{`Selected Tickets: ${Object.values(selectedTickets).length} `}</p>
                                            <p>{`Total Cost is: ${Object.values(selectedTickets).length * event.eventPrice} €`}</p>
                                            <Button color='primary' variant='contained' disabled={!isLoggedIn || !Object.values(selectedTickets).length}
                                                onClick={() => onBuyTicketClicked()}
                                            >
                                                ΑΓΟΡΑ
                                            </Button>
                                            {!isLoggedIn && (
                                                <Alert severity="warning">Πρέπει να συνδεθείς για να μπορείς να αγοράσεις εισιτήρια</Alert>
                                            )}

                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                            <br></br>
                            <Grid container spacing={2} className="center">

                            </Grid>
                            <br></br>
                        </React.Fragment>
                    ) : (
                        <p>Σφάλμα στην εύρεση προβολής</p>
                    )
                )
            }
        </Box >
    );
}
