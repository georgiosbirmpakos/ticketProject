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

                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12211.010976878968!2d23.772819702994582!3d38.04230765177676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a198c130d24143%3A0x46397c352cf10818!2zzprOuc69zrfOvM6xz4TOv86zz4HOrM-Gzr_PgiBWaWxsYWdl!5e0!3m2!1sel!2sgr!4v1677607493542!5m2!1sel!2sgr" width="600" height="450" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="someTitle">

                </iframe>


            </CardContent>
            <CardActions>
                <Button component={Link} to={'/events/list?providerId=' + props.provider.providerId} variant='contained' sx={{ ":hover": { backgroundColor: 'secondary' }, borderRadius: 20, backgroundColor: 'primary' }} size="small">ΠΡΟΒΟΛΕΣ</Button>
            </CardActions>
        </Card>
    )
}

export default ProviderCardComponent