import Button from '@mui/material/Button';
import { MovieDto } from '../../../../modules/movie/dtos/movie-dto';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { AdminMoviesService } from '../admin-movies-service';
import { useSnackbar } from 'notistack';

export interface MovieDialogDeleteComponentProps {
    movie: MovieDto;
    open: boolean;
    onCancel?: ((event: any) => void) | undefined;
    afterDelete: (event: any) => void;
}

export default function MovieDialogDeleteComponent(props: MovieDialogDeleteComponentProps) {
    const { enqueueSnackbar } = useSnackbar();


    async function deleteClicked(e: any) {
        try {
            const response = await AdminMoviesService.deleteMovie(props.movie.movieId);
            enqueueSnackbar('Επιτυχής διαγραφή Ταινίας', { variant: 'success' })
            props.afterDelete(e);
        } catch (e) {
            console.error(e);
            enqueueSnackbar('Αποτυχημένη δημιουργία Ταινίας', { variant: 'error' })
        }
    }

    return (
        <Dialog fullWidth={true} maxWidth={false} onClose={props.onCancel} open={props.open}>
            <DialogTitle id="alert-dialog-title">
                Διαγραφή Ταινίας
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
