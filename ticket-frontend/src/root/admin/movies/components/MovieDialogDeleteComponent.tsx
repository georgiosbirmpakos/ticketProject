import Button from '@mui/material/Button';
import { MovieDto } from '../../../../modules/movie/movie-dto';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { AdminMoviesService } from '../admin-movies-service';

export interface MovieDialogDeleteComponentProps {
    movie: MovieDto;
    open: boolean;
    onCancel?: ((event: any) => void) | undefined;
    afterDelete: (event: any) => void;
}

export default function MovieDialogDeleteComponent(props: MovieDialogDeleteComponentProps) {


    async function deleteClicked(e: any) {
        const response = await AdminMoviesService.deleteMovie(props.movie.movieId);
        props.afterDelete(e);
    }

    return (
        <Dialog onClose={props.onCancel} open={props.open}>
            <DialogTitle id="alert-dialog-title">
                Διγραφή Ταινίας
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
