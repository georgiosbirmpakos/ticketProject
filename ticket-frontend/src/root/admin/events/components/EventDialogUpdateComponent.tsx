import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { LabelValue } from '../../../../modules/core/label-value';
import { AdminEventsService } from '../admin-events-service';
import { EventDto } from '../../../../modules/event/dtos/event-dto';
import { EventOptionsDto } from '../../../../modules/event/dtos/event-options-dto';
import { DateTimePicker } from '@mui/x-date-pickers';
import { UpdateEventRequestDto } from '../dtos/update-event-dto';

export interface EventDialogUpdateComponentProps {
    open: boolean;
    readonly: boolean;
    eventId: number;
    onCancel?: ((event: any) => void) | undefined;
    afterUpdate: (event: any) => void;
}

export default function EventDialogUpdateComponent(props: EventDialogUpdateComponentProps) {
    const [event, setEvent] = useState<EventDto | null>(null);
    const [options, setOptions] = useState<EventOptionsDto | null>(null);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        async function loadData() {
            try {
                const fetchHallsOptionsResponseDto = await AdminEventsService.fetchEventOptions();
                const fetchHallDetailsResponseDto = await AdminEventsService.fetchEventDetails(props.eventId);
                setOptions(fetchHallsOptionsResponseDto.options);
                setEvent(fetchHallDetailsResponseDto.event);
            } catch (e) {
                console.error(e);
                enqueueSnackbar('Αποτυχημένη εύρεση Επιλογών αίθουσας', { variant: 'error' })
            }
        }

        loadData();
    }, [])

    async function updateClicked(e: any) {
        const updateEventRequestDto: UpdateEventRequestDto = new UpdateEventRequestDto();
        updateEventRequestDto.event = event;
        try {
            const response = await AdminEventsService.updateEvent(updateEventRequestDto);
            enqueueSnackbar('Επιτυχής αποθήκευση Αίθουσας', { variant: 'success' })
            props.afterUpdate(e);
        } catch (e) {
            console.error(e);
            enqueueSnackbar('Αποτυχημένη αποθήκευση Αίθουσας', { variant: 'error' })
        }
    }

    return (
        <Dialog fullWidth={true} maxWidth={false} onClose={props.onCancel} open={props.open}>
            <DialogTitle id="alert-dialog-title">
                Προσθήκη Αίθουσας
            </DialogTitle>
            <DialogContent>
                {event && options && (
                    <form>
                        <Grid container spacing={2} sx={{ padding: 1 }}>
                            <Grid item>
                                <FormControl fullWidth sx={{ minWidth: 140 }}>
                                    <InputLabel id="movieRef-select-label-id">Ταινία</InputLabel>
                                    <Select disabled={props.readonly} labelId="movieRef-select-label-id"
                                        value={event.movieRef ? JSON.stringify(event.movieRef) : ''}
                                        label="Κατάστημα"
                                        onChange={(e) => setEvent({ ...event, movieRef: LabelValue.fromObj<number>(e.target.value ? JSON.parse(e.target.value) : '') })}
                                    >
                                        {options.moviesRefs.map((movieRef, index) => (
                                            <MenuItem key={index} value={JSON.stringify(movieRef)}>{movieRef.label}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item>
                                <FormControl fullWidth sx={{ minWidth: 140 }}>
                                    <InputLabel id="hallRef-select-label-id">Κατάστημα</InputLabel>
                                    <Select disabled={props.readonly} labelId="hallRef-select-label-id"
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

                            <Grid item>
                                <TextField disabled={props.readonly} label="Όνομα" value={event.name} onChange={(e) => setEvent({ ...event, name: e.target.value })} />
                            </Grid>
                            <Grid item>
                                <TextField disabled={props.readonly} type="number" label="Τιμή Εισιτηρίου" value={event.eventPrice} onChange={(e) => setEvent({ ...event, eventPrice: e.target.value ? parseInt(e.target.value) : 0 })} />
                            </Grid>
                            <Grid item>
                                <DateTimePicker disabled={props.readonly}
                                    label="Ημερομηνία"
                                    value={event.eventDatetime ? event.eventDatetime : new Date()}
                                    onChange={(newValue) => setEvent({ ...event, eventDatetime: newValue })}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Grid>
                            <Grid item>
                                <TextField disabled={props.readonly} label="Περιγραφή" value={event.description} onChange={(e) => setEvent({ ...event, description: e.target.value })} />
                            </Grid>
                        </Grid>
                    </form>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onCancel}>Ακύρωση</Button>
                {!props.readonly && (
                    <Button onClick={updateClicked} autoFocus>
                        Αποθήκευση
                    </Button>
                )}
            </DialogActions>

        </Dialog >
    )
}