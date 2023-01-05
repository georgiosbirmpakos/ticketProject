import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import React from 'react';
import { createRouter } from './create-router'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { RouterProvider } from 'react-router-dom';

const router = createRouter();

const RootPageLazy = React.lazy(() => import('./root/RootPage'));
const HomePageLazy = React.lazy(() => import('./root/home/HomePage'));
const AboutPageLazy = React.lazy(() => import('./root/about/AboutPage'));
const EventsPageLazy = React.lazy(() => import('./root/events/EventsPage'));
const EventListPageLazy = React.lazy(() => import('./root/events/list/EventListPage'));
const EventDetailsPageLazy = React.lazy(() => import('./root/events/details/EventDetailsPage'));


function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976D2',
      },
    },
  });

  return (
    <div>
    <React.Suspense fallback={<CircularProgress />}>
        {/* <RouterProvider router={router} /> */}
      
    <BrowserRouter>
    <Routes>
    <Route path="/"  element={<HomePageLazy/>} />
    <Route path="/home" element={<HomePageLazy />}  />
    <Route path="/about" element={<AboutPageLazy />} />
    <Route path="/events" element={<EventsPageLazy />} />
    <Route path="/events/details/:id" element={<EventDetailsPageLazy />} />

    </Routes>
    </BrowserRouter>
    </React.Suspense> 
    </div>
  );
}

export default App;
