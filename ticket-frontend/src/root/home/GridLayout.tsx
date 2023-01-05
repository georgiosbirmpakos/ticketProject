import React from 'react'
import { Grid} from '@mui/material'
import CardComponent from './CardComponent'

const GridLayout = () => {

  let titles: string[] = ['Avengers', 'Batman', 'Spiderman', 'Avengers', 'Batman', 'Spiderman'];
  let imageTitles = ['./avengers.jpeg','./batman.jpeg','./spiderman.jpg', './avengers.jpeg','./batman.jpeg','./spiderman.jpg'];
  let description = ['Avengers description', 'Batman Description', 'Superman description', 
  'Avengers description', 'Batman Description', 'Superman description']

  //arrayOfbject creates a new object from the two arrays [title: 'Avengers', imagePath:'...']
  let arrayOfObject = titles.map(function (value, index){
   return [value, imageTitles[index]]
  });
  
  return (
    <Grid marginBottom={5} container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {Array.from(titles).map((_, index) => (
        
        <Grid item xs={2} sm={4} md={4}key={index} display='flex' style={{marginTop:15, display:'flex-start', justifyContent:'center', alignItems:'center'}}>
        <CardComponent description={description[index]} title={titles[index]} imageTitle={imageTitles[index]}/>
        </Grid>
      ))}
  </Grid>

  )
}

export default GridLayout