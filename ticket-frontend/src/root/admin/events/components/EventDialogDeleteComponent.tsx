
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useSnackbar } from 'notistack';
import { AdminEventsService } from '../admin-events-service';
import { EventDto } from '../../../../modules/event/dtos/event-dto';

export interface EventDialogDeleteComponentProps {
    event: EventDto;
    open: boolean;
    onCancel?: ((event: any) => void) | undefined;
    afterDelete: (event: any) => void;
}

export default function EventDialogDeleteComponent(props: EventDialogDeleteComponentProps) {
    const { enqueueSnackbar } = useSnackbar();


    async function deleteClicked(e: any) {
        try {
            const response = await AdminEventsService.deleteEvent(props.event.eventId);
            enqueueSnackbar('Επιτυχής διαγραφή Προβολής', { variant: 'success' })
            props.afterDelete(e);
        } catch (e) {
            console.error(e);
            enqueueSnackbar('Αποτυχημένη διαγραφή Προβολής', { variant: 'error' })
        }
    }

    return (
        <Dialog fullWidth={true} maxWidth={false} onClose={props.onCancel} open={props.open}>
            <DialogTitle id="alert-dialog-title">
                Διαγραφή Προβολής
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Σίγουρα θέλετε να διαγράψετε την Προβολή {props.event.name}?
                </DialogContentText>

            </DialogContent>
            <DialogActions>
                <Button onClick={props.onCancel}>Ακύρωση</Button>
                <Button onClick={deleteClicked} autoFocus>
                    Διαγραφή
                </Button>
            </DialogActions>

        </Dialog>
    )
}
