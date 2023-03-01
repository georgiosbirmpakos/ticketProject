import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { LabelValue } from '../../../../modules/core/label-value';
import { AdminEventsService } from '../admin-events-service';
import { EventDto } from '../../../../modules/event/dtos/event-dto';
import { EventOptionsDto } from '../../../../modules/event/dtos/event-options-dto';
import { CreateEventRequestDto } from '../dtos/create-event-dto';
import { DateTimePicker } from '@mui/x-date-pickers';
import { MovieListItemDto } from '../../../../modules/movie/dtos/movie-list-item-dto';

export interface EventDialogCreateComponentProps {
    open: boolean;
    onCancel?: ((event: any) => void) | undefined;
    afterAdd: (event: any) => void;
}

export default function EventDialogCreateComponent(props: EventDialogCreateComponentProps) {
    const [event, setEvent] = useState<EventDto>(new EventDto({
        name: '',
        description: '',
        eventPrice: 0,
        tickets: [],
    }));
    const [options, setOptions] = useState<EventOptionsDto | null>(null);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        async function loadData() {
            try {
                const fetchEventOptionsResponseDto = await AdminEventsService.fetchEventOptions();
                setOptions(fetchEventOptionsResponseDto.options);
            } catch (e) {
                console.error(e);
                enqueueSnackbar('Αποτυχημένη εύρεση Επιλογών προβολής', { variant: 'error' })
            }
        }

        loadData();
    }, [])

    async function addClicked(e: any) {
        const createEventRequestDto: CreateEventRequestDto = new CreateEventRequestDto();
        createEventRequestDto.event = event;
        try {
            const response = await AdminEventsService.createEvent(createEventRequestDto);
            enqueueSnackbar('Επιτυχής δημιουργία Προβολής', { variant: 'success' })
            props.afterAdd(e);
        } catch (e) {
            console.error(e);
            enqueueSnackbar('Αποτυχημένη δημιουργία Προβολής', { variant: 'error' })
        }
    }

    return (
        <Dialog fullWidth={true} maxWidth={false} onClose={props.onCancel} open={props.open}>
            <DialogTitle id="alert-dialog-title">
                Προσθήκη Προβολής
            </DialogTitle>
            <DialogContent>
                {event && options && (
                    <form>
                        <Grid container spacing={2} sx={{ padding: 1 }}>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <FormControl fullWidth sx={{ minWidth: 140 }}>
                                    <InputLabel id="movieRef-select-label-id">Ταινία</InputLabel>
                                    <Select labelId="movieRef-select-label-id"
                                        value={event.movieRef ? JSON.stringify(event.movieRef) : ''}
                                        label="Κατάστημα"
                                        onChange={(e) => setEvent({ ...event, movieRef: MovieListItemDto.fromObj(e.target.value ? JSON.parse(e.target.value) : '') })}
                                    >
                                        {options.moviesRefs.map((movieRef, index) => (
                                            <MenuItem key={index} value={JSON.stringify(movieRef)}>{movieRef.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <FormControl fullWidth sx={{ minWidth: 140 }}>
                                    <InputLabel id="hallRef-select-label-id">Κατάστημα</InputLabel>
                                    <Select labelId="hallRef-select-label-id"
                                        value={event.hallRef ? JSON.stringify(event.hallRef) : ''}
                                        label="Κατάστημα"
                                        onChange={(e) => setEvent({ ...event, hallRef: LabelValue.fromObj<number>(e.target.value ? JSON.parse(e.target.value) : '') })}
                                    >
                                        {options.hallsRefs.map((hallRef, index) => (
                                            <MenuItem key={index} value={JSON.stringify(hallRef)}>{hallRef.label}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <TextField label="Όνομα" value={event.name} onChange={(e) => setEvent({ ...event, name: e.target.value })} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <TextField type="number" label="Τιμή Εισιτηρίου" value={event.eventPrice} onChange={(e) => setEvent({ ...event, eventPrice: e.target.value ? parseInt(e.target.value) : 0 })} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <DateTimePicker
                                    label="Ημερομηνία"
                                    value={event.eventDatetime ? event.eventDatetime : new Date()}
                                    onChange={(newValue) => setEvent({ ...event, eventDatetime: newValue })}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <TextField multiline label="Περιγραφή" value={event.description} onChange={(e) => setEvent({ ...event, description: e.target.value })} />
                            </Grid>
                        </Grid>
                    </form>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onCancel}>Ακύρωση</Button>
                <Button onClick={addClicked} autoFocus>
                    Προσθήκη
                </Button>
            </DialogActions>

        </Dialog >
    )
}
