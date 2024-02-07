AirSwap trading technology is fully decentralized, powered by smart contracts that enable counterparty discovery and atomic swaps. AirSwap protocols communicate prices **off-chain** and settle **on-chain**. Peers take the form of individuals trading manually or software trading in an automated way, in which case market makers run servers that implement the following protocols.

For information on finding counter-parties, see [Registry](registry.md).

# Discovery

AirSwap Discovery protocol is used to determine the trading protocols and tokens supported by peers.

## `getProtocols`

Peers may call `getProtocols` to determine protocols supported by a peer. Protocols are identified by `interfaceId` and configuration params include the `chainId`, `swapContractAddress`, and `walletAddress` that the peer intends to use.

```typescript
getProtocols(): [
  {
    interfaceId: string,
    params: {
      chainId: string,
      swapContractAddress: string,
      walletAddress: string,
    }
  }, ...
]
```

## `setProtocols`

When connected via WebSocket, the server may send a `setProtocols` notification to the client to indicate the protocols it supports. Protocols are identified by `interfaceId` and configuration params include the `chainId`, `swapContractAddress`, and `walletAddress` the server intends to use.

```typescript
setProtocols([
  {
    interfaceId: string,
    params: {
      chainId: string,
      swapContractAddress: string,
      walletAddress: string,
    }
  }, ...
])
```

## `getTokens`

Peers may call `getTokens` to determine tokens supported by another peer, whether connected via HTTPS or WebSocket. The return value is an array of tokens identified by the token contract address.

```typescript
getTokens(): [ tokenContractAddress, ... ]
```

## `setTokens`

When connected via WebSocket, the server may send a `setTokens` notification to indicate the tokens it supports.

```typescript
setTokens([ tokenContractAddress, ... ])
```

# RequestForQuoteERC20

AirSwap [RequestForQuoteERC20](./glossary.md#request-for-quote-rfq) is a client-server protocol used by market makers running servers from which clients request ERC20 orders via HTTP or WebSocket. In RFQ, the server is the signer (i.e. `signerAmount`, `signerToken`) and the client is the sender (i.e. `senderAmount`, `senderToken`).

## `getSignerSideOrderERC20`

Given a `senderAmount` the server returns a signed OrderERC20 including the `signerAmount`. The client is **selling** to the server. Client may optionally request a minimum expiry in seconds. Returns an order.

```typescript
getSignerSideOrderERC20(
  chainId: string,      // ID of the chain intended for use
  swapContract: string, // Swap contract intended for use
  signerToken: string,  // Token the signer would transfer
  senderAmount: string, // Amount the sender would transfer
  senderToken: string,  // Token the sender would transfer
  senderWallet: string, // Wallet of the sender
  minExpiry?: string,   // Minimum required expiry
  proxyingFor?: string, // Ultimate counterparty
): OrderERC20
```

## `getSenderSideOrderERC20`

Given a `signerAmount` the server returns a signed OrderERC20 with a `senderAmount`. The client is **buying** from the server. Client may optionally request a minimum expiry in seconds. Returns an order.

```typescript
getSenderSideOrderERC20(
  chainId: string,      // ID of the chain intended for use
  swapContract: string, // Swap contract intended for use
  signerToken: string,  // Token the signer would transfer
  signerAmount: string, // Amount the signer would transfer
  senderToken: string,  // Token the sender would transfer
  senderWallet: string, // Wallet of the sender
  minExpiry?: string,   // Minimum required expiry
  proxyingFor?: string, // Ultimate counterparty
): OrderERC20
```

## `getPricingERC20`

Client may request soft pricing for a list of token pairs. Client may optionally request a minimum expiry in seconds to be factored into pricing. Returns current formula or levels for each pair.

```typescript
getPricingERC20(
  pairs: [
    {
      baseToken: string,
      quoteToken: string
    }, ...
  ],
  minExpiry?: string,
): [
  {
    baseToken: string,
    quoteToken: string,
    minimum: string,
    bid: Levels | Formula,
    ask: Levels | Formula
  }, ...
]
```

Client may also request pricing for all available pairs.

```typescript
getAllPricingERC20(
  minExpiry?: string,
): [
  {
    baseToken: string,
    quoteToken: string,
    minimum: string,
    bid: Levels | Formula,
    ask: Levels | Formula
  }, ...
]
```

## Example

To find counterparties, see [Discovery](discovery.md). With server URLs in hand, clients may call `getSignerSideOrderERC20` or `getSenderSideOrderERC20` as JSON-RPC requests on servers that support RequestForQuoteERC20.

### Client Request

```javascript
POST / HTTP/1.1
Content-Length: ...
Content-Type: application/json

{
  "jsonrpc": "2.0",
  "id": 123,
  "method": "getSignerSideOrderERC20",
  "params": {
    "chainId": "1",
    "swapContract": "0xd82FA167727a4dc6D6F55830A2c47aBbB4b3a0F8",
    "signerToken": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "senderWallet": "0xed669F5fe2A37Ef204DB178c7a982717B9f03Ec2",
    "senderToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "senderAmount": "1000000000000000000",
  }
}
```

Requests can also be made using curl or wget for debugging.

```bash
curl -H 'Content-Type: application/json' \
     -d '{"jsonrpc":"2.0","id":"123","method":"getSignerSideOrderERC20","params":{"chainId":"1","swapContract":"0xd82FA167727a4dc6D6F55830A2c47aBbB4b3a0F8","signerToken":"0xdac17f958d2ee523a2206206994597c13d831ec7","senderWallet":"0xed669F5fe2A37Ef204DB178c7a982717B9f03Ec2","senderToken":"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2","senderAmount":"1000000000000000000"}}' \
     http://localhost:3000/
```

### Server Response

See the [signatures](signatures.md) page for details on signing an OrderERC20.

```javascript
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: *
Access-Control-Allow-Methods: POST, OPTIONS
Content-Length: ...
Content-Type: application/json

{
  "jsonrpc": "2.0",
  "id": 123,
  "result": {
    "nonce": "99",
    "expiry": "1566941284",
    "signerWallet": "0x73BCEb1Cd57C711feaC4224D062b0F6ff338501f",
    "signerToken": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "signerAmount": "100000000",
    "senderToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "senderAmount": "1000000000000000000",
    "v": "28",
    "r": "0x67e0723b0afd357d4f28523bf633dfee16e0eab2f3cbcf8ce1afd32a035d2764",
    "s": "0x1b71e6e633b3334fc88faf4ec0ca1b7611883bc0de4df7024abec07af78b97c3"
  }
}
```

### Client Settlement

With an OrderERC20 in hand, the client sends an Ethereum transaction to the [SwapERC20](https://about.airswap.io/contract-deployments) contract. The `swapLight` function is gas efficient, whereas the `swap` function provides protocol fee rebates to staked AST holders. Either function can settle a correctly signed OrderERC20. A successful swap emits a `SwapERC20` event.

```typescript
  function swapLight(
    uint256 nonce,
    uint256 expiry,
    address signerWallet,
    address signerToken,
    uint256 signerAmount,
    address senderToken,
    uint256 senderAmount,
    uint8 v,
    bytes32 r,
    bytes32 s
  ) external;
```

```typescript
  event SwapERC20(
    uint256 indexed nonce,
    address indexed signerWallet,
    address signerToken,
    uint256 signerAmount,
    uint256 protocolFee,
    address indexed senderWallet,
    address senderToken,
    uint256 senderAmount
  );
```

The server or client may subscribe to a filter for a `SwapERC20` event with the order `nonce` to track fills.

# LastLookERC20

AirSwap [LastLookERC20](./glossary.md#last-look-ll) is used by servers to stream quotes to clients. Clients periodically send signed OrderERC20s to the server, which then has the "last look" and option to send it to the EVM for settlement. In last-look, the client is the signer (e.g. `signerAmount`, `signerToken`) and the server is the sender (e.g. `senderAmount`, `senderToken`).

## `subscribePricingERC20`

Client subscribes to pricing updates for a list of token pairs. Returns current formula or levels for each pair.

```typescript
subscribePricingERC20([
  {
    baseToken: string,
    quoteToken: string
  }, ...
]): [
  {
    baseToken: string,
    quoteToken: string,
    minimum: string,
    bid: Levels | Formula,
    ask: Levels | Formula
  }, ...
]
```

Client may also subscribe to pricing updates for all available pairs. Returns current formula or levels for each pair.

```typescript
subscribeAllPricingERC20(): [
  {
    baseToken: string,
    quoteToken: string,
    minimum: string,
    bid: Levels | Formula,
    ask: Levels | Formula
  }, ...
]
```

## `unsubscribePricingERC20`

Client unsubscribes from pricing updates for a list of token pairs. Returns a boolean.

```typescript
unsubscribePricingERC20([
  {
    baseToken: string,
    quoteToken: string
  }, ...
]): boolean
```

Client may also unsubscribe from all subscriptions. Returns a boolean.

```typescript
unsubscribeAllPricingERC20(): boolean
```

## `setPricingERC20`

Server updates pricing for one or more token pairs. Returns a boolean.

```typescript
setPricingERC20(
  pricing: [
    {
      baseToken: string,
      quoteToken: string,
      minimum: string,
      bid: Levels | Formula,
      ask: Levels | Formula
    }, ...
  ]
)
```

## `considerOrderERC20`

Client provides a priced OrderERC20 to the server. Returns boolean `true` if accepted by the server.

```typescript
considerOrderERC20(
  nonce: string,
  expiry: string,
  signerWallet: string,
  signerToken: string,
  signerAmount: string,
  senderToken: string,
  senderAmount: string,
  v: string,
  r: string,
  s: string
): boolean
```

## Example

To find counterparties, see [Discovery](discovery.md). With WebSocket server URLs in hand (i.e. the URL schema is `wss`), clients connect to each and calls methods as JSON-RPC over WebSocket.

### WebSocket

Upon connection, the server calls `setProtocols` on the client.

```javascript
{
  "jsonrpc": "2.0",
  "method": "setProtocols",
  "id": 123,
  "params": [
    [
      {
        "interfaceId": "0x2ca4c820",
        "params": {
          "chainId": "1",
          "swapContractAddress": "0xd82FA167727a4dc6D6F55830A2c47aBbB4b3a0F8",
          "walletAddress": "0x73BCEb1Cd57C711feaC4224D062b0F6ff338501f"
        }
      }
    ]
  ]
}
```

The client may then subscribe to pricing updates.

```javascript
{
  "jsonrpc": "2.0",
  "method": "subscribeAllPricingERC20",
  "id": 123,
  "params": []
}
```

The server then continuously updates the client with new pricing.

```javascript
{
  "jsonrpc": "2.0",
  "method": "setPricingERC20",
  "id": 123,
  "params": [
    [
      {
        "baseToken": "0xdac17f958d2ee523a2206206994597c13d831ec7",
        "quoteToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        "bid": [
          ["100", "0.00053"],
          ["1000", "0.00061"],
          ["10000", "0.0007"]
        ],
        "ask": [
          ["100", "0.00055"],
          ["1000", "0.00067"],
          ["10000", "0.0008"]
        ]
      }
    ]
  ]
}
```

The client may send an OrderERC20 to the server to consider a swap.

```javascript
{
  "jsonrpc": "2.0",
  "id": 123,
  "method": "considerOrderERC20",
  "params": {
    "nonce": "1",
    "expiry": "1629117312",
    "signerWallet": "0x0...",
    "signerToken": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "signerAmount": "1000000000",
    "senderToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "senderAmount": "530000000000000000",
    "v": "28",
    "r": "0x0...",
    "s": "0x0..."
  }
}
```

With an OrderERC20 in hand, the server sends an Ethereum transaction to the [SwapERC20](https://about.airswap.io/contract-deployments) contract. The `swapLight` function is gas efficient, whereas the `swap` function provides protocol fee rebates to staked AST holders. Either function can settle a correctly signed OrderERC20. A successful swap emits a `SwapERC20` event.

The client may subscribe to a filter for a `SwapERC20` event with the `nonce` they provided to the server to track fills.

# Indexing

AirSwap Indexing is used by peers to store and fetch orders on other peers.

## `addOrder`

Peers may call `addOrder` to add an order to another peer.

```typescript
addOrder(
  order: FullOrder,
  tags: string[]
): boolean
```

## `getOrders`

Peers may call `getOrders` to query for orders indexed by another peer.

```typescript
getOrders(
  filter: OrderFilter,
  offset: number,
  limit: number,
  by = Indexes.EXPIRY,
  direction = Direction.ASC
): (
  orders: FullOrder[],
  offset: number,
  total: number
)
```

## `getTags`

Peers may call `getTags` to get all available tags for a token.

```typescript
getTags(
  token: address
): string[]
```

Where `OrderFilter`, `Indexes`, and `Direction` [can be found here](https://github.com/airswap/airswap-protocols/blob/v4.2/tools/utils/src/server.ts).

# IndexingERC20

AirSwap Indexing is used by peers to store and fetch ERC20 orders on other peers.

## `addOrderERC20`

Peers may call `addOrderERC20` to add an order to another peer.

```typescript
addOrderERC20(
  order: FullOrderERC20,
  tags: string[]
): boolean
```

## `getOrdersERC20`

Peers may call `getOrdersERC20` to query for orders indexed by another peer.

```typescript
getOrdersERC20(
  filter: OrderFilter,
  offset: number,
  limit: number,
  by = Indexes.EXPIRY,
  direction = Direction.ASC
): (
  orders: FullOrderERC20[],
  offset: number,
  total: number
)
```

Where `OrderFilter`, `Indexes`, and `Direction` [can be found here](https://github.com/airswap/airswap-protocols/blob/v4.2/tools/utils/src/server.ts).

## `getTags`

Peers may call `getTags` to get all available tags for a token.

```typescript
getTags(
  token: address
): string[]
```

# Pricing Formats

Server pricing can be communicated either by levels or a formula. All input and output values for pricing are in base units rather than atomic units. When generating orders, all values must be converted to atomic units.

### Levels

A server may provide "levels" to determine its pricing for various tokens and amounts. Each level is a tuple of amount and price at that level. Amounts and minimums are all in `baseToken`. Each level indicates price “up to” the specified amount and therefore the last level is the maximum.

```javascript
;[
  {
    baseToken: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    quoteToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    bid: [
      ['100', '0.00053'],
      ['1000', '0.00061'],
      ['10000', '0.0007'],
    ],
    ask: [
      ['100', '0.00055'],
      ['1000', '0.00067'],
      ['10000', '0.0008'],
    ],
  },
  {
    baseToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    quoteToken: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    bid: [
      ['0.5', '2000'],
      ['1', '2010'],
      ['10', '2050'],
    ],
    ask: [
      ['0.5', '2001'],
      ['1', '2015'],
      ['10', '2060'],
    ],
  },
]
```

#### Examples

**Client wants to swap `1000` USDT into WETH.** Client looks up baseToken USDT and quoteToken WETH and uses the `bid` levels above. The first `100` would be multiplied by `0.00053` and second `900` would be multiplied by `0.00061` for a total of `0.602` WETH.

**Client wants to swap `1` WETH into USDT.** Client looks up baseToken WETH and quoteToken USDT and uses the `bid` levels above. The first `0.5` would be multiplied by `2000` and second `0.5` would be multiplied by `2010` for a total of `2005` USDT.

**Client wants to swap WETH into `1000` USDT.** Client looks up baseToken USDT and quoteToken WETH and uses the `ask` levels above. The first `100` would be multiplied by `0.00055` and second `900` would be multiplied by `0.00067` for a total of `0.658` WETH.

**Client wants to swap USDT into `1` WETH.** Client looks up baseToken WETH and quoteToken USDT and uses the `ask` levels above. The first `0.5` would be multiplied by `2001` and second `0.5` would be multiplied by `2015` for a total WETH amount of `2008` USDT.

### Formula

The server can specify formulas to use for pricing. Each formula is an expression with operations including addition, subtraction, multiplication, and division, where `x` is provided by the client.

```javascript
;[
  {
    baseToken: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    quoteToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    bid: 'x*0.00053',
    ask: 'x*0.00055',
  },
  {
    baseToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    quoteToken: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    bid: 'x*2000',
    ask: 'x*2001',
  },
]
```

#### Examples

**Client wants to swap `1000` USDT into WETH.** Client looks up baseToken USDT and quoteToken WETH and uses the `bid` levels above. `1000` is multiplied by `0.00053` for a total of `0.53` WETH.

**Client wants to swap `1` WETH into USDT.** Client looks up baseToken WETH and quoteToken USDT and uses the `bid` levels above. `1` is multiplied by `2000` for a total of `2000` WETH.

**Client wants to swap WETH into `1000` USDT.** Client looks up baseToken USDT and quoteToken WETH and uses the `ask` levels above. `1000` is multiplied by `0.00055` for a total of `0.55` WETH.

**Client wants to swap USDT into `1` WETH.** Client looks up baseToken WETH and quoteToken USDT and uses the `ask` levels above. `1` is multiplied by `2001` for a total of `2001` WETH.