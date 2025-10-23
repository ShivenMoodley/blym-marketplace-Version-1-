import { createThirdwebClient } from 'thirdweb';
import { defineChain } from 'thirdweb/chains';

// Get your own client ID from https://thirdweb.com/dashboard
export const client = createThirdwebClient({
  clientId: '6b8541a14d2b58fd257e24897ef17d1c'
});

// Base Sepolia Testnet configuration
export const activeChain = defineChain({
  id: 84532,
  name: "Base Sepolia",
  nativeCurrency: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  },
  blockExplorers: [
    {
      name: "BaseScan",
      url: "https://sepolia.basescan.org",
    },
  ],
  rpc: "https://sepolia.base.org",
  testnet: true,
});
