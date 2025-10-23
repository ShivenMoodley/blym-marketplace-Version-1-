import { createContext, useContext, useEffect, ReactNode } from 'react';
import { useActiveAccount, useDisconnect, useActiveWallet } from 'thirdweb/react';
import { useToast } from '@/hooks/use-toast';

interface WalletContextType {
  account: any;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const account = useActiveAccount();
  const activeWallet = useActiveWallet();
  const { disconnect: thirdwebDisconnect } = useDisconnect();
  const { toast } = useToast();

  useEffect(() => {
    if (account) {
      console.log(`Wallet connected: ${account.address}`);
      toast({
        title: "Wallet Connected",
        description: `Connected ${account.address.slice(0, 6)}...${account.address.slice(-4)}`,
      });
    } else {
      console.log("Wallet disconnected");
    }
  }, [account, toast]);

  const disconnect = () => {
    if (activeWallet) {
      thirdwebDisconnect(activeWallet);
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected",
      });
    }
  };

  return (
    <WalletContext.Provider value={{ account, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
};
