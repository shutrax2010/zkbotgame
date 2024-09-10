import React from 'react';

import { useWallet } from '@contexts/WalletContext';
import zkchatArenaLogo from '/zkChatArena.png';

const Header: React.FC = () => {
  const { publicKey, isConnected } = useWallet();

  return (
    <div
      className="
        h-14 bg-brandColor text-white
        p-2 pl-4 pr-4
        flex flex-row
        justify-between items-center
      "
    >
      {/* アプリロゴとタイトル */}
      <div className="flex flex-row items-center">
        <img src={zkchatArenaLogo} className="logo h-14" alt="Vite logo" />
        <p className="text-2xl ml-2">zkChat Arena</p>
      </div>

      {/* Auroのpublic address*/}
      <div className="wallet-id">
        <p className="text-1xl">public addless: {isConnected ? publicKey : 'Not connected'}</p>
      </div>
    </div>
  );
};

export default Header;
