import { Stack, Typography, Button, Box } from '@mui/material'
import ErrorSvg from './horror_404.svg'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
    return (
        <Box style={{ width: '100%', height: '100%' }}>
            <div style={{ minHeight: '100vh', display: 'flex', alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                <Stack direction={'column'} style={{ alignContent: 'center', alignItems: 'center' }}>
                    <Typography variant='h2'>Μη φοβάσαι!</Typography>
                    <Typography variant='h4'>Είναι απλά ένα 404!</Typography>
                    <img style={{ width: '50vw', height: '50vh' }} src={ErrorSvg} alt="logo" />
                    <Button variant='contained' component={Link} to={'/'}
                        sx={{ borderRadius: 15, height: 40, width: '60%', marginTop: 1, marginBottom: 1, justifyContent: 'flex' }} >
                        <Typography variant='subtitle2' fontWeight='normal' textTransform={'none'}>Πίσω στην αρχική</Typography>
                    </Button>
                </Stack>


            </div>
        </Box>
    )
}

export default ErrorPage