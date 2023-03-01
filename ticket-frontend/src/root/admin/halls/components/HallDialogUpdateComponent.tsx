import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { HallDto } from '../../../../modules/hall/hall-dto';
import { AdminHallsService } from '../admin-halls-service';
import { LabelValue } from '../../../../modules/core/label-value';
import { HallOptionsDto } from '../../../../modules/hall/hall-options-dto';
import SeatsMapComponent from '../../../../modules/hall/components/SeatsMapComponent';
import { UpdateHallRequestDto } from '../dtos/update-hall-dto';

export interface HallDialogUpdateComponentProps {
    open: boolean;
    readonly: boolean;
    hallId: number;
    onCancel?: ((event: any) => void) | undefined;
    afterUpdate: (event: any) => void;
}

export default function HallDialogUpdateComponent(props: HallDialogUpdateComponentProps) {
    const [hall, setHall] = useState<HallDto | null>(null);
    const [options, setOptions] = useState<HallOptionsDto | null>(null);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        async function loadData() {
            try {
                const fetchHallsOptionsResponseDto = await AdminHallsService.fetchHallOptions();
                const fetchHallDetailsResponseDto = await AdminHallsService.fetchHallDetails(props.hallId);
                setOptions(fetchHallsOptionsResponseDto.options);
                setHall(fetchHallDetailsResponseDto.hall);
            } catch (e) {
                console.error(e);
                enqueueSnackbar('Αποτυχημένη εύρεση Επιλογών αίθουσας', { variant: 'error' })
            }
        }

        loadData();
    }, [])

    async function updateClicked(e: any) {
        const updateHallRequestDto: UpdateHallRequestDto = new UpdateHallRequestDto();
        updateHallRequestDto.hall = hall;
        try {
            const response = await AdminHallsService.updateHall(updateHallRequestDto);
            enqueueSnackbar('Επιτυχής αποθήκευση Αίθουσας', { variant: 'success' })
            props.afterUpdate(e);
        } catch (e) {
            console.error(e);
            enqueueSnackbar('Αποτυχημένη αποθήκευση Αίθουσας', { variant: 'error' })
        }
    }

    return (
        <Dialog fullWidth={true} maxWidth={false} onClose={props.onCancel} open={props.open}>
            <DialogTitle id="alert-dialog-title">
                Επεξεργασία Αίθουσας
            </DialogTitle>
            <DialogContent>
                {hall && options && (
                    <form>
                        <Grid container spacing={2} sx={{ padding: 1 }}>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <FormControl fullWidth sx={{ minWidth: 140 }}>
                                    <InputLabel id="providerref-select-label-id">Κατάστημα</InputLabel>
                                    <Select disabled={props.readonly} labelId="providerref-select-label-id"
                                        value={hall.providerRef ? JSON.stringify(hall.providerRef) : ''}
                                        label="Κατάστημα"
                                        onChange={(e) => setHall({ ...hall, providerRef: LabelValue.fromObj<number>(e.target.value ? JSON.parse(e.target.value) : '') })}
                                    >
                                        {options.providersRefs.map((providerRef, index) => (
                                            <MenuItem key={index} value={JSON.stringify(providerRef)}>{providerRef.label}</MenuItem>
                                        ))}
                                    </Select>

                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <TextField disabled={props.readonly} label="Όνομα" value={hall.name} onChange={(e) => setHall({ ...hall, name: e.target.value })} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <TextField disabled={true} type="number" label="Γραμμές Θέσεων" value={hall.seatsRows} onChange={(e) => setHall({ ...hall, seatsRows: e.target.value ? parseInt(e.target.value) : 0 })} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <TextField disabled={true} type="number" label="Στήλες Θέσεων" value={hall.seatsColumns} onChange={(e) => setHall({ ...hall, seatsColumns: e.target.value ? parseInt(e.target.value) : 0 })} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <TextField disabled={props.readonly} multiline label="Περιγραφή" value={hall.description} onChange={(e) => setHall({ ...hall, description: e.target.value })} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} justifyContent='center' sx={{ padding: 1 }}>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <SeatsMapComponent seatsRows={hall.seatsRows} seatsColumns={hall.seatsColumns}></SeatsMapComponent>
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

        </Dialog >
    )
}
