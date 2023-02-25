import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';


export interface LogoutConfirmationDialogComponentProps {
    open: boolean;
    onCancel?: ((event: any) => void) | undefined;
    onConfirm: (event: any) => void;
}

export default function LogoutConfirmationDialogComponent(props: LogoutConfirmationDialogComponentProps) {

    return (
        <Dialog fullWidth={true} maxWidth={false} onClose={props.onCancel} open={props.open}>
            <DialogTitle id="alert-dialog-title">
                Αποσύνδεση
            </DialogTitle>
            <DialogContent>
                Είστε σίγουρος ότι θέλετε να αποσυνδεθείτε?
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onCancel}>Ακύρωση</Button>
                <Button onClick={props.onConfirm} autoFocus>
                    Αποσύνδεση
                </Button>
            </DialogActions>

        </Dialog >
    )
}
