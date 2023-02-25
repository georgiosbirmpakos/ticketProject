import React, { useEffect, useState } from 'react';
import { Typography, Card, CardContent, Grid, FormControl, InputLabel, MenuItem, Select, CircularProgress, TextField, SelectChangeEvent, Box } from '@mui/material';
import ScrollToTopOnMount from '../../shared/components/ScrollToTopOnMount';
import { useLocation, useNavigate } from 'react-router-dom';
import { EventsFilterOptionsDto } from '../../../modules/event/dtos/events-filter-options-dto';
import { useSnackbar } from 'notistack';
import { EventsListService } from './events-list-service';
import { useSearchParams } from 'react-router-dom';
import { EventFilters } from '../../../modules/event/dtos/event-filters';
import { DatePicker } from '@mui/x-date-pickers';
import { EventDto } from '../../../modules/event/dtos/event-dto';
import { FetchEventsFilteredRequestDto } from './dtos/fetch-events-filtered-dto';
import EventsTableComponent from './components/EventsTableComponent';


export default function EventListPage() {
    const [searchParams] = useSearchParams();
    const location = useLocation();

    const [isWaitingFetch, setIsWaitingFetch] = useState<boolean>(false);
    const [options, setOptions] = useState<EventsFilterOptionsDto | null>(null);
    const [events, setEvents] = useState<EventDto[]>([]);
    const [eventFilters, setEventFilters] = useState<EventFilters>(new EventFilters({}));
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();


    useEffect(() => {
        async function loadData() {
            const eventFilters = await createEventFilters();

            setIsWaitingFetch(true);
            setOptions(null);
            setEvents([]);
            try {
                const fetchEventsFilterOptionsDto = await EventsListService.fetchEventsFilterOptions();
                console.log('fetchMoviesListResponseDto', fetchEventsFilterOptionsDto)
                setOptions(fetchEventsFilterOptionsDto.options);
            } catch (e) {
                console.error(e);
                enqueueSnackbar('Αποτυχημένη εύρεση επιλογών φίλτρων', { variant: 'error' });
            }
            try {
                const fetchEventsFilteredRequestDto = new FetchEventsFilteredRequestDto({ ...eventFilters });
                console.log('fetchEventsFilteredRequestDto', fetchEventsFilteredRequestDto)
                const fetchEventsFilteredResponseDto = await EventsListService.fetchEventsFiltered(fetchEventsFilteredRequestDto);
                console.log('fetchEventsFilteredResponseDto', fetchEventsFilteredResponseDto)
                setEvents(fetchEventsFilteredResponseDto.events);
                setIsWaitingFetch(false);
            } catch (e) {
                console.error(e);
                enqueueSnackbar('Αποτυχημένη εύρεση επιλογών φίλτρων', { variant: 'error' });
                setIsWaitingFetch(false);
            }
        }

        async function createEventFilters(): Promise<EventFilters> {
            console.log('searchParams', searchParams)
            const eventFilters: EventFilters = new EventFilters({});
            const movieIdStr = searchParams.get('movieId');
            eventFilters.movieId = movieIdStr ? parseInt(movieIdStr) : null;
            const providerIdStr = searchParams.get('providerId');
            eventFilters.providerId = providerIdStr ? parseInt(providerIdStr) : null;
            const fromDateStr = searchParams.get('fromDate');
            eventFilters.fromDate = fromDateStr ? new Date(fromDateStr) : currentDate;
            if (eventFilters.fromDate < currentDate) {
                eventFilters.fromDate = currentDate;
            }
            const toDateStr = searchParams.get('toDate');
            eventFilters.toDate = toDateStr ? new Date(toDateStr) : null;
            if (eventFilters.toDate && eventFilters.toDate < currentDate) {
                eventFilters.toDate = currentDate;
            }

            console.log('eventFilters', eventFilters)
            setEventFilters(eventFilters);
            return eventFilters;
        }

        loadData();
    }, [location.key])

    function movieIdChanged(event: SelectChangeEvent<number | null>) {
        const movieId = (event.target.value && typeof event.target.value === 'number') ? event.target.value : null;
        eventFilters.movieId = movieId;
        setEventFilters({ ...eventFilters, movieId: movieId });
        navigate(createSearchParams())
    }

    function providerIdChanged(event: SelectChangeEvent<number | null>) {
        const providerId = (event.target.value && typeof event.target.value === 'number') ? event.target.value : null;
        eventFilters.providerId = providerId;
        setEventFilters({ ...eventFilters, providerId: providerId });
        navigate(createSearchParams())
    }

    function fromDateChanged(newValue: Date | null) {
        eventFilters.fromDate = newValue;
        setEventFilters({ ...eventFilters, fromDate: newValue });
        navigate(createSearchParams())
    }

    function toDateChanged(newValue: Date | null) {
        eventFilters.toDate = newValue;
        setEventFilters({ ...eventFilters, toDate: newValue });
        navigate(createSearchParams())
    }

    function createSearchParams(): string {
        let searchParams = '';
        let isFirst = true;

        if (eventFilters.movieId != null && eventFilters.movieId !== 0) {
            searchParams += isFirst ? '?' : '&';
            searchParams += `movieId=${eventFilters.movieId}`
            isFirst = false;
        }
        if (eventFilters.providerId != null && eventFilters.providerId !== 0) {
            searchParams += isFirst ? '?' : '&';
            searchParams += `providerId=${eventFilters.providerId}`
            isFirst = false;
        }
        if (eventFilters.fromDate) {
            searchParams += isFirst ? '?' : '&';
            searchParams += `fromDate=${eventFilters.fromDate.toISOString()}`
            isFirst = false;
        }
        if (eventFilters.toDate) {
            searchParams += isFirst ? '?' : '&';
            searchParams += `toDate=${eventFilters.toDate.toISOString()}`
            isFirst = false;
        }


        return searchParams
    }

    return (
        <Box style={{ width: '100%', height: '100%' }}>
            <ScrollToTopOnMount />
            {options && events
                ? (
                    <React.Fragment>
                        <Card >
                            <CardContent>
                                <Typography gutterBottom variant="h4" component="div">
                                    Φίλτρα
                                </Typography>
                                <Grid container spacing={2} sx={{ padding: 1 }}>
                                    <Grid item>
                                        <FormControl fullWidth sx={{ minWidth: 140 }}>
                                            <InputLabel id="movieRef-select-label-id">Ταινία</InputLabel>
                                            <Select labelId="movieRef-select-label-id"
                                                value={eventFilters.movieId ? eventFilters.movieId : 0}
                                                label="Ταινία"
                                                onChange={(e) => movieIdChanged(e)}
                                            >
                                                {options.moviesRefs.map((movieRef, index) => (
                                                    <MenuItem key={index} value={movieRef.value}>{movieRef.label}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item>
                                        <FormControl fullWidth sx={{ minWidth: 140 }}>
                                            <InputLabel id="providerRef-select-label-id">Κατάστημα</InputLabel>
                                            <Select labelId="providerRef-select-label-id"
                                                value={eventFilters.providerId ? eventFilters.providerId : 0}
                                                label="Κατάστημα"
                                                onChange={(e) => providerIdChanged(e)}
                                            >
                                                {options.providersRefs.map((providerRef, index) => (
                                                    <MenuItem key={index} value={providerRef.value}>{providerRef.label}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item>
                                        <DatePicker
                                            minDate={currentDate}
                                            label="Από"
                                            value={eventFilters.fromDate}
                                            onChange={fromDateChanged}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Grid>

                                    <Grid item>
                                        <DatePicker
                                            minDate={currentDate}
                                            label="Μέχρι"
                                            value={eventFilters.toDate}
                                            onChange={toDateChanged}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        <br />

                        <Card >
                            <CardContent>
                                <Typography gutterBottom variant="h4" component="div">
                                    Προβολές
                                </Typography>

                                <EventsTableComponent events={events}></EventsTableComponent>
                            </CardContent>
                        </Card>
                    </React.Fragment>
                )
                : (
                    <CircularProgress />
                )}

        </Box >
    );
}
