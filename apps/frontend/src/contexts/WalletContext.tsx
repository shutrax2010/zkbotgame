import React, { createContext, useState, useContext, ReactNode } from 'react';

interface WalletContextType {
  publicKey: string | null;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

/**
 * ウォレット情報を提供するためのコンテキストプロバイダー
 */
const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  /**
   * ウォレット接続
   */
  const connectWallet = async () => {
    try {
      const accounts = await (window as any).mina.requestAccounts();

      setPublicKey(accounts[0]);
      setIsConnected(true);
    } catch {
      console.error('Failed to connect to Auro Wallet');
    }
  };

  return <WalletContext.Provider value={{ publicKey, isConnected, connectWallet }}>{children}</WalletContext.Provider>;
};

/**
 * WalletContextからウォレット情報を取得するためのフック
 *
 * @return {WalletContextType} ウォレット情報
 * @throws {Error} WalletProviderの外側で使用された場合にエラーをスロー
 */
const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);

  // WalletProvider内のコンポで利用された場合
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }

  return context;
};

export { WalletProvider, useWallet };
