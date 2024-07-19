import React from 'react';
import viteLogo from '/vite.svg';

const Header: React.FC = () => {
  return (
    <header className="bg-brandColor text-white p-2 pl-4 pr-4 flex flex-row justify-between">
      {/* ロゴ/タイトル */}
      <div className="flex flex-row">
        {/* TODO: 差し替え */}
        <img src={viteLogo} className="logo" alt="Vite logo" />
        <p className="text-2xl ml-2">ZKP</p>
      </div>

      {/* Wallet ID */}
      <div className="account-id  flex items-center">
        <p className="text-1xl">hogehoge</p>
      </div>
    </header>
  );
};

export default Header;
