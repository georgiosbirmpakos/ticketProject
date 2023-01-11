
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { ProviderDto } from '../../../../modules/provider/provider-dto';
import { AdminProvidersService } from '../admin-providers-service';
import { UpdateProviderRequestDto } from '../dtos/update-provider-dto';

export interface MovieDialogCreateComponentProps {
    providerId: number;
    open: boolean;
    readonly: boolean;
    onCancel?: ((event: any) => void) | undefined;
    afterUpdate: (event: any) => void;
}

export default function MovieDialogCreateComponent(props: MovieDialogCreateComponentProps) {
    const [provider, setProvider] = useState<ProviderDto | null>(null);

    useEffect(() => {
        async function loadData() {
            const fetchProvidersListResponseDto = await AdminProvidersService.fetchProviderDetails(props.providerId);
            console.log('fetchProvidersListResponseDto', fetchProvidersListResponseDto)
            setProvider(fetchProvidersListResponseDto.provider);
        }

        loadData();
    }, [props.providerId])



    async function updateClicked(e: any) {
        const updateProviderRequestDto: UpdateProviderRequestDto = new UpdateProviderRequestDto();
        updateProviderRequestDto.provider = provider;
        const response = await AdminProvidersService.updateProvider(updateProviderRequestDto);
        props.afterUpdate(e);
    }

    return (
        <Dialog onClose={props.onCancel} open={props.open}>
            <DialogTitle id="alert-dialog-title">
                Επεξεργασία Καταστήματος
            </DialogTitle>
            <DialogContent>
                {provider && (
                    <form>
                        <Grid container spacing={2}>
                            <Grid item>
                                <TextField disabled={props.readonly} label="Όνομα" value={provider.name} onChange={(e) => setProvider({ ...provider, name: e.target.value })} />
                            </Grid>
                            <Grid item>
                                <TextField disabled={props.readonly} label="Διεύθυνση" value={provider.address} onChange={(e) => setProvider({ ...provider, address: e.target.value })} />
                            </Grid>
                            <Grid item>
                                <TextField disabled={props.readonly} label="Τηλέφωνο" value={provider.phone} onChange={(e) => setProvider({ ...provider, phone: e.target.value })} />
                            </Grid>
                            <Grid item>
                                <TextField disabled={props.readonly} label="Περιγραφή" value={provider.description} onChange={(e) => setProvider({ ...provider, description: e.target.value })} />
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
