import React, { ReactNode } from 'react';

import Header from '@components/Header';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">{children}</div>
    </div>
  );
};

export default MainLayout;
