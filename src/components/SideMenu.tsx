import React from 'react';

const SideMenu: React.FC = () => {
  return (
    <aside className="bg-brandBgColor w-1/4 p-4">
      <nav>
        <ul>
          <li className="mb-2">
            <a href="#">Questioner</a>
          </li>
          <li className="mb-2">
            <a href="#">Mat</a>
          </li>
          <li className="mb-2">
            <a href="#">Alex</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideMenu;
