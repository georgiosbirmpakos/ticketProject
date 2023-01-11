import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'
import { MovieDto } from '../../../../modules/movie/movie-dto';
import { Modal, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, FormControl, FormLabel, Grid } from '@mui/material';
import { Input } from '@mui/icons-material';
import { useState } from 'react';
import { CreateMovieRequestDto } from '../../movies/dtos/create-movie-dto';
import { ProviderDto } from '../../../../modules/provider/provider-dto';
import { AdminProvidersService } from '../admin-providers-service';
import { CreateProviderRequestDto } from '../dtos/create-provider-dto';

export interface MovieDialogCreateComponentProps {
  open: boolean;
  onCancel?: ((event: any) => void) | undefined;
  afterAdd: (event: any) => void;
}

export default function MovieDialogCreateComponent(props: MovieDialogCreateComponentProps) {
  const [provider, setProvider] = useState<ProviderDto>(new ProviderDto());


  const onClick = (id: string) => {
    console.log({ id })
  }

  function setSelectedFile(target: any) {
    console.log('target', target)
  }

  async function addClicked(e: any) {
    const createProviderRequestDto: CreateProviderRequestDto = new CreateProviderRequestDto();
    createProviderRequestDto.provider = provider;
    const response = await AdminProvidersService.createProvider(createProviderRequestDto);
    props.afterAdd(e);
  }

  return (
    <Dialog onClose={props.onCancel} open={props.open}>
      <DialogTitle id="alert-dialog-title">
        Προσθήκη Καταστήματος
      </DialogTitle>
      <DialogContent>
        {/* <DialogContentText id="alert-dialog-description">
        </DialogContentText> */}
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
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onCancel}>Ακύρωση</Button>
        <Button onClick={addClicked} autoFocus>
          Προσθήκη
        </Button>
      </DialogActions>

    </Dialog>
  )
}
