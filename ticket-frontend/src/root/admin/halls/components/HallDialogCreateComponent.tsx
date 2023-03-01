import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { HallDto } from '../../../../modules/hall/hall-dto';
import { CreateHallRequestDto } from '../dtos/create-hall-dto';
import { AdminHallsService } from '../admin-halls-service';
import { LabelValue } from '../../../../modules/core/label-value';
import { HallOptionsDto } from '../../../../modules/hall/hall-options-dto';
import SeatsMapComponent from '../../../../modules/hall/components/SeatsMapComponent';

export interface HallDialogCreateComponentProps {
    open: boolean;
    onCancel?: ((event: any) => void) | undefined;
    afterAdd: (event: any) => void;
}

export default function HallDialogCreateComponent(props: HallDialogCreateComponentProps) {
    const [hall, setHall] = useState<HallDto>(new HallDto());
    const [options, setOptions] = useState<HallOptionsDto | null>(null);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        async function loadData() {
            try {
                const fetchHallsOptionsResponseDto = await AdminHallsService.fetchHallOptions();
                setOptions(fetchHallsOptionsResponseDto.options);
            } catch (e) {
                console.error(e);
                enqueueSnackbar('Αποτυχημένη εύρεση Επιλογών αίθουσας', { variant: 'error' })
            }
        }

        loadData();
    }, [])

    async function addClicked(e: any) {
        const createHallRequestDto: CreateHallRequestDto = new CreateHallRequestDto();
        createHallRequestDto.hall = hall;
        try {
            const response = await AdminHallsService.createHall(createHallRequestDto);
            enqueueSnackbar('Επιτυχής δημιουργία Αίθουσας', { variant: 'success' })
            props.afterAdd(e);
        } catch (e) {
            console.error(e);
            enqueueSnackbar('Αποτυχημένη δημιουργία Αίθουσας', { variant: 'error' })
        }
    }

    return (
        <Dialog fullWidth={true} maxWidth={false} onClose={props.onCancel} open={props.open}>
            <DialogTitle id="alert-dialog-title">
                Προσθήκη Αίθουσας
            </DialogTitle>
            <DialogContent>
                {hall && options && (
                    <form>
                        <Grid container spacing={2} sx={{ padding: 1 }}>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <FormControl fullWidth sx={{ minWidth: 140 }}>
                                    <InputLabel id="providerref-select-label-id">Κατάστημα</InputLabel>
                                    <Select labelId="providerref-select-label-id"
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
                                <TextField label="Όνομα" value={hall.name} onChange={(e) => setHall({ ...hall, name: e.target.value })} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <TextField type="number" label="Γραμμές Θέσεων" value={hall.seatsRows} onChange={(e) => setHall({ ...hall, seatsRows: e.target.value ? parseInt(e.target.value) : 0 })} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <TextField type="number" label="Στήλες Θέσεων" value={hall.seatsColumns} onChange={(e) => setHall({ ...hall, seatsColumns: e.target.value ? parseInt(e.target.value) : 0 })} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <TextField multiline label="Περιγραφή" value={hall.description} onChange={(e) => setHall({ ...hall, description: e.target.value })} />
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
                <Button onClick={addClicked} autoFocus>
                    Προσθήκη
                </Button>
            </DialogActions>

        </Dialog >
    )
}
