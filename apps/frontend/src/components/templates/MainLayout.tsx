import React, { ReactNode } from 'react';

import Header from '@components/Header';

interface MainLayout {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayout> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">{children}</div>
    </div>
  );
};

export default MainLayout;
