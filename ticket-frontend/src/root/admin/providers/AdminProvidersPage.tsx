import { Box, Button, Grid } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import ProvidersTableComponent from './components/ProvidersTableComponent';
import { Add } from '@mui/icons-material';
import { AdminProvidersService } from './admin-providers-service';
import { ProviderListItemDto } from '../../../modules/provider/provider-list-item-dto';
import ProviderDialogCreate from './components/ProviderDialogCreateComponent';
import ProviderDialogUpdate from './components/ProviderDialogUpdateComponent';
import ProviderDialogDeleteComponent from './components/ProviderDialogDeleteComponent';
import { useSnackbar } from 'notistack';

export default function AdminProvidersPage() {
    const [providers, setProviders] = useState<ProviderListItemDto[]>([]);
    const [isDialogCreateOpen, setIsDialogCreateOpen] = useState<boolean>(false);
    const [isDialogUpdateOpen, setIsDialogUpdateOpen] = useState<boolean>(false);
    const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState<boolean>(false);
    const [selectedProvider, setSelectedProvider] = useState<ProviderListItemDto | null>(null);
    const [readonly, setReadonly] = useState<boolean>(false);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {


        loadData();
    }, [])

    async function loadData() {
        setProviders([]);
        try {
            const fetchProvidersListResponseDto = await AdminProvidersService.fetchProvidersList();
            setProviders(fetchProvidersListResponseDto.providers);
        } catch (e) {
            console.error(e);
            enqueueSnackbar('Αποτυχημένη εύρεση λίστας ταινιών', { variant: 'error' })
        }
    }


    function createProviderClicked() {
        setSelectedProvider(null);
        setIsDialogCreateOpen(true);
    }

    function viewProviderClicked(selectedProvider: ProviderListItemDto) {
        setSelectedProvider(selectedProvider);
        setReadonly(true);
        setIsDialogUpdateOpen(true);
    }

    function updateProviderClicked(selectedProvider: ProviderListItemDto) {
        setSelectedProvider(selectedProvider);
        setReadonly(false);
        setIsDialogUpdateOpen(true);
    }

    function deleteProviderClicked(selectedProvider: ProviderListItemDto) {
        setSelectedProvider(selectedProvider);
        setIsDialogDeleteOpen(true);
    }

    async function afterAdd() {
        setIsDialogCreateOpen(false);
        await loadData();
    }

    async function afterUpdate() {
        setIsDialogUpdateOpen(false);
        await loadData();
    }


    async function afterDelete() {
        setIsDialogDeleteOpen(false);
        await loadData();
    }

    return (
        <Fragment>
            <Box style={{ width: '100%', height: '100%' }}>
                <Grid container direction="row" padding={2}
                    justifyContent="space-between"
                    alignItems="center">
                    <Grid item>
                    </Grid>
                    <Grid item>
                        <Button onClick={createProviderClicked} variant="contained" startIcon={<Add />}>
                            ΔΗΜΙΟΥΡΓΙΑ ΚΑΤΑΣΤΗΜΑΤΟΣ
                        </Button>
                    </Grid>
                </Grid>

                <ProvidersTableComponent providers={providers}
                    onViewAction={(provider) => viewProviderClicked(provider)}
                    onEditAction={(provider) => updateProviderClicked(provider)}
                    onDeleteAction={(provider) => deleteProviderClicked(provider)} />

            </Box>
            {isDialogCreateOpen && (
                <ProviderDialogCreate open={isDialogCreateOpen}
                    onCancel={() => setIsDialogCreateOpen(false)}
                    afterAdd={afterAdd} />
            )}
            {isDialogUpdateOpen && selectedProvider && (
                <ProviderDialogUpdate open={isDialogUpdateOpen}
                    readonly={readonly}
                    providerId={selectedProvider.providerId}
                    onCancel={() => setIsDialogUpdateOpen(false)}
                    afterUpdate={afterUpdate} />
            )}
            {isDialogDeleteOpen && selectedProvider && (
                <ProviderDialogDeleteComponent open={isDialogDeleteOpen}
                    onCancel={() => setIsDialogDeleteOpen(false)}
                    afterDelete={afterDelete} provider={selectedProvider} />
            )}
        </Fragment>
    );
}
