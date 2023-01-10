
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'
import { Modal, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, FormControl, FormLabel, Grid } from '@mui/material';
import { Input } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { CreateMovieRequestDto } from '../../admin-shared/dtos/create-movie-dto';
import { ProviderDto } from '../../../../modules/provider/provider-dto';
import { AdminProvidersService } from '../admin-providers-service';
import { CreateProviderRequestDto } from '../dtos/create-provider-dto';
import { UpdateProviderRequestDto } from '../dtos/update-provider-dto';

export interface MovieDialogCreateProps {
  providerId: number;
  open: boolean;
  onCancel?: ((event: any) => void) | undefined;
  afterUpdate: (event: any) => void;
}

export default function MovieDialogCreate(props: MovieDialogCreateProps) {
  const [provider, setProvider] = useState<ProviderDto | null>(null);

  useEffect(() => {
    async function loadData() {
      const fetchProvidersListResponseDto = await AdminProvidersService.fetchProviderDetails(props.providerId);
      console.log('fetchProvidersListResponseDto', fetchProvidersListResponseDto)
      setProvider(fetchProvidersListResponseDto.provider);
    }

    loadData();
  }, [props.providerId])



  async function updateClicked(e: any) {
    const updateProviderRequestDto: UpdateProviderRequestDto = new UpdateProviderRequestDto();
    updateProviderRequestDto.provider = provider;
    const response = await AdminProvidersService.updateProvider(updateProviderRequestDto);
    props.afterUpdate(e);
  }

  return (
    <Dialog onClose={props.onCancel} open={props.open}>
      <DialogTitle id="alert-dialog-title">
        Προσθήκη Καταστήματος
      </DialogTitle>
      <DialogContent>
        {provider && (
          <form>
            <Grid container spacing={2}>
              <Grid item>
                <TextField label="Όνομα" value={provider.name} onChange={(e) => setProvider({ ...provider, name: e.target.value })} />
              </Grid>
              <Grid item>
                <TextField label="Διεύθυνση" value={provider.address} onChange={(e) => setProvider({ ...provider, address: e.target.value })} />
              </Grid>
              <Grid item>
                <TextField label="Τηλέφωνο" value={provider.phone} onChange={(e) => setProvider({ ...provider, phone: e.target.value })} />
              </Grid>
              <Grid item>
                <TextField label="Περιγραφή" value={provider.description} onChange={(e) => setProvider({ ...provider, description: e.target.value })} />
              </Grid>
            </Grid>
          </form>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onCancel}>Ακύρωση</Button>
        <Button onClick={updateClicked} autoFocus>
          Αποθήκευση
        </Button>
      </DialogActions>

    </Dialog>
  )
}
