import { Stack, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import ErrorSvg from './horror_404.svg'

const ErrorPage = () => {
  return (
    <div style={{minHeight:'100vh',display:'flex', alignContent:'center', alignItems:'center', justifyContent:'center'}}>
    <Stack direction={'column'} style={{alignContent:'center', alignItems:'center'}}>
    <Typography variant='h2'>Μη φοβάσαι!</Typography>
    <Typography variant='h4'>Είναι απλά ένα 404!</Typography>
    <img style={{width:'50vw', height:'50vh'}} src={ErrorSvg}/>
    <Button variant='contained'
            sx={{ borderRadius: 15, height: 40, width: '60%', marginTop:1, marginBottom:1, justifyContent:'flex' }} >
                <Typography variant='subtitle2' fontWeight='normal' textTransform={'none'}>Πίσω στην αρχική</Typography>
        </Button>
    </Stack>
    
    
    </div>
  )
}

export default ErrorPage