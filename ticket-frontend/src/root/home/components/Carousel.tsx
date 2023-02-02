import { Button } from "@mui/material";
import React from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { MovieListItemDto } from '../../../modules/movie/movie-list-item-dto';
import './Carousel.css';

export interface CarouselComponentProps {
    movies: MovieListItemDto[]
}

// Creating the Carousel Component for the home Page
export default function CarouselComponent(props: CarouselComponentProps) {

    //Create a custom onClick function for our ticket buttons
    const onClick = (movieId: number) => {
        console.log({ id: movieId })
    }

    const renderSlides = props.movies.map((movie) => (
        <div key={movie.name}>
            <img className="carouselImg" src={movie.imageMimePrefix + ',' + movie.image} />
            <Button onClick={() => onClick(movie.movieId)} className="imageBtn" variant="contained">ΠΛΗΡΟΦΟΡΙΕΣ</Button>
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