
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { ProviderDto } from '../../../../modules/provider/provider-dto';
import { AdminProvidersService } from '../admin-providers-service';
import { UpdateProviderRequestDto } from '../dtos/update-provider-dto';
import { useSnackbar } from 'notistack';

export interface ProviderDialogUpdateComponentProps {
    providerId: number;
    open: boolean;
    readonly: boolean;
    onCancel?: ((event: any) => void) | undefined;
    afterUpdate: (event: any) => void;
}

export default function ProviderDialogUpdateComponent(props: ProviderDialogUpdateComponentProps) {
    const [provider, setProvider] = useState<ProviderDto | null>(null);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        async function loadData() {
            try {
                const fetchProvidersListResponseDto = await AdminProvidersService.fetchProviderDetails(props.providerId);
                console.log('fetchProvidersListResponseDto', fetchProvidersListResponseDto)
                setProvider(fetchProvidersListResponseDto.provider);
            } catch (e) {
                console.error(e);
                enqueueSnackbar('Αποτυχημένη εύρεση Καταστήματος', { variant: 'error' })
            }
        }

        loadData();
    }, [props.providerId])



    async function updateClicked(e: any) {
        const updateProviderRequestDto: UpdateProviderRequestDto = new UpdateProviderRequestDto();
        updateProviderRequestDto.provider = provider;
        try {
            const response = await AdminProvidersService.updateProvider(updateProviderRequestDto);
            enqueueSnackbar('Επιτυχής αποθήκευση Καταστήματος', { variant: 'success' })
            props.afterUpdate(e);
        } catch (e) {
            console.error(e);
            enqueueSnackbar('Αποτυχημένη δημιουργία Καταστήματος', { variant: 'error' })
        }
    }

    return (
        <Dialog fullWidth={true} maxWidth={false} onClose={props.onCancel} open={props.open}>
            <DialogTitle id="alert-dialog-title">
                Επεξεργασία Καταστήματος
            </DialogTitle>
            <DialogContent>
                {provider && (
                    <form>
                        <Grid container spacing={2} sx={{ padding: 1 }}>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <TextField disabled={props.readonly} label="Όνομα" value={provider.name} onChange={(e) => setProvider({ ...provider, name: e.target.value })} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <TextField disabled={props.readonly} label="Διεύθυνση" value={provider.address} onChange={(e) => setProvider({ ...provider, address: e.target.value })} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <TextField disabled={props.readonly} label="Πηγή GoogleMaps" value={provider.googleMapsSrc} onChange={(e) => setProvider({ ...provider, googleMapsSrc: e.target.value })} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <TextField disabled={props.readonly} label="Τηλέφωνο" value={provider.phone} onChange={(e) => setProvider({ ...provider, phone: e.target.value })} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <TextField disabled={props.readonly} multiline label="Περιγραφή" value={provider.description} onChange={(e) => setProvider({ ...provider, description: e.target.value })} />
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
