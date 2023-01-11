
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { AdminProvidersService } from '../admin-providers-service';
import { ProviderListItemDto } from '../../../../modules/provider/provider-list-item-dto';

export interface ProviderDialogDeleteComponentProps {
  provider: ProviderListItemDto;
  open: boolean;
  onCancel?: ((event: any) => void) | undefined;
  afterDelete: (event: any) => void;
}

export default function ProviderDialogDeleteComponent(props: ProviderDialogDeleteComponentProps) {


  async function deleteClicked(e: any) {
    const response = await AdminProvidersService.deleteProvider(props.provider.providerId);
    props.afterDelete(e);
  }

  return (
    <Dialog onClose={props.onCancel} open={props.open}>
      <DialogTitle id="alert-dialog-title">
        Προσθήκη Ταινίας
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Σίγουρα θέλετε να διαγράψετε την ταινία {props.provider.name}?
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
