import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { MovieListItemDto } from '../../../../modules/movie/dtos/movie-list-item-dto';

export interface MovieCardComponentProps {
    movie: MovieListItemDto,
    style?: React.CSSProperties
}

//Probably have to use arrays in order to load them dynamically
const MovieCardComponent = (props: MovieCardComponentProps) => {
    return (
        <Card style={{ ...props.style }} sx={{ ":hover": { transform: 'scale(1.05)', boxShadow: 3 }, transition: 'ease', margin: 2 }}>
            <CardMedia
                component="img"
                height={200}
                width="auto"
                src={props.movie.imageMimePrefix + ',' + props.movie.image}
            />
            <CardContent>
                <Typography fontWeight={'bold'} gutterBottom variant="h5" component="div">
                    {props.movie.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.movie.description}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default MovieCardComponent