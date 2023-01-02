import React from 'react';
import { Outlet } from 'react-router-dom';
import MuiNavbar from './components/MuiNavbar';
import HeaderComp from './HeaderComp';

function RootPage() {
  return (
    <React.Fragment>
      <MuiNavbar/>
      <main>
        <Outlet />
      </main >
    </React.Fragment >
  );
}

export default RootPage;
