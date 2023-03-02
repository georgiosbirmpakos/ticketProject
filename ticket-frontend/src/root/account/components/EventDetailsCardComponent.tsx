import { Grid, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { DateTimePicker } from '@mui/x-date-pickers';
import { EventDto } from '../../../modules/event/dtos/event-dto';

export interface EventDetailsCardComponentProps {
    event: EventDto,
    style?: React.CSSProperties
}

//Probably have to use arrays in order to load them dynamically
const EventDetailsCardComponent = ({ event, style }: EventDetailsCardComponentProps) => {

    return (
        <Card style={{ ...style }} sx={{ height: "100%", transition: 'ease', borderRadius: 5, margin: 2 }}>
            <h4>
                Πληροφορίες Προβολής
            </h4>
            <CardContent>
                <Grid container>
                    <Grid item xs={6} justifyItems="left" justifyContent="left" textAlign="left">
                        <h4>Ώρα:</h4>
                    </Grid>
                    <Grid item xs={6} justifyItems="right" justifyContent="right" textAlign="right">
                        <DateTimePicker
                            label="Ημερομηνία"
                            value={event.eventDatetime ? event.eventDatetime : new Date()}
                            disabled={true}
                            onChange={() => undefined}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={6} justifyItems="left" justifyContent="left" textAlign="left">
                        <h4>Τιμή Εισιτηρίου:</h4>
                    </Grid>
                    <Grid item xs={6} justifyItems="right" justifyContent="right" textAlign="right">
                        {event.eventPrice} €
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={6} justifyItems="left" justifyContent="left" textAlign="left">
                        <h4>Αίθουσα:</h4>
                    </Grid>
                    <Grid item xs={6} justifyItems="right" justifyContent="right" textAlign="right">
                        {event.hallRef?.label}
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={6} justifyItems="left" justifyContent="left" textAlign="left">
                        <h4>Συνολική Πληρωμή:</h4>
                    </Grid>
                    <Grid item xs={6} justifyItems="right" justifyContent="right" textAlign="right">
                        {event.tickets.length * event.eventPrice} €
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={6} justifyItems="left" justifyContent="left" textAlign="left">
                        <h4>Αριθμός Εισητηρίων:</h4>
                    </Grid>
                    <Grid item xs={6} justifyItems="right" justifyContent="right" textAlign="right">
                        {event.tickets.length}
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={6} justifyItems="left" justifyContent="left" textAlign="left">
                        <h4>Θέσεις Εισιτηρίων:</h4>
                    </Grid>
                    <Grid item xs={6} justifyItems="right" justifyContent="right" textAlign="right">
                        <ul>
                            {event.tickets.map(ticket => (
                                <li key={ticket.ticketId}>
                                    <p>{ticket.seatRow}-{ticket.seatColumn}</p>
                                </li>
                            ))}
                        </ul>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default EventDetailsCardComponent