import React, { useEffect, useState } from 'react';
import { Typography, Divider, CircularProgress, Box, Grid } from '@mui/material';
import ScrollToTopOnMount from '../shared/components/ScrollToTopOnMount';
import { useSnackbar } from 'notistack';
import { ProvidersService } from './providers-service';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ProviderCardComponent from './components/ProviderCardComponent';
import { ProviderDto } from '../../modules/provider/provider-dto';

export default function ProvidersPage() {
    const [isWaitingFetch, setIsWaitingFetch] = useState<boolean>(false);
    const [providers, setProviders] = useState<ProviderDto[]>([]);
    const { enqueueSnackbar } = useSnackbar();


    useEffect(() => {
        async function loadData() {
            setIsWaitingFetch(true);
            setProviders([]);
            try {
                const fetchMoviesListResponseDto = await ProvidersService.fetchProvidersList();
                console.log('fetchMoviesListResponseDto', fetchMoviesListResponseDto)
                setProviders(fetchMoviesListResponseDto.providers);
                setIsWaitingFetch(false);
            } catch (e) {
                console.error(e);
                enqueueSnackbar('Αποτυχημένη εύρεση λίστας ταινιών', { variant: 'error' });
                setIsWaitingFetch(false);
            }
        }

        loadData();
    }, [])

    return (
        <Box>
            {isWaitingFetch
                ? (
                    <CircularProgress />
                )
                : (
                    <React.Fragment>
                        <ScrollToTopOnMount />
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap', marginTop: 10
                        }}>
                            <LocationCityIcon sx={{ marginLeft: 4 }} fontSize='large' />
                            <Typography sx={{ fontSize: 'xx-large', marginLeft: 3, fontWeight: 'bolder' }}>ΚΑΤΑΣΤΗΜΑΤΑ</Typography>
                        </div>
                        <Divider variant="middle" style={{ marginBottom: 10 }} />
                        <Grid container spacing={1} className="center-align-stretch" sx={{ padding: 1 }}>
                            {providers.map(provider => (
                                <Grid item xs={12} xl={6} key={provider.providerId}>
                                    <ProviderCardComponent provider={provider} />
                                </Grid>
                            ))}

                        </Grid>
                    </React.Fragment>
                )
            }
        </Box>
    );
}
