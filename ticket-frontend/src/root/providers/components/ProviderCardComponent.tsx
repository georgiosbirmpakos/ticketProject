import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'
import { Grid } from '@mui/material';
import { ProviderDto } from '../../../modules/provider/provider-dto';
import React from 'react';

export interface ProviderCardComponentProps {
    provider: ProviderDto
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
                        <h3>Διεύθυνση:</h3>
                    </Grid>
                    <Grid item xs={6} justifyItems="right" justifyContent="right" textAlign="right">
                        {props.provider.address}
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={6} justifyItems="left" justifyContent="left" textAlign="left">
                        <h3>Τηλέφωνο:</h3>
                    </Grid>
                    <Grid item xs={6} justifyItems="right" justifyContent="right" textAlign="right">
                        {props.provider.phone}
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={6} justifyItems="left" justifyContent="left" textAlign="left">
                        <h3>Περιγραφή:</h3>
                    </Grid>
                    <Grid item xs={6} justifyItems="right" justifyContent="right" textAlign="right">
                        {props.provider.description}
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={12} justifyItems="left" justifyContent="left" textAlign="left">
                        <h3>Αίθουσες:</h3>
                    </Grid>
                    {props.provider.halls.map(hall => (
                        <Grid container item key={hall.hallId}>
                            <Grid item xs={6} justifyItems="left" justifyContent="left" textAlign="left">
                            </Grid>
                            <Grid item xs={3} justifyItems="left" justifyContent="left" textAlign="left">
                                <h4>{hall.name}</h4>
                            </Grid>
                            <Grid item xs={3} justifyItems="right" justifyContent="right" textAlign="right">
                                <p>{hall.description}</p>
                            </Grid>
                        </Grid>
                    ))}
                    {/* <Grid item xs={3} justifyItems="left" justifyContent="left" textAlign="left">
                        {props.provider.halls.map(hall => (
                            <h4 key={hall.hallId}>{hall.name}</h4>
                        ))}
                    </Grid>
                    <Grid item xs={3} justifyItems="right" justifyContent="right" textAlign="right">
                        {props.provider.halls.map(hall => (
                            <p key={hall.hallId}>{hall.description}</p>
                        ))}
                    </Grid> */}
                </Grid>
                <Grid container className="center">
                    <Grid item className="center">
                        {props.provider.googleMapsSrc && (
                            <iframe src={props.provider.googleMapsSrc} width="300" height="300" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="someTitle">
                            </iframe>
                        )}
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