import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'
import { MovieModel } from '../../../shared/models/movie-model';
import { Modal, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, FormControl, FormLabel } from '@mui/material';
import { Input } from '@mui/icons-material';
import { useState } from 'react';
import { CreateMovieRequestDto } from '../../admin-shared/dtos/create-movie-dto';
import { AdminService } from '../../admin-shared/admin-service';

export interface MovieDialogDeleteProps {
  movie: MovieModel;
  open: boolean;
  onCancel?: ((event: any) => void) | undefined;
  afterDelete: (event: any) => void;
}

export default function MovieDialogDelete(props: MovieDialogDeleteProps) {


  async function deleteClicked(e: any) {
    const response = await AdminService.deleteMovie(props.movie.movieId);
    props.afterDelete(e);
  }

  return (
    <Dialog onClose={props.onCancel} open={props.open}>
      <DialogTitle id="alert-dialog-title">
        Προσθήκη Ταινίας
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Σίγουρα θέλετε να διαγράψετε την ταινία {props.movie.name}?
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
