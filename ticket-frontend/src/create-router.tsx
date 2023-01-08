import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

export function createRouter() {
    const RootPageLazy = React.lazy(() => import('./root/RootPage'));
    const HomePageLazy = React.lazy(() => import('./root/home/HomePage'));
    const AboutPageLazy = React.lazy(() => import('./root/about/AboutPage'));
    const EventsPageLazy = React.lazy(() => import('./root/events/EventsPage'));
    const EventListPageLazy = React.lazy(() => import('./root/events/list/EventListPage'));
    const EventDetailsPageLazy = React.lazy(() => import('./root/events/details/EventDetailsPage'));
    const AdminPageLazy = React.lazy(() => import('./root/admin/AdminPage'));
    const AdminEventsPageLazy = React.lazy(() => import('./root/admin/events/AdminEventsPage'));
    const AdminProvidersPageLazy = React.lazy(() => import('./root/admin/providers/AdminProvidersPage'));
    const AdminMoviesPageLazy = React.lazy(() => import('./root/admin/movies/AdminMoviesPage'));
    const AdminUsersPageLazy = React.lazy(() => import('./root/admin/users/AdminUsersPage'));
    
    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootPageLazy />,
            // errorElement: <ErrorPage />,
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
                            path: "details/:id",
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
                            element: <Navigate to="providers" />
                        },
                        {
                            path: "providers",
                            element: <AdminProvidersPageLazy />
                        },
                        {
                            path: "movies",
                            element: <AdminMoviesPageLazy />
                        },
                        {
                            path: "events",
                            element: <AdminEventsPageLazy />
                        },
                        {
                            path: "users",
                            element: <AdminUsersPageLazy />
                        },
                    ]
                },
            ],
        },
    ]);
    return router;
}