import { Dialog, DialogTitle, DialogContent, Grid, FormControl, InputLabel, Select, MenuItem, TextField, DialogActions, Button } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import { LabelValue } from '../../../modules/core/label-value';
import { EventDto } from '../../../modules/event/dtos/event-dto';
import { EventOptionsDto } from '../../../modules/event/dtos/event-options-dto';
import { AdminEventsService } from '../../admin/events/admin-events-service';
import { CreateEventRequestDto } from '../../admin/events/dtos/create-event-dto';


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
