import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

export function createRouter() {
    const RootPageLazy = React.lazy(() => import('./root/RootPage'));
    const HomePageLazy = React.lazy(() => import('./root/home/HomePage'));
    const AboutPageLazy = React.lazy(() => import('./root/about/AboutPage'));
    const MoviesPageLazy = React.lazy(() => import('./root/movies/MoviesPage'));
    const MoviesListPageLazy = React.lazy(() => import('./root/movies/list/MoviesListPage'));
    const MovieDetailsPageLazy = React.lazy(() => import('./root/movies/details/MovieDetailsPage'));
    const ProvidersPageLazy = React.lazy(() => import('./root/providers/ProvidersPage'));
    const EventsPageLazy = React.lazy(() => import('./root/events/EventsPage'));
    const EventListPageLazy = React.lazy(() => import('./root/events/list/EventListPage'));
    const EventDetailsPageLazy = React.lazy(() => import('./root/events/details/EventDetailsPage'));
    const AdminPageLazy = React.lazy(() => import('./root/admin/AdminPage'));
    const AdminEventsPageLazy = React.lazy(() => import('./root/admin/events/AdminEventsPage'));
    const AdminProvidersPageLazy = React.lazy(() => import('./root/admin/providers/AdminProvidersPage'));
    const AdminHallsPageLazy = React.lazy(() => import('./root/admin/halls/AdminHallsPage'));
    const AdminMoviesPageLazy = React.lazy(() => import('./root/admin/movies/AdminMoviesPage'));
    const LoginPageLazy = React.lazy(() => import('./root/account/LoginPage'));
    const AccountPageLazy = React.lazy(() => import('./root/account/AccountPage'));
    const SignUpPageLazy = React.lazy(() => import('./root/account/SignUpPage'));
    const ErrorPage = React.lazy(() => import('./root/error/ErrorPage'));
    const ErrorUnauthorizedPage = React.lazy(() => import('./root/error-unauthorized/ErrorUnauthorizedPage'));
    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootPageLazy />,
            errorElement: <ErrorPage />,
            // loader: () => React.,
            // action: rootAction,
            children: [
                {
                    path: "",
                    element: <Navigate to="home" />
                },
                {
                    path: "home",
                    element: <HomePageLazy />
                },
                {
                    path: "about",
                    element: <AboutPageLazy />
                },
                {
                    path: "account",
                    element: <AccountPageLazy />
                },
                // {
                //     path: "login",
                //     element: <LoginPageLazy />
                // },
                // {
                //     path: "signup",
                //     element: <SignUpPageLazy />
                // },
                {
                    path: "movies",
                    element: <MoviesPageLazy />,
                    children: [
                        {
                            path: "",
                            element: <Navigate to="list" />
                        },
                        {
                            path: "list",
                            element: <MoviesListPageLazy />
                        },
                        {
                            path: "details",
                            element: <MovieDetailsPageLazy />
                        },
                    ]
                },
                {
                    path: "providers",
                    element: <ProvidersPageLazy />,
                },
                {
                    path: "events",
                    element: <EventsPageLazy />,
                    children: [
                        {
                            path: "",
                            element: <Navigate to="list" />
                        },
                        {
                            path: "list",
                            element: <EventListPageLazy />
                        },
                        {
                            path: "details",
                            element: <EventDetailsPageLazy />
                        },
                    ]
                },
                {
                    path: "admin",
                    element: <AdminPageLazy />,
                    children: [
                        {
                            path: "",
                            element: <Navigate to="movies" />
                        },
                        {
                            path: "movies",
                            element: <AdminMoviesPageLazy />
                        },
                        {
                            path: "providers",
                            element: <AdminProvidersPageLazy />
                        },
                        {
                            path: "halls",
                            element: <AdminHallsPageLazy />
                        },
                        {
                            path: "events",
                            element: <AdminEventsPageLazy />
                        }
                    ]
                },
                {
                    path: "unauthorized",
                    element: <ErrorUnauthorizedPage />,
                }
            ],
        },
    ]);
    return router;
}