import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid } from '@mui/material';
import { useState } from 'react';
import { ProviderDto } from '../../../../modules/provider/provider-dto';
import { AdminProvidersService } from '../admin-providers-service';
import { CreateProviderRequestDto } from '../dtos/create-provider-dto';
import { useSnackbar } from 'notistack';

export interface ProviderDialogCreateComponentProps {
    open: boolean;
    onCancel?: ((event: any) => void) | undefined;
    afterAdd: (event: any) => void;
}

export default function ProviderDialogCreateComponent(props: ProviderDialogCreateComponentProps) {
    const [provider, setProvider] = useState<ProviderDto>(new ProviderDto());

    const { enqueueSnackbar } = useSnackbar();


    const onClick = (id: string) => {
        console.log({ id })
    }

    function setSelectedFile(target: any) {
        console.log('target', target)
    }

    async function addClicked(e: any) {
        const createProviderRequestDto: CreateProviderRequestDto = new CreateProviderRequestDto();
        createProviderRequestDto.provider = provider;
        try {
            const response = await AdminProvidersService.createProvider(createProviderRequestDto);
            enqueueSnackbar('Επιτυχής δημιουργία Καταστήματος', { variant: 'success' })
            props.afterAdd(e);
        } catch (e) {
            console.error(e);
            enqueueSnackbar('Αποτυχημένη δημιουργία Καταστήματος', { variant: 'error' })
        }
    }

    return (
        <Dialog fullWidth={true} maxWidth={false} onClose={props.onCancel} open={props.open}>
            <DialogTitle id="alert-dialog-title">
                Προσθήκη Καταστήματος
            </DialogTitle>
            <DialogContent>
                {/* <DialogContentText id="alert-dialog-description">
        </DialogContentText> */}
                <form>
                    <Grid container spacing={2} sx={{ padding: 1 }}>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField label="Όνομα" value={provider.name} onChange={(e) => setProvider({ ...provider, name: e.target.value })} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField label="Διεύθυνση" value={provider.address} onChange={(e) => setProvider({ ...provider, address: e.target.value })} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField label="Πηγή GoogleMaps" value={provider.googleMapsSrc} onChange={(e) => setProvider({ ...provider, googleMapsSrc: e.target.value })} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField label="Τηλέφωνο" value={provider.phone} onChange={(e) => setProvider({ ...provider, phone: e.target.value })} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField multiline label="Περιγραφή" value={provider.description} onChange={(e) => setProvider({ ...provider, description: e.target.value })} />
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
