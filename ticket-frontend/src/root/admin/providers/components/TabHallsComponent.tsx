
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid, Link, Tab, Tabs, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { ProviderDto } from '../../../../modules/provider/provider-dto';
import { AdminProvidersService } from '../admin-providers-service';
import { UpdateProviderRequestDto } from '../dtos/update-provider-dto';
import { useSnackbar } from 'notistack';
import React from 'react';

export interface TabHallsProps {
    providerId: number;
    open: boolean;
    readonly: boolean;
    onCancel?: ((event: any) => void) | undefined;
    afterUpdate: (event: any) => void;
}

export default function TabHallsComponent(props: TabHallsProps) {
    const [provider, setProvider] = useState<ProviderDto | null>(null);
    const [tabValue, setTabValue] = useState(0);

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
        <Box>
            ταβ
        </Box>
    )
}
