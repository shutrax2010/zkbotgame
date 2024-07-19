import React from 'react';
import Header from './Header';
import SideMenu from './SideMenu';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 p-4">
        <SideMenu />
        <main className="flex-1 ml-4 overflow-auto bg-brandBgColor" />
      </div>
    </div>
  );
};

export default Layout;
