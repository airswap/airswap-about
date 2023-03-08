AirSwap trading technology is fully decentralized, powered by smart contracts enabling counterparty discovery and performing atomic swaps. AirSwap protocols communicate prices **off-chain** and settle **on-chain**. Peers take the form of individuals trading manually or software trading in an automated way, in which case market makers run servers that implement the following protocols.

For information on finding counter-parties, see [Discovery](discovery.md).

# RFQ

[AirSwap Request-for-Quote (RFQ)](./glossary.md#request-for-quote-rfq) is an automated request-response protocol used by market makers running web servers from which clients request orders via HTTP or WebSocket.

## `initialize`

If connected via WebSocket, the server must call initialize upon connection by the client and indicate `request-for-quote` among its list of supported protocols.

```typescript
initialize([
  {
    name: 'request-for-quote',
    version: '1.0.0'
  }, ...
})
```

## `getSignerSideOrderERC20`

Given a `senderAmount` the server returns a signed order with a `signerAmount`. The client is **selling** to the server.

```typescript
getSignerSideOrderERC20(
  chainId: string,      // ID of the chain intended for use
  swapContract: string, // Swap contract intended for use
  senderAmount: string, // Amount the sender would transfer
  signerToken: string,  // Token the signer would transfer
  senderToken: string,  // Token the sender would transfer
  senderWallet: string, // Wallet of the sender
  proxyingFor: string,  // Ultimate counterparty of the swap (Optional)
)
```

## `getSenderSideOrderERC20`

Given a `signerAmount` the server returns a signed order with a `senderAmount`. The client is **buying** from the server.

```typescript
getSenderSideOrderERC20(
  chainId: string,      // ID of the chain intended for use
  swapContract: string, // Swap contract intended for use
  signerAmount: string, // Amount the signer would transfer
  signerToken: string,  // Token the signer would transfer
  senderToken: string,  // Token the sender would transfer
  senderWallet: string, // Wallet of the sender
  proxyingFor: string,  // Ultimate counterparty of the swap (Optional)
)
```

## Examples

Clients find servers using the [Discovery](discovery.md) protocol. With server URLs in hand, clients call `getSignerSideOrderERC20` or `getSenderSideOrderERC20` as JSON-RPC requests.

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
    "chainId": "1"
    "swapContract": "0x522D6F36c95A1b6509A14272C17747BbB582F2A6",
    "signerToken": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "senderWallet": "0x1FF808E34E4DF60326a3fc4c2b0F80748A3D60c2",
    "senderToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "senderAmount": "1000000000000000000",
  }
}
```

Requests can also easily be made using curl.

```bash
curl -H 'Content-Type: application/json' \
     -d '{"jsonrpc":"2.0","id":"123","method":"getSignerSideOrderERC20","params":{"chainId":"1","swapContract":"0x522D6F36c95A1b6509A14272C17747BbB582F2A6","signerToken":"0xdac17f958d2ee523a2206206994597c13d831ec7","senderWallet":"0x1FF808E34E4DF60326a3fc4c2b0F80748A3D60c2","senderToken":"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2","senderAmount":"1000000000000000000"}}' \
     http://localhost:3000/
```

### Server Response

See the [signatures](signatures.md) page for creating and signing an order.

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

With an order in hand, the client sends an Ethereum transaction to the [SwapERC20](https://docs.airswap.io/contract-deployments) contract. The `swapLight` function is gas efficient, whereas the `swap` function provides protocol fee rebates to staked AST holders. Either function can settle a properly signed order. A successful swap emits a `SwapERC20` event.

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

The server or client may subscribe to a filter for a `SwapERC20` event with the order `nonce`.

# Last Look

[AirSwap Last Look (LL)](./glossary.md#last-look-ll) is a protocol used by makers to stream quotes to takers. Takers periodically send signed orders to the maker, which then has the "last look" and option to fill it.

## `initialize`

To support Last Look, the server must call initialize upon connection by the client and indicate `last-look` among its list of supported protocols. Additional params include the `chainId` and `swapContract` the server intends to use, the `senderWallet` the server intends to use, and optionally a `senderServer` if the server is not receiving `consider` calls over the socket and instead an alternative JSON-RPC over HTTP endpoint. The initialize method either returns `true` or throws an error if something went wrong on the client side.

```typescript
initialize([
  {
    name: "last-look",
    version: "1.0.0",
    params: {
      chainId: number,
      swapContract: string,
      senderWallet: string,
      senderServer?: string,
    }
  }, ...
]): boolean
```

## `subscribe`

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

## `unsubscribe`

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

## `updatePricing`

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

## `consider`

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

## Pricing

Server pricing can be communicated either by levels or a formula. All input and output values for pricing are in base units rather than atomic units. When generating orders, all values must be converted to atomic units.

### Levels

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

## Protocol

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
          "chainId": 1,
          "swapContract": "0x522D6F36c95A1b6509A14272C17747BbB582F2A6",
          "senderWallet": "0x73BCEb1Cd57C711feaC4224D062b0F6ff338501f",
          "senderServer": "www.maker.com",
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

After the server accepts an order, parameters are submitted as an Ethereum transaction to the `swapLight` function on the [SwapERC20](deployments.md) contract, which emits a `SwapERC20` event on success.

The client may subscribe to a filter for a `SwapERC20` event with the `nonce` they provided to the server.
