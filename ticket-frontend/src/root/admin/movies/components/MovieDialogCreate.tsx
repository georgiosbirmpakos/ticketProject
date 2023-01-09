import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'
import { MovieModel } from '../../../shared/models/movie-model';
import { Modal, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, FormControl, FormLabel, Grid } from '@mui/material';
import { Input } from '@mui/icons-material';
import { useState } from 'react';
import { CreateMovieRequestDto } from '../../admin-shared/dtos/create-movie-dto';
import { AdminService } from '../../admin-shared/admin-service';

export interface MovieDialogCreateProps {
  open: boolean;
  onCancel?: ((event: any) => void) | undefined;
  afterAdd: (event: any) => void;
}

export default function MovieDialogCreate(props: MovieDialogCreateProps) {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [directors, setDirectors] = useState<string>('');
  const [script, setScript] = useState<string>('');
  const [actors, setActors] = useState<string>('');
  const [appropriateness, setAppropriateness] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);

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
    createMovieRequestDto.directors = directors;
    createMovieRequestDto.script = script;
    createMovieRequestDto.actors = actors;
    createMovieRequestDto.appropriateness = appropriateness;
    createMovieRequestDto.duration = duration;
    const response = await AdminService.createMovie(createMovieRequestDto);
    props.afterAdd(e);
  }

  return (
    <Dialog onClose={props.onCancel} open={props.open}>
      <DialogTitle id="alert-dialog-title">
        Προσθήκη Ταινίας
      </DialogTitle>
      <DialogContent>
        {/* <DialogContentText id="alert-dialog-description">
        </DialogContentText> */}
        <form>
          <Grid container spacing={2}>
            <Grid item>
              <TextField label="Όνομα" value={name} onChange={(e) => setName(e.target.value)} />
            </Grid>
            <Grid item>
              <TextField label="Περιγραφή" value={description} onChange={(e) => setDescription(e.target.value)} />
            </Grid>
            <Grid item>
              <TextField label="Σκηνοθεσία" value={directors} onChange={(e) => setDirectors(e.target.value)} />
            </Grid>
            <Grid item>
              <TextField label="Σενάριο" value={script} onChange={(e) => setScript(e.target.value)} />
            </Grid>
            <Grid item>
              <TextField label="Ηθοποιοί" value={actors} onChange={(e) => setActors(e.target.value)} />
            </Grid>
            <Grid item>
              <TextField label="Καταλληλότητα" value={appropriateness} onChange={(e) => setAppropriateness(e.target.value)} />
            </Grid>
            <Grid item>
              <TextField type='number' label="Διάρκεια" value={duration} onChange={(e) => setDuration(e.target.value ? parseInt(e.target.value) : 0)} />
            </Grid>
            <Grid item>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Εικόνα</FormLabel>
                <input type="file"
                  onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} />
              </FormControl>
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
