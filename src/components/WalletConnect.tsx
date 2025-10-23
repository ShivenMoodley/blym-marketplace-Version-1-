import { ConnectButton, useActiveAccount } from 'thirdweb/react';
import { Button } from '@/components/ui/button';
import { Wallet, Copy, ExternalLink, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useWallet } from '@/contexts/WalletContext';
import { client, activeChain } from '@/lib/thirdweb';
import { createWallet } from 'thirdweb/wallets';

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
];

export const WalletConnect = () => {
  const account = useActiveAccount();
  const { disconnect } = useWallet();
  const { toast } = useToast();

  const copyAddress = () => {
    if (account?.address) {
      navigator.clipboard.writeText(account.address);
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      });
    }
  };

  const openInExplorer = () => {
    if (account?.address) {
      window.open(`https://sepolia.basescan.org/address/${account.address}`, '_blank');
    }
  };

  if (account) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-md">
          <Wallet className="h-4 w-4 text-primary" />
          <span className="text-sm font-mono">
            {account.address.slice(0, 6)}...{account.address.slice(-4)}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={copyAddress}
          >
            <Copy className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={openInExplorer}
          >
            <ExternalLink className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={disconnect}
            title="Disconnect Wallet"
          >
            <LogOut className="h-3 w-3" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <ConnectButton
      client={client}
      wallets={wallets}
      chain={activeChain}
      connectButton={{
        label: "Connect Wallet",
        className: "!bg-primary !text-primary-foreground hover:!bg-primary/90 !px-4 !py-2 !rounded-md !text-sm !font-medium !transition-colors"
      }}
      switchButton={{
        label: "Switch Network",
      }}
    />
  );
};
