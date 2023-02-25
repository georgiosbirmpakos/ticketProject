import { CardHeader, Grid, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { EventDto } from '../../../../modules/event/dtos/event-dto';
import { MovieListItemDto } from '../../../../modules/movie/dtos/movie-list-item-dto';
import { DateTimePicker } from '@mui/x-date-pickers';

export interface EventOtherDetailsCardComponentProps {
    event: EventDto,
    style?: React.CSSProperties
}

//Probably have to use arrays in order to load them dynamically
const EventOtherDetailsCardComponent = ({ event, style }: EventOtherDetailsCardComponentProps) => {

    return (
        <Card style={{ ...style }} sx={{ ":hover": { transform: 'scale(1.05)', boxShadow: 3 }, height: "100%", transition: 'ease', borderRadius: 5, margin: 2 }}>
            <h4>
                Πληροφορίες Προβολής
            </h4>
            <CardContent>
                <Grid container>
                    <Grid item xs={6} justifyItems="left" justifyContent="left" textAlign="left">
                        Ώρα:
                    </Grid>
                    <Grid item xs={6} justifyItems="right" justifyContent="right" textAlign="right">
                        <DateTimePicker
                            label="Ημερομηνία"
                            value={event.eventDatetime ? event.eventDatetime : new Date()}
                            disabled={true}
                            onChange={() => { }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={6} justifyItems="left" justifyContent="left" textAlign="left">
                        Τιμή Εισιτηρίου:
                    </Grid>
                    <Grid item xs={6} justifyItems="right" justifyContent="right" textAlign="right">
                        {event.eventPrice} €
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={6} justifyItems="left" justifyContent="left" textAlign="left">
                        Αίθουσα:
                    </Grid>
                    <Grid item xs={6} justifyItems="right" justifyContent="right" textAlign="right">
                        {event.hallRef?.label}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default EventOtherDetailsCardComponent