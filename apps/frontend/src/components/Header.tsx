import React from 'react';

import viteLogo from '/vite.svg';

const Header: React.FC = () => {
  return (
    <div
      className="
        h-14 bg-brandColor text-white
        p-2 pl-4 pr-4
        flex flex-row
        justify-between items-center
      "
    >
      {/* TODO: 差し替え */}
      {/* ロゴ/タイトル */}
      <div className="flex flex-row">
        <img src={viteLogo} className="logo" alt="Vite logo" />
        <p className="text-2xl ml-2">ZKP</p>
      </div>

      {/* MetaMaskのpublic address*/}
      <div className="wallet-id">
        <p className="text-1xl">public address</p>
      </div>
    </div>
  );
};

export default Header;
