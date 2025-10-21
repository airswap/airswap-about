# AirSwap Forwarder Quick Start

The AirSwap Forwarder is a high-performance server that routes client requests to market makers across the AirSwap ecosystem. It provides a unified JSON-RPC interface and intelligently discovers and forwards to market makers for RFQ and LastLook protocols.

> Assumption: You have access to a running forwarder instance at forwarder.airswap.xyz.

## What is the AirSwap Forwarder?

The AirSwap Forwarder:
- **Connects clients to market makers** via a standardized JSON-RPC interface
- **Intelligently routes requests** to market makers based on token pairs and availability
- **Monitors the AirSwap Registry** in real time to discover active market makers
- **Supports** Request-for-Quote (RFQ) and LastLook protocols
- **Provides multi-chain support** across Ethereum, Polygon, Arbitrum, Base, Avalanche, BSC, and testnets

## API Endpoints

- **WebSocket**: `wss://forwarder.airswap.xyz/ws` (JSON-RPC 2.0) — real-time streaming (LastLook)
- **HTTP JSON-RPC**: `POST https://forwarder.airswap.xyz/jsonrpc` — RFQ and discovery
- **Health Check**: `GET https://forwarder.airswap.xyz/health` — server status and metrics
- **Registry State**: `GET https://forwarder.airswap.xyz/registry` — current registry state

## Supported Protocols

### Discovery (handled by forwarder)
- `getProtocols` — Retrieve supported protocols and configuration
- `getTokens` — Retrieve all tokens supported by registered servers

### RFQ ERC20 (forwarded to market-maker servers)
- `getSignerSideOrderERC20`
- `getSenderSideOrderERC20`
- `getPricingERC20`
- `getAllPricingERC20`

### LastLook ERC20 (forwarded to market-maker servers)
- `subscribePricingERC20`
- `subscribeAllPricingERC20`
- `unsubscribePricingERC20`
- `unsubscribeAllPricingERC20`
- `setPricingERC20`
- `considerOrderERC20`

## Connecting

Use HTTP JSON-RPC for discovery and RFQ, and WebSocket for streaming (LastLook).

### HTTP client (TypeScript)
```typescript
import fetch from 'node-fetch';

const RPC_URL = 'https://forwarder.airswap.xyz/jsonrpc';

async function rpc(method: string, params?: any[]) {
  const res = await fetch(RPC_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', method, params, id: Date.now() })
  });
  const json = await res.json();
  if (json.error) throw new Error(JSON.stringify(json.error));
  return json.result;
}
```

### WebSocket client (TypeScript)
```typescript
import WebSocket from 'ws';

const ws = new WebSocket('wss://forwarder.airswap.xyz/ws');

ws.on('open', () => {
  ws.send(JSON.stringify({ jsonrpc: '2.0', method: 'getProtocols', id: 1 }));
});

ws.on('message', (data) => {
  console.log('Received:', JSON.parse(data.toString()));
});
```

## RFQ: Get and Take a Quote

Typical backend-to-forwarder flow for ERC20 swaps.

### 1) Discover support
```bash
curl -s -X POST https://forwarder.airswap.xyz/jsonrpc \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"getProtocols","id":1}'
```

```bash
curl -s -X POST https://forwarder.airswap.xyz/jsonrpc \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"getTokens","id":2}'
```

**TypeScript Implementation:**
```typescript
// Discover available protocols and tokens
const protocols = await rpc('getProtocols');
console.log('Supported protocols:', protocols);

const tokens = await rpc('getTokens');
console.log('Available tokens:', tokens);
```

### 2) Price check (indicative)
```bash
curl -s -X POST https://forwarder.airswap.xyz/jsonrpc \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc":"2.0",
    "method":"getPricingERC20",
    "params":[[["0xTOKEN_A","0xTOKEN_B"]],"1800000000"],
    "id":3
  }'
```

**TypeScript Implementation:**
```typescript
// Get pricing for specific token pairs
const pricing = await rpc('getPricingERC20', [
  [['0xTOKEN_A', '0xTOKEN_B']], 
  '1800000000'
]);
console.log('Pricing data:', pricing);

// Get all available pricing
const allPricing = await rpc('getAllPricingERC20', ['1800000000']);
console.log('All pricing:', allPricing);
```

### 3) Request a firm RFQ order
Signer-side (you specify sell amount):
```bash
curl -s -X POST https://forwarder.airswap.xyz/jsonrpc \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc":"2.0",
    "method":"getSignerSideOrderERC20",
    "params":[
      "1",                                  // chainId
      "0xd82FA167727a4dc6D6F55830A2c47aBbB4b3a0F8",
      "1000000000000000000",                // signerAmount (1.0)
      "0xTOKEN_A",                          // signerToken (you sell)
      "0xTOKEN_B",                          // senderToken (you buy)
      "0xYourWalletAddress",                // sender (taker)
      "1800000000",                         // expiry
      ""
    ],
    "id":4
  }'
```

**TypeScript Implementation:**
```typescript
// Get signer-side order (specify amount to sell)
const signerOrder = await rpc('getSignerSideOrderERC20', [
  '1',                                    // chainId
  '0xd82FA167727a4dc6D6F55830A2c47aBbB4b3a0F8', // swap contract
  '1000000000000000000',                  // amount to sell (1.0 token)
  '0xTOKEN_A',                           // token to sell
  '0xTOKEN_B',                           // token to buy
  '0xYourWalletAddress',                 // your wallet
  '1800000000',                          // expiry
  ''                                     // senderWallet (empty for signer-side)
]);
console.log('Signer-side order:', signerOrder);

// Get sender-side order (specify amount to buy)
const senderOrder = await rpc('getSenderSideOrderERC20', [
  '1',
  '0xd82FA167727a4dc6D6F55830A2c47aBbB4b3a0F8',
  '1000000000000000000',                  // amount to buy (1.0 token)
  '0xTOKEN_A',                           // token to sell
  '0xTOKEN_B',                           // token to buy
  '0xYourWalletAddress',
  '1800000000',
  ''
]);
console.log('Sender-side order:', senderOrder);
```

The response contains a signed order compatible with the AirSwap `Swap` contract.

### 4) Submit on-chain (ethers v6)
1. Approve the `Swap` contract to transfer your token (if needed).
2. Call `swap(order)` on the `Swap` contract.

Use the `Swap` address for your chain from `technology/deployments.md`.

```typescript
import { ethers } from 'ethers';

const RPC = 'https://mainnet.infura.io/v3/YOUR_KEY';
const SWAP_ADDRESS = '0xSwapAddressFromDeployments';
const SENDER_TOKEN = '0xTOKEN_A'; // token you sell
const SENDER = '0xYourWalletAddress';

const ERC20_ABI = [
  'function approve(address spender, uint256 value) external returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)'
];

const SWAP_ABI = [
  'function swap((uint256,uint256,address,address,address,address,address,uint256,uint256,bytes)) external payable'
];

async function takeOrder(order: any, privateKey: string) {
  const provider = new ethers.JsonRpcProvider(RPC);
  const wallet = new ethers.Wallet(privateKey, provider);
  const erc20 = new ethers.Contract(SENDER_TOKEN, ERC20_ABI, wallet);
  const swap = new ethers.Contract(SWAP_ADDRESS, SWAP_ABI, wallet);

  const allowance = await erc20.allowance(SENDER, SWAP_ADDRESS);
  if (allowance < order.senderAmount) {
    await (await erc20.approve(SWAP_ADDRESS, order.senderAmount)).wait();
  }

  const tx = await swap.swap(order);
  return (await tx.wait()).transactionHash;
}
```

## LastLook: Subscribe and Consider Orders

Use WebSocket for streaming quotes and "consider" requests.

### 1) Subscribe to pricing
```typescript
import WebSocket from 'ws';

const ws = new WebSocket('wss://forwarder.airswap.xyz/ws');
ws.on('open', () => {
  ws.send(JSON.stringify({
    jsonrpc: '2.0',
    method: 'subscribePricingERC20',
    params: [["0xTOKEN_A","0xTOKEN_B"]],
    id: 1001
  }));
});
ws.on('message', (m) => console.log(JSON.parse(m.toString())));
```

### 2) Consider an order
If you choose to take a streamed quote:
```bash
curl -s -X POST https://forwarder.airswap.xyz/jsonrpc \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc":"2.0",
    "method":"considerOrderERC20",
    "params":[ /* order or quote context here */ ],
    "id":7
  }'
```
If accepted, submit using the on-chain flow above (approve + `swap(order)`).

## Example Usage (HTTP)

### Get supported protocols
```bash
curl -X POST https://forwarder.airswap.xyz/jsonrpc \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"getProtocols","id":1}'
```

### Get available tokens
```bash
curl -X POST https://forwarder.airswap.xyz/jsonrpc \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"getTokens","id":2}'
```

### Get pricing
```bash
curl -X POST https://forwarder.airswap.xyz/jsonrpc \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc":"2.0",
    "method":"getPricingERC20",
    "params":[ [["0xTOKEN_A","0xTOKEN_B"]], "1800000000" ],
    "id":3
  }'
```

### Get signer-side order
```bash
curl -X POST https://forwarder.airswap.xyz/jsonrpc \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc":"2.0",
    "method":"getSignerSideOrderERC20",
    "params":[
      "1",
      "0xd82FA167727a4dc6D6F55830A2c47aBbB4b3a0F8",
      "1000000000000000000",
      "0xTOKEN_A",
      "0xTOKEN_B",
      "0xYourWalletAddress",
      "1800000000",
      ""
    ],
    "id":4
  }'
```

## End-to-End JS Example (RFQ)
```typescript
import fetch from 'node-fetch';
import { ethers } from 'ethers';

const RPC_URL = 'https://forwarder.airswap.xyz/jsonrpc';
const CHAIN_ID = '1';
const SWAP_ADDRESS = '0xSwapAddressFromDeployments';
const SENDER = '0xYourWalletAddress';
const PRIVATE_KEY = '0x...'; // never hardcode in production
const TOKEN_A = '0xTOKEN_A';
const TOKEN_B = '0xTOKEN_B';

async function rpc(method: string, params?: any[]) {
  const res = await fetch(RPC_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', method, params, id: Date.now() }),
  });
  const json = await res.json();
  if (json.error) throw new Error(JSON.stringify(json.error));
  return json.result;
}

async function main() {
  await rpc('getProtocols');
  await rpc('getTokens');
  await rpc('getPricingERC20', [[[TOKEN_A, TOKEN_B]], '1800000000']);
  const order = await rpc('getSignerSideOrderERC20', [
    CHAIN_ID,
    '0xd82FA167727a4dc6D6F55830A2c47aBbB4b3a0F8',
    '1000000000000000000',
    TOKEN_A,
    TOKEN_B,
    SENDER,
    '1800000000',
    ''
  ]);

  const provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR_KEY');
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const erc20 = new ethers.Contract(TOKEN_A, ['function approve(address,uint256) returns (bool)'], wallet);
  const swap = new ethers.Contract(SWAP_ADDRESS, ['function swap((uint256,uint256,address,address,address,address,address,uint256,uint256,bytes))'], wallet);

  await (await erc20.approve(SWAP_ADDRESS, order.senderAmount)).wait();
  const tx = await swap.swap(order);
  console.log('Submitted tx:', (await tx.wait()).hash);
}

main().catch(console.error);
```

## Troubleshooting (client-focused)

- **401/403/connection errors**: Confirm the forwarder URL, headers, and network access.
- **Method not found**: Check `getProtocols` for supported methods on this instance.
- **Empty tokens or no markets**: The forwarder may have limited market-maker coverage; try different pairs or chains.
- **Order reverts**: Ensure correct chain, `Swap` address, sufficient allowance/balance, and fresh (non-expired) order.
- **CORS in browsers**: Use a backend proxy or configure allowed origins on the forwarder.

## Support

- **Documentation**: https://about.airswap.xyz/
- **Community**: https://discord.gg/airswap
- **Issues**: https://github.com/airswap/airswap-forwarder/issues