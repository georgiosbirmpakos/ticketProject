import React from 'react';
import { Outlet } from 'react-router-dom';

export default function EventsPage() {
  return (
    <React.Fragment>
      <div>
        EventsPage
      </div>
      <Outlet />
    </React.Fragment>
  );
}
