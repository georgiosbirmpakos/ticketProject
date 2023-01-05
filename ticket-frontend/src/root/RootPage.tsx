import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './shared/components/Footer';
import MuiNavbar from './shared/components/MuiNavbar';
import HeaderComp from './shared/components/HeaderComp';

function RootPage() {
  return (
    <React.Fragment>
      <MuiNavbar />
      <main>
        <Outlet />
      </main >
      <Footer />
    </React.Fragment >
  );
}

export default RootPage;
