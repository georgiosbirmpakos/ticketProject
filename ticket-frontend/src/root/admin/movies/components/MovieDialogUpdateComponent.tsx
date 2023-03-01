import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { MovieDto } from '../../../../modules/movie/dtos/movie-dto';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControl, FormLabel, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { AdminMoviesService } from '../admin-movies-service';
import { FileUtils } from '../../../../modules/core/file-utils';
import { UpdateMovieRequestDto } from '../dtos/update-movie-dto';
import { useSnackbar } from 'notistack';

export interface MovieDialogCreateComponentProps {
    open: boolean;
    movieId: number;
    readonly: boolean;
    onCancel?: ((event: any) => void) | undefined;
    afterUpdate: (event: any) => void;
}

export default function MovieDialogCreateComponent(props: MovieDialogCreateComponentProps) {
    const [movie, setMovie] = useState<MovieDto | null>(null);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        async function loadData() {
            try {
                const fetchMovieDetailsResponseDto = await AdminMoviesService.fetchMovieDetails(props.movieId);
                console.log('fetchMovieDetailsResponseDto', fetchMovieDetailsResponseDto)
                setMovie(fetchMovieDetailsResponseDto.movie);
            } catch (e) {
                console.error(e);
                enqueueSnackbar('Αποτυχημένη εύρεση ταινίας', { variant: 'error' })
            }
        }

        loadData();
    }, []);

    async function fileChanged(e: any) {
        if (!movie) {
            return;
        }
        const file = e.target.files[0] as File | null | undefined;
        if (file) {
            try {
                const fileToBase64Result = await FileUtils.fileToBase64(file);
                console.log('fileToBase64Result', fileToBase64Result)
                setMovie({
                    ...movie,
                    imageName: fileToBase64Result.fileName,
                    image: fileToBase64Result.file,
                    imageMimePrefix: fileToBase64Result.fileMimePrefix
                });
            } catch (e) {
                console.error(e);
            }
        } else {
            setMovie({
                ...movie,
                imageName: '',
                image: '',
                imageMimePrefix: ''
            });
        }
    }

    async function updateClicked(e: any) {
        const updateMovieRequestDto: UpdateMovieRequestDto = new UpdateMovieRequestDto();
        updateMovieRequestDto.movie = movie;
        try {
            const response = await AdminMoviesService.updateMovie(updateMovieRequestDto);
            enqueueSnackbar('Επιτυχής αποθήκευση Ταινίας', { variant: 'success' })
            props.afterUpdate(e);
        } catch (e) {
            console.error(e);
            enqueueSnackbar('Αποτυχημένη αποθήκευση Ταινίας', { variant: 'error' })
        }
    }

    return (
        <Dialog fullWidth={true} maxWidth={false} onClose={props.onCancel} open={props.open}>
            <DialogTitle id="alert-dialog-title">
                Επεξεργασία Ταινίας
            </DialogTitle>
            <DialogContent>
                {movie && (
                    <form>
                        <Grid container spacing={2} sx={{ padding: 1 }}>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <TextField disabled={props.readonly} label="Όνομα" value={movie.name} onChange={(e) => setMovie({ ...movie, name: e.target.value })} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <TextField disabled={props.readonly} label="Σκηνοθεσία" value={movie.directors} onChange={(e) => setMovie({ ...movie, directors: e.target.value })} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <TextField disabled={props.readonly} label="Σενάριο" value={movie.script} onChange={(e) => setMovie({ ...movie, script: e.target.value })} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <TextField disabled={props.readonly} label="Ηθοποιοί" value={movie.actors} onChange={(e) => setMovie({ ...movie, actors: e.target.value })} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <TextField disabled={props.readonly} label="Καταλληλότητα" value={movie.appropriateness} onChange={(e) => setMovie({ ...movie, appropriateness: e.target.value })} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <TextField disabled={props.readonly} type='number' label="Έτος" value={movie.year} onChange={(e) => setMovie({ ...movie, year: e.target.value ? parseInt(e.target.value) : 0 })} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <TextField disabled={props.readonly} type='number' label="Διάρκεια" value={movie.duration} onChange={(e) => setMovie({ ...movie, duration: e.target.value ? parseInt(e.target.value) : 0 })} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <TextField disabled={props.readonly} label="Trailer" value={movie.trailerSrcUrl} onChange={(e) => setMovie({ ...movie, trailerSrcUrl: e.target.value })} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <TextField disabled={props.readonly} multiline label="Περιγραφή" value={movie.description} onChange={(e) => setMovie({ ...movie, description: e.target.value })} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <FormControl>
                                    <FormLabel id="demo-radio-buttons-group-label">Εικόνα</FormLabel>
                                    <input disabled={props.readonly} type="file"
                                        onChange={(e) => fileChanged(e)} />
                                </FormControl>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    width="200"
                                    src={`${movie.imageMimePrefix},${movie.image}`}
                                />
                            </Grid>
                        </Grid>
                    </form>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onCancel}>Ακύρωση</Button>
                {!props.readonly && (
                    <Button onClick={updateClicked} autoFocus>
                        Αποθήκευση
                    </Button>
                )}
            </DialogActions>

        </Dialog>
    )
}