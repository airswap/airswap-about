# Last Look

AirSwap Last Look \(LL\) is a protocol used by market makers to stream quotes to takers. Takers periodically send signed orders to the maker, which then has the “last look” and option to fill it.

**Protocol Features**

* Takers can see quotes without connecting a wallet, and quotes update in realtime
* Takers don't submit or spend gas on transactions, the maker does instead
* Better prices from makers since their prices are not locked into an expiry

There is a possibility the maker declines the order because the market has moved, but they're generally amenable to small fluctuations to maintain a good trading relationship with the taker.

**Protocol Summary**

Last Look is only available over **WebSocket**. In Last Look, clients are **signers** and servers are **senders**.

1. Client connects to server via WebSocket and subscribes to pricing.
2. Server streams pricing to client, which in turn sends orders to the server using the pricing.
3. Server may send the order to Ethereum for settlement.

For information on finding counter-parties, see [Discovery](discovery.md).

## Methods

### `initialize`

Upon connection the server may indicate Last Look among its list of supported protocols. Additional params may be included for the `swapContract` the it intends to use, the `senderWallet` it intends to use, and optionally a `senderServer` if the server is not receiving `consider` calls over the socket and instead an alternative JSON-RPC over HTTP endpoint.

```typescript
initialize([
  {
    name: 'last-look',
    version: '1.0.0',
    params: {
      swapContract: string,
      senderWallet: string,
      senderServer: string,
    }
  }, ...
})
```

### `subscribe`

Client subscribes to pricing updates for a list of token pairs. Returns current formula or levels for each pair.

```typescript
subscribe([
  {
    baseToken: string,
    quoteToken: string
  }, { ... }
]): boolean
```

Client may also subscribe to pricing updates for all available pairs.

```typescript
subscribeAll(): boolean
```

### `unsubscribe`

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

### `updatePricing`

Server updates pricing for a token pair. Returns no result.

```typescript
update([
  {
    baseToken: string,
    quoteToken: string,
    minimum: string,
    bid: Levels | Formula,
    ask: Levels | Formula
  }, { ... }
])
```

### `consider`

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
[
  {
    "baseToken": "0xdac17f958d2ee523a2206206994597c13d831ec7", // USDT
    "quoteToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", // WETH
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
  },
  {
    "baseToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", // WETH
    "quoteToken": "0xdac17f958d2ee523a2206206994597c13d831ec7", // USDT
    "bid": [
      ["0.5", "2000"],
      ["1", "2010"],
      ["10", "2050"]
    ],
    "ask": [
      ["0.5", "2001"],
      ["1", "2015"],
      ["10", "2060"]
    ]
  }
]
```

#### Examples

**Client wants to swap `1000` USDT into WETH.** Client looks up baseToken USDT and quoteToken WETH and uses the `bid` levels above. The first `100` would be multiplied by `0.00053` and second `900` would be multiplied by `0.00061` for a total of `0.602` WETH.

**Client wants to swap `1` WETH into USDT.** Client looks up baseToken WETH and quoteToken USDT and uses the `bid` levels above. The first `0.5` would be multiplied by `2000` and second `0.5` would be multiplied by `2010` for a total of `2005` USDT.

**Client wants to swap WETH into `1000` USDT.** Client looks up baseToken USDT and quoteToken WETH and uses the `ask` levels above. The first `100` would be multiplied by `0.00055` and second 90 would be multiplied by `0.00067` for a total of `0.658` WETH.

**Client wants to swap USDT into `1` WETH.** Client looks up baseToken WETH and quoteToken USDT and uses the `ask` levels above. The first `0.5` would be multiplied by `2001` and second 90 would be multiplied by `2015` for a total WETH amount of `2008` USDT.

### Formula

The server can specify formulas to use for pricing. Each formula is an expression with operations including addition, subtraction, multiplication, and division, where `x` is provided by the client.

```javascript
[
  {
    "baseToken": "0xdac17f958d2ee523a2206206994597c13d831ec7", // USDT
    "quoteToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", // WETH
    "bid": "x*0.00053",
    "ask": "x*0.00055"
  },
  {
    "baseToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", // WETH
    "quoteToken": "0xdac17f958d2ee523a2206206994597c13d831ec7", // USDT
    "bid": "x*2000",
    "ask": "x*2001"
  }
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
  "params": {
    "baseToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "quoteToken": "0xdac17f958d2ee523a2206206994597c13d831ec7"
  }
}
```

The client may then subscribe to pricing updates.

```javascript
{
  "jsonrpc": "2.0",
  "method": "subscribeAll",
  "id": 123,
  "params": []
}
```

The server then continuously updates the client with new pricing.

```javascript
{
  "jsonrpc": "2.0",
  "method": "updatePricing",
  "params": [
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

After the server accepts an order, parameters are submitted as an Ethereum transaction to the `swap` function on the [Light](deployments.md) contract, which emits a `Swap` event on success.

```javascript
  function swap(
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

```javascript
  event Swap(
    uint256 indexed nonce,
    uint256 timestamp,
    address indexed signerWallet,
    IERC20 signerToken,
    uint256 signerAmount,
    uint256 signerFee,
    address indexed senderWallet,
    IERC20 senderToken,
    uint256 senderAmount
  );
```

The client may subscribe to a filter for a `Swap` event with the nonce they provided to the server.

