import { Button } from "@mui/material";
import React from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Carousel.css'; 


// Creating the Carousel Component for the home Page
export default function CarouselComponent() {

  const carouselData = [
    {   id: 1,
        image: "./avengers.jpeg",
        title: "Avengers",
        description: "Avengers description"}, 
        {id: 2,
        image: "./batman.jpeg",
        title: "Batman",
        description: "Batman description"}, 

        {id: 3,
        image: "./spiderman.jpg",
        title: "Spiderman",
        description: "Spiderman description"}, 
  ]

    //Create a custom onClick function for our ticket buttons
    const onClick = (id: string) => {
        console.log({id})
    }

    const renderSlides = carouselData.map((image) => (
        <div key={image.title}>
         <img className="carouselImg" src={require("" + image.image)}/>
        <Button onClick={() => onClick(image.title)} className="imageBtn" variant="contained">ΕΙΣΙΤΗΡΙΑ</Button>
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