import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderComp from './HeaderComp';

function RootPage() {
  return (
    <React.Fragment>
      <HeaderComp />
      <main>
        <div>Root</div>
        <Outlet />
      </main >
    </React.Fragment >
  );
}

export default RootPage;
