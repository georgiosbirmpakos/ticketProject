import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'
import { ProviderListItemDto } from '../../../modules/provider/provider-list-item-dto';
import { Grid } from '@mui/material';

export interface ProviderCardComponentProps {
    provider: ProviderListItemDto
}

//Probably have to use arrays in order to load them dynamically
const ProviderCardComponent = (props: ProviderCardComponentProps) => {


    //Create a custom onClick function for our ticket buttons
    const onClick = (id: string) => {
        console.log({ id })
    }
    return (
        <Card sx={{ height: "100%" }}>
            <CardContent>
                <Typography fontWeight={'bold'} gutterBottom variant="h5" component="div">
                    {props.provider.name}
                </Typography>

                <Grid container>
                    <Grid item xs={6} justifyItems="left" justifyContent="left" textAlign="left">
                        Διεύθυνση:
                    </Grid>
                    <Grid item xs={6} justifyItems="right" justifyContent="right" textAlign="right">
                        {props.provider.address}
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={6} justifyItems="left" justifyContent="left" textAlign="left">
                        Τηλέφωνο:
                    </Grid>
                    <Grid item xs={6} justifyItems="right" justifyContent="right" textAlign="right">
                        {props.provider.phone}
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={6} justifyItems="left" justifyContent="left" textAlign="left">
                        Περιγραφή:
                    </Grid>
                    <Grid item xs={6} justifyItems="right" justifyContent="right" textAlign="right">
                        {props.provider.description}
                    </Grid>
                </Grid>


            </CardContent>
            <CardActions>
                <Button component={Link} to={'/events/list?providerId=' + props.provider.providerId} variant='contained' sx={{ ":hover": { backgroundColor: 'secondary' }, borderRadius: 20, backgroundColor: 'primary' }} size="small">ΠΡΟΒΟΛΕΣ</Button>
            </CardActions>
        </Card>
    )
}

export default ProviderCardComponent