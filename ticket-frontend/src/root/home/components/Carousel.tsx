import { Button } from "@mui/material";
import React from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from 'react-router-dom';
import { MovieListItemDto } from '../../../modules/movie/dtos/movie-list-item-dto';
import './Carousel.css';

export interface CarouselComponentProps {
    movies: MovieListItemDto[]
}

// Creating the Carousel Component for the home Page
export default function CarouselComponent(props: CarouselComponentProps) {

    //Create a custom onClick function for our ticket buttons

    const renderSlides = props.movies.map((movie) => (
        <div key={movie.name}>
            <img className="carouselImg" src={movie.imageMimePrefix + ',' + movie.image} alt="movie" style={{ objectFit: 'cover' }} />
            <Button component={Link} to={'/events/list?movieId=' + movie.movieId} className="imageBtn" variant='contained' sx={{ ":hover": { backgroundColor: 'secondary' }, borderRadius: 20, backgroundColor: 'primary' }} size="small">ΠΡΟΒΟΛΕΣ</Button>
            <Button component={Link} to={'/movies/details?movieId=' + movie.movieId} className="imageBtn" variant='outlined' sx={{ ":hover": { backgroundColor: '#E1D9D1', borderColor: '#920b17', color: '#920b17' }, color: '#E63946', backgroundColor: 'white', borderColor: '#E63946', borderRadius: 20, marginLeft: 1 }} size="small">ΠΛΗΡΟΦΟΡΙΕΣ</Button>

        </div>
    ));

    //create each carousel image an pass buttons
    return (
        <React.Fragment>
            <Carousel className="carousel" autoPlay showThumbs={false} interval={3000}>
                {renderSlides}
            </Carousel>
        </React.Fragment>
    );
}