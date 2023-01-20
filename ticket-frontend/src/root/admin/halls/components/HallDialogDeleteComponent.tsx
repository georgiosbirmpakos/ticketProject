
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useSnackbar } from 'notistack';
import { HallListItemDto } from '../../../../modules/hall/hall-list-item-dto';
import { AdminHallsService } from '../admin-halls-service';

export interface HallDialogDeleteComponentProps {
    hall: HallListItemDto;
    open: boolean;
    onCancel?: ((event: any) => void) | undefined;
    afterDelete: (event: any) => void;
}

export default function HallDialogDeleteComponent(props: HallDialogDeleteComponentProps) {
    const { enqueueSnackbar } = useSnackbar();


    async function deleteClicked(e: any) {
        try {
            const response = await AdminHallsService.deleteHall(props.hall.hallId);
            enqueueSnackbar('Επιτυχής διαγραφή Αίθουσας', { variant: 'success' })
            props.afterDelete(e);
        } catch (e) {
            console.error(e);
            enqueueSnackbar('Αποτυχημένη διαγραφή Αίθουσας', { variant: 'error' })
        }
    }

    return (
        <Dialog fullWidth={true} maxWidth={false} onClose={props.onCancel} open={props.open}>
            <DialogTitle id="alert-dialog-title">
                Διαγραφή Αίθουσας
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Σίγουρα θέλετε να διαγράψετε την αίθουσα {props.hall.name}?
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
