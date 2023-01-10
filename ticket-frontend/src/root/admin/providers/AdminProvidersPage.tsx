import { Box, Button, Grid } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import ProvidersTable from './components/ProvidersTable';
import { Add } from '@mui/icons-material';
import { AdminProvidersService } from './admin-providers-service';
import { ProviderListItemDto } from '../../../modules/provider/provider-list-item-dto';
import ProviderDialogCreate from './components/ProviderDialogCreate';
import ProviderDialogUpdate from './components/ProviderDialogUpdate';
import ProviderDialogDelete from './components/ProviderDialogDelete';

export default function AdminProvidersPage() {
    const [providers, setProviders] = useState<ProviderListItemDto[]>([]);
    const [isDialogCreateOpen, setIsDialogCreateOpen] = useState<boolean>(false);
    const [isDialogUpdateOpen, setIsDialogUpdateOpen] = useState<boolean>(false);
    const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState<boolean>(false);
    const [selectedProvider, setSelectedProvider] = useState<ProviderListItemDto | null>(null);

    useEffect(() => {
        loadData();
    }, [])


    async function loadData() {
        setProviders([]);
        const fetchProvidersListResponseDto = await AdminProvidersService.fetchProvidersList();
        console.log('fetchProvidersListResponseDto', fetchProvidersListResponseDto)
        setProviders(fetchProvidersListResponseDto.providers);
    }


    function createProviderClicked() {
        setSelectedProvider(null);
        setIsDialogCreateOpen(true);
    }

    function updateProviderClicked(selectedProvider: ProviderListItemDto) {
        setSelectedProvider(selectedProvider);
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
                            Δημιουργία Καταστήματος
                        </Button>
                    </Grid>
                </Grid>

                <ProvidersTable providers={providers}
                    onViewAction={(provider) => deleteProviderClicked(provider)}
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
                    providerId={selectedProvider.providerId}
                    onCancel={() => setIsDialogUpdateOpen(false)}
                    afterUpdate={afterUpdate} />
            )}
            {isDialogDeleteOpen && selectedProvider && (
                <ProviderDialogDelete open={isDialogDeleteOpen}
                    onCancel={() => setIsDialogDeleteOpen(false)}
                    afterDelete={afterDelete} provider={selectedProvider} />
            )}
        </Fragment>
    );
}
