import { Box, Button, Grid } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { Add } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { AdminEventsService } from './admin-events-service';
import { EventDto } from '../../../modules/event/dtos/event-dto';
import EventsTableComponent from './components/EventsTableComponent';
import EventDialogCreateComponent from './components/EventDialogCreateComponent';
import EventDialogDeleteComponent from './components/EventDialogDeleteComponent';
import EventDialogUpdateComponent from './components/EventDialogUpdateComponent';

export default function AdminEventsPage() {
    const [events, setEvents] = useState<EventDto[]>([]);
    const [isDialogCreateOpen, setIsDialogCreateOpen] = useState<boolean>(false);
    const [isDialogUpdateOpen, setIsDialogUpdateOpen] = useState<boolean>(false);
    const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState<boolean>(false);
    const [selectedEvent, setSelectedEvent] = useState<EventDto | null>(null);
    const [readonly, setReadonly] = useState<boolean>(false);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        loadData();
    }, [])

    async function loadData() {
        setEvents([]);
        try {
            const FetchEventsListResponseDto = await AdminEventsService.fetchEventsList();
            setEvents(FetchEventsListResponseDto.events);
        } catch (e) {
            console.error(e);
            enqueueSnackbar('Αποτυχημένη εύρεση λίστας προβολών', { variant: 'error' })
        }
    }


    function createEventClicked() {
        setSelectedEvent(null);
        setIsDialogCreateOpen(true);
    }

    function viewProviderClicked(selectedEvent: EventDto) {
        setSelectedEvent(selectedEvent);
        setReadonly(true);
        setIsDialogUpdateOpen(true);
    }

    function updateProviderClicked(selectedEvent: EventDto) {
        setSelectedEvent(selectedEvent);
        setReadonly(false);
        setIsDialogUpdateOpen(true);
    }

    function deleteProviderClicked(selectedEvent: EventDto) {
        setSelectedEvent(selectedEvent);
        setIsDialogDeleteOpen(true);
    }

    async function afterAdd() {
        setIsDialogCreateOpen(false);
        await loadData();
    }

    async function afterUpdate() {
        setIsDialogUpdateOpen(false);
        await loadData();
    }


    async function afterDelete() {
        setIsDialogDeleteOpen(false);
        await loadData();
    }

    return (
        <Fragment>
            <Box style={{ width: '100%', height: '100%' }}>
                <Grid container direction="row" padding={2}
                    justifyContent="space-between"
                    alignItems="center">
                    <Grid item>
                    </Grid>
                    <Grid item>
                        <Button onClick={createEventClicked} variant="contained" startIcon={<Add />}>
                            ΔΗΜΙΟΥΡΓΙΑ ΠΡΟΒΟΛΗΣ
                        </Button>
                    </Grid>
                </Grid>

                <EventsTableComponent events={events}
                    onViewAction={(event) => viewProviderClicked(event)}
                    onEditAction={(event) => updateProviderClicked(event)}
                    onDeleteAction={(event) => deleteProviderClicked(event)} />

            </Box>
            {isDialogCreateOpen && (
                <EventDialogCreateComponent open={isDialogCreateOpen}
                    onCancel={() => setIsDialogCreateOpen(false)}
                    afterAdd={afterAdd} />
            )}
            {isDialogUpdateOpen && selectedEvent?.eventId && (
                <EventDialogUpdateComponent open={isDialogUpdateOpen}
                    readonly={readonly}
                    eventId={selectedEvent.eventId}
                    onCancel={() => setIsDialogUpdateOpen(false)}
                    afterUpdate={afterUpdate} />
            )}
            {isDialogDeleteOpen && selectedEvent?.eventId && (
                <EventDialogDeleteComponent open={isDialogDeleteOpen}
                    onCancel={() => setIsDialogDeleteOpen(false)}
                    afterDelete={afterDelete} event={selectedEvent} />
            )}
        </Fragment>
    );
}
