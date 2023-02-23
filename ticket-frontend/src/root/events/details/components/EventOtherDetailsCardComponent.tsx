import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { EventDto } from '../../../../modules/event/dtos/event-dto';
import { MovieListItemDto } from '../../../../modules/movie/dtos/movie-list-item-dto';

export interface EventOtherDetailsCardComponentProps {
    event: EventDto,
    style?: React.CSSProperties
}

//Probably have to use arrays in order to load them dynamically
const EventOtherDetailsCardComponent = ({ event, style }: EventOtherDetailsCardComponentProps) => {

    const eventDatetimeRow = `Ώρα: ${event.eventDatetime}`;
    const eventPriceRow = `Τιμή: ${event.eventPrice} €`;
    const eventHallRow = `Αίθουσα: ${event.hallRef?.label}`

    return (
        <Card style={{ ...style }} sx={{ ":hover": { transform: 'scale(1.05)', boxShadow: 3 }, height: "100%", transition: 'ease', borderRadius: 5, margin: 2 }}>
            <CardContent>
                <Grid container>
                    <Grid item xs={12}>
                        <div>
                            {eventDatetimeRow}
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div>
                            {eventPriceRow}
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div>
                            {eventHallRow}
                        </div>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default EventOtherDetailsCardComponent