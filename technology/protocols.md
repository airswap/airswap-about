AirSwap trading technology is fully decentralized, enabled by smart contracts for counterparty discovery and performing atomic swaps. AirSwap protocols communicate prices **off-chain** and settle **on-chain**. Peers take the form of individuals trading manually or software trading in an automated way, in which case market makers run servers that implement the following protocols.

# RFQ

AirSwap Request-for-Quote \(RFQ\) is used by [makers](makers.md) to provide orders with expirations. Takers will request an order periodically and have the option to fill it.

**Protocol Features**

- Taker has the option to fill an order.
- Taker is guaranteed the price until expiry.

**Protocol Summary**

RFQ is available over **HTTP** or **WebSocket**. In RFQ, servers are **signers** and clients are **senders**.

1. Client sends the server a JSON-RPC request.
2. Server responds with a signed order.
3. Client may send the signed order to Ethereum for settlement.

For information on finding counter-parties, see [Discovery](discovery.md).

### Methods

#### `initialize`

To support RFQ via WebSocket, the server must call initialize upon connection by the client and indicate `request-for-quote` among its list of supported protocols.

```typescript
initialize([
  {
    name: 'request-for-quote',
    version: '1.0.0'
  }, ...
})
```

#### `getSignerSideOrder`

Given a `senderAmount` the server returns a signed order with a `signerAmount`. The client is **selling** to the server.

```typescript
getSignerSideOrder(
  senderAmount: string, // Amount the sender would transfer
  signerToken: string,  // Token the signer would transfer
  senderToken: string,  // Token the sender would transfer
  senderWallet: string, // Wallet of the sender
  swapContract: string, // Swap contract intended for use
  proxyingFor: string,  // Ultimate counterparty of the swap (Optional)
)
```

#### `getSenderSideOrder`

Given a `signerAmount` the server returns a signed order with a `senderAmount`. The client is **buying** from the server.

```typescript
getSenderSideOrder(
  signerAmount: string, // Amount the signer would transfer
  signerToken: string,  // Token the signer would transfer
  senderToken: string,  // Token the sender would transfer
  senderWallet: string, // Wallet of the sender
  swapContract: string, // Swap contract intended for use
  proxyingFor: string,  // Ultimate counterparty of the swap (Optional)
)
```

### Client

For information on finding counterparties, see the [Discovery](discovery.md) protocol. With server URLs in hand, clients call `getSignerSideOrder` or `getSenderSideOrder` as JSON-RPC requests.

#### Example Request

```javascript
POST / HTTP/1.1
Content-Length: ...
Content-Type: application/json

{
  "jsonrpc": "2.0",
  "id": 123,
  "method": "getSignerSideOrder",
  "params": {
    "signerToken": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "senderWallet": "0x1FF808E34E4DF60326a3fc4c2b0F80748A3D60c2",
    "senderToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "senderAmount": "1000000000000000000",
    "swapContract": "0x522D6F36c95A1b6509A14272C17747BbB582F2A6"
  }
}
```

A response looks like the [example](request-for-quote.md#example-response) below. Requests can be made using curl for testing.

```bash
curl -H 'Content-Type: application/json' \
     -d '{"jsonrpc":"2.0","id":"123","method":"getSignerSideOrder","params":{"signerToken":"0xdac17f958d2ee523a2206206994597c13d831ec7","senderWallet":"0x1FF808E34E4DF60326a3fc4c2b0F80748A3D60c2","senderToken":"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2","senderAmount":"1000000000000000000","swapContract":"0x522D6F36c95A1b6509A14272C17747BbB582F2A6"}}' \
     http://localhost:3000/
```

#### Swap Contract

With an order in hand, parameters are submitted as an Ethereum transaction to the [Swap](https://docs.airswap.io/contract-deployments) contract, which emits a `Swap` event on success. The `light` function is gas more efficient, whereas the `swap` function provides protocol fee rebates to staked AST holders. Either function can settle a properly signed order.

```typescript
  function light(
    uint256 nonce,
    uint256 expiry,
    address signerWallet,
    IERC20 signerToken,
    uint256 signerAmount,
    IERC20 senderToken,
    uint256 senderAmount,
    uint8 v,
    bytes32 r,
    bytes32 s
  ) external;
```

```typescript
  event Swap(
    uint256 indexed nonce,
    uint256 timestamp,
    address indexed signerWallet,
    IERC20 signerToken,
    uint256 signerAmount,
    uint256 protocolFee,
    address indexed senderWallet,
    IERC20 senderToken,
    uint256 senderAmount
  );
```

The server or client may subscribe to a filter for a `Swap` event with the nonce they provided to the client.

### Server

See the [signatures](./signatures.md) page for creating and signing an order.

#### Example Response

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

# Last Look

AirSwap Last Look \(LL\) is a protocol used by [makers](makers.md) to stream quotes to takers. Takers periodically send signed orders to the maker, which then has the “last look” and option to fill it.

**Protocol Features**

- Takers can see quotes without connecting a wallet, and quotes update in realtime.
- Takers don't submit or spend gas on transactions, the maker does instead.
- Better prices from makers since their prices are not locked into an expiry.

There is a possibility the maker declines the order because the market has moved, but they're generally amenable to small fluctuations to maintain a good trading relationship with the taker.

**Protocol Summary**

Last Look is only available over **WebSocket**. In Last Look, clients are **signers** and servers are **senders**.

1. Client connects to server via WebSocket and subscribes to pricing.
2. Server streams pricing to client, which in turn sends orders to the server using the pricing.
3. Server may send the order to Ethereum for settlement.

For information on finding counter-parties, see [Discovery](discovery.md).

### Methods

#### `initialize`

To support Last Look, the server must call initialize upon connection by the client and indicate `last-look` among its list of supported protocols. Additional params may be included for the `swapContract` the server intends to use, the `senderWallet` the server intends to use, and optionally a `senderServer` if the server is not receiving `consider` calls over the socket and instead an alternative JSON-RPC over HTTP endpoint. The initialize method either returns `true` or throws an error if something went wrong on the client side.

```typescript
initialize([
  {
    name: "last-look",
    version: "1.0.0",
    params: {
      swapContract: string,
      senderWallet: string,
      senderServer?: string,
    }
  }, ...
]): boolean
```

#### `subscribe`

Client subscribes to pricing updates for a list of token pairs. Returns current formula or levels for each pair.

```typescript
subscribe([
  {
    baseToken: string,
    quoteToken: string
  }, { ... }
]): [
  {
    baseToken: string,
    quoteToken: string,
    minimum: string,
    bid: Levels | Formula,
    ask: Levels | Formula
  }, { ... }
]
```

Client may also subscribe to pricing updates for all available pairs.

```typescript
subscribeAll(): [
  {
    baseToken: string,
    quoteToken: string,
    minimum: string,
    bid: Levels | Formula,
    ask: Levels | Formula
  }, { ... }
]
```

#### `unsubscribe`

Client unsubscribes from pricing updates for a list of token pairs. Returns a boolean.

```typescript
unsubscribe([
  {
    baseToken: string,
    quoteToken: string
  }, { ... }
]): boolean
```

Client may also unsubscribe from all subscriptions.

```typescript
unsubscribeAll(): boolean
```

#### `updatePricing`

Server updates pricing for one or more token pairs. Returns boolean `true` if accepted by the client.

```typescript
updatePricing([
  {
    baseToken: string,
    quoteToken: string,
    minimum: string,
    bid: Levels | Formula,
    ask: Levels | Formula
  }, { ... }
]): boolean
```

#### `consider`

Client provides a priced order to the server. If the server has set a `senderServer` this method is to be called on that URL via JSON-RPC over HTTP. Returns boolean `true` if accepted by the server.

```typescript
consider({
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
}): boolean
```

### Pricing

Server pricing can be communicated either by levels or a formula. All input and output values for pricing are in base units rather than atomic units. When generating orders, all values must be converted to atomic units.

#### Levels

The server can specify levels to use for pricing. Each level is a tuple of amount and price at that level.

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

##### Examples

**Client wants to swap `1000` USDT into WETH.** Client looks up baseToken USDT and quoteToken WETH and uses the `bid` levels above. The first `100` would be multiplied by `0.00053` and second `900` would be multiplied by `0.00061` for a total of `0.602` WETH.

**Client wants to swap `1` WETH into USDT.** Client looks up baseToken WETH and quoteToken USDT and uses the `bid` levels above. The first `0.5` would be multiplied by `2000` and second `0.5` would be multiplied by `2010` for a total of `2005` USDT.

**Client wants to swap WETH into `1000` USDT.** Client looks up baseToken USDT and quoteToken WETH and uses the `ask` levels above. The first `100` would be multiplied by `0.00055` and second `900` would be multiplied by `0.00067` for a total of `0.658` WETH.

**Client wants to swap USDT into `1` WETH.** Client looks up baseToken WETH and quoteToken USDT and uses the `ask` levels above. The first `0.5` would be multiplied by `2001` and second `0.5` would be multiplied by `2015` for a total WETH amount of `2008` USDT.

#### Formula

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

##### Examples

**Client wants to swap `1000` USDT into WETH.** Client looks up baseToken USDT and quoteToken WETH and uses the `bid` levels above. `1000` is multiplied by `0.00053` for a total of `0.53` WETH.

**Client wants to swap `1` WETH into USDT.** Client looks up baseToken WETH and quoteToken USDT and uses the `bid` levels above. `1` is multiplied by `2000` for a total of `2000` WETH.

**Client wants to swap WETH into `1000` USDT.** Client looks up baseToken USDT and quoteToken WETH and uses the `ask` levels above. `1000` is multiplied by `0.00055` for a total of `0.55` WETH.

**Client wants to swap USDT into `1` WETH.** Client looks up baseToken WETH and quoteToken USDT and uses the `ask` levels above. `1` is multiplied by `2001` for a total of `2001` WETH.

### Protocol

To find counterparties, see [Discovery](discovery.md). With server URLs in hand, clients connect to each and calls methods as JSON-RPC over WebSocket.

Upon connection, the server sends an `initialize` notification to the client.

```javascript
{
  "jsonrpc": "2.0",
  "method": "initialize",
  "id": "xyz",
  "params": [
    [
      {
        "name": "last-look",
        "version": "1.0.0",
        "params": {
          "swapContract": "0x522D6F36c95A1b6509A14272C17747BbB582F2A6",
          "senderWallet": "0x73BCEb1Cd57C711feaC4224D062b0F6ff338501f",
          "senderServer": "www.maker.com"
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
  "method": "subscribeAll",
  "id": "123",
  "params": []
}
```

The server then continuously updates the client with new pricing.

```javascript
{
  "jsonrpc": "2.0",
  "method": "updatePricing",
  "id": "qrs",
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

The client may send an order to the server to consider a swap.

```javascript
{
  "jsonrpc": "2.0",
  "id": "abc",
  "method": "consider",
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

After the server accepts an order, parameters are submitted as an Ethereum transaction to the `light` function on the [Swap](deployments.md) contract, which emits a `Swap` event on success.

```typescript
  function light(
    uint256 nonce,
    uint256 expiry,
    address signerWallet,
    IERC20 signerToken,
    uint256 signerAmount,
    IERC20 senderToken,
    uint256 senderAmount,
    uint8 v,
    bytes32 r,
    bytes32 s
  ) external;
```

```typescript
  event Swap(
    uint256 indexed nonce,
    uint256 timestamp,
    address indexed signerWallet,
    IERC20 signerToken,
    uint256 signerAmount,
    uint256 protocolFee,
    address indexed senderWallet,
    IERC20 senderToken,
    uint256 senderAmount
  );
```

The client may subscribe to a filter for a `Swap` event with the nonce they provided to the server.
