
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { AdminProvidersService } from '../admin-providers-service';
import { ProviderListItemDto } from '../../../../modules/provider/provider-list-item-dto';
import { useSnackbar } from 'notistack';

export interface ProviderDialogDeleteComponentProps {
    provider: ProviderListItemDto;
    open: boolean;
    onCancel?: ((event: any) => void) | undefined;
    afterDelete: (event: any) => void;
}

export default function ProviderDialogDeleteComponent(props: ProviderDialogDeleteComponentProps) {
    const { enqueueSnackbar } = useSnackbar();


    async function deleteClicked(e: any) {
        try {
            const response = await AdminProvidersService.deleteProvider(props.provider.providerId);
            enqueueSnackbar('Επιτυχής διαγραφή Καταστήματος', { variant: 'success' })
            props.afterDelete(e);
        } catch (e) {
            console.error(e);
            enqueueSnackbar('Αποτυχημένη διαγραφή Καταστήματος', { variant: 'error' })
        }
    }

    return (
        <Dialog onClose={props.onCancel} open={props.open}>
            <DialogTitle id="alert-dialog-title">
                Διαγραφή Καταστήματος
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Σίγουρα θέλετε να διαγράψετε το κατάστημα {props.provider.name}?
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
