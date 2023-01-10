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
import { AdminMoviesService } from '../admin-movies-service';

export interface MovieDialogUpdateProps {
  open: boolean;
  onCancel?: ((event: any) => void) | undefined;
  afterAdd: (event: any) => void;
}

export default function MovieDialogUpdate(props: MovieDialogUpdateProps) {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);

  const onClick = (id: string) => {
    console.log({ id })
  }

  function setSelectedFile(target: any) {
    console.log('target', target)
  }

  async function addClicked(e: any) {
    const createMovieRequestDto: CreateMovieRequestDto = new CreateMovieRequestDto();
    createMovieRequestDto.name = name;
    createMovieRequestDto.description = description;
    createMovieRequestDto.image = image ? image : null;
    const response = await AdminMoviesService.createMovie(createMovieRequestDto);
    props.afterAdd(e);
  }

  return (
    <Dialog onClose={props.onCancel} open={props.open}>
      <DialogTitle id="alert-dialog-title">
        Προσθήκη Ταινίας
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
        </DialogContentText>
        <form>
          <TextField label="Όνομα" value={name} onChange={(e) => setName(e.target.value)} />
          <TextField label="Περιγραφή" value={description} onChange={(e) => setDescription(e.target.value)} />
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Εικόνα</FormLabel>
            <input type="file"
              onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} />
          </FormControl>

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
