import React from 'react'
import { Grid } from '@mui/material'
import MovieCardComponent from './MovieCardComponent'
import { MovieListItemDto } from '../dtos/movie-list-item-dto'

export interface MoviesGridLayoutComponentProps {
    movies: MovieListItemDto[]
}

const MoviesGridLayoutComponent = (props: MoviesGridLayoutComponentProps) => {

    //   let titles: string[] = ['Avengers', 'Batman', 'Spiderman', 'Avengers', 'Batman', 'Spiderman'];
    //   let imageTitles = ['./avengers.jpeg','./batman.jpeg','./spiderman.jpg', './avengers.jpeg','./batman.jpeg','./spiderman.jpg'];
    //   let description = ['Avengers description', 'Batman Description', 'Superman description',
    //   'Avengers description', 'Batman Description', 'Superman description']

    //arrayOfbject creates a new object from the two arrays [title: 'Avengers', imagePath:'...']
    //   let arrayOfObject = titles.map(function (value, index){
    //    return [value, imageTitles[index]]
    //   });

    return (
        <Grid marginBottom={5} container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {props.movies.map((movie, index) => (

                <Grid item xs={2} sm={4} md={4} key={index} display='flex' style={{ marginTop: 15, display: 'flex-start', justifyContent: 'center', alignItems: 'center' }}>
                    <MovieCardComponent movie={movie} />
                </Grid>
            ))}
        </Grid>

    )
}

export default MoviesGridLayoutComponent