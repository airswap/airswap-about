In Last Look, servers are signers and clients are senders.

1. Client connects to server via WebSocket and subcribes to pricing.
2. Server streams pricing updates to client.
3. Client sends a signed order to server for consideration.
4. Server has "last look" and the option to take the order.

# Methods: Server

## `subscribe`

Client subscribes to pricing updates for a list of token pairs. Returns current formula or levels for each pair.

```TypeScript
subscribe([
  {
    baseToken: string,
    quoteToken: string
  }, { ... }
]): [ Levels | Formula ]
```

## `unsubscribe`

Client unsubscribes from pricing updates for a list of token pairs. Returns a boolean.

```TypeScript
unsubscribe([
  {
    baseToken: string,
    quoteToken: string
  }, { ... }
]): boolean
```

## `consider`

Client provides a priced order to the server. If the server has set a `senderServer` this method is to be called on that URL via JSON-RPC over HTTP. Returns the transaction ID if accepted by the server.

```TypeScript
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
}): string
```

# Methods: Client

## `initialize`

Server provides values for the `swapContract` the it intends to use, the `senderWallet` it intends to use, and optionally a `senderServer` if the server is not receiving `consider` calls over the socket and instead an alternative JSON-RPC over HTTP endpoint. Returns no result.

```TypeScript
initialize({
  swapContract: string, // Swap contract intended for use.
  senderWallet: string, // Sender (server) wallet intended for use.
  senderServer: string, // Optional alternative server to receive orders.
})
```

## `update`

Server updates prices for a token pair. Returns no result.

```TypeScript
update([
  {
    baseToken: string,
    quoteToken: string,
    minimum: string,  // Optional minimum amount of baseToken.
    buy: Levels | Formula,
    sell: Levels | Formula
  }, { ... }
])
```

# Pricing

Server pricing can be communicated either by levels or a formula. All input and output values for pricing are in base units rather than atomic units. When generating orders, all values must be converted to atomic units.

## Levels

The server can specify levels to use for pricing. Each level is a tuple of amount and price at that level. In the following example, the server is buying up to `0.5` WETH at price `2000`, from `0.5` to `1` at price `2010`, and so on.

```
[{
  "baseToken": "0xdac17f958d2ee523a2206206994597c13d831ec7",  // USDT
  "quoteToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", // WETH
  "buy": [["100", "0.00053"], ["1000", "0.00061"], ["10000", "0.0007"]],
  "sell": [["100", "0.00055"], ["1000", "0.00067"], ["10000", "0.0008"]],
},{
  "baseToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",  // WETH
  "quoteToken": "0xdac17f958d2ee523a2206206994597c13d831ec7", // USDT
  "buy": [["0.5", "2000"], ["1", "2010"], ["10", "2050"]],
  "sell": [["0.5", "2001"], ["1", "2015"], ["10", "2060"]],
}]
```

### Scenarios

**Client wants to swap `1000` USDT into WETH.**
Client looks up baseToken USDT and quoteToken WETH and uses the `buy` levels above. The first `100` would be multiplied by `0.00053` and second `900` would be multiplied by `0.00061` for a total of `0.602` WETH.

**Client wants to swap `1` WETH into USDT.**
Client looks up baseToken WETH and quoteToken USDT and uses the `buy` levels above. The first `0.5` would be multiplied by `2000` and second `0.5` would be multiplied by `2010` for a total of `2005` USDT.

**Client wants to swap WETH into `1000` USDT.**
Client looks up baseToken USDT and quoteToken WETH and uses the `sell` levels above. The first `100` would be multiplied by `0.00055` and second 90 would be multiplied by `0.00067` for a total of `0.658` WETH.

**Client wants to swap USDT into `1` WETH.**
Client looks up baseToken WETH and quoteToken USDT and uses the `sell` levels above. The first `0.5` would be multiplied by `2001` and second 90 would be multiplied by `2015` for a total WETH amount of `2008` USDT.

## Formula

The server can specify formulas to use for pricing. Each formula is an expression with operations including addition, subtraction, multiplication, and division, where `x` is provided by the client.

```
[{
  baseToken: "0xdac17f958d2ee523a2206206994597c13d831ec7",  // USDT
  quoteToken: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", // WETH
  buy: "x*0.00053",
  sell: "x*0.00055",
},{
  baseToken: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",  // WETH
  quoteToken: "0xdac17f958d2ee523a2206206994597c13d831ec7", // USDT
  buy: "x*2000",
  sell: "x*2001",
}]
```

### Scenarios

**Client wants to swap `1000` USDT into WETH.**
Client looks up baseToken USDT and quoteToken WETH and uses the `buy` levels above. `1000` is multiplied by `0.00053` for a total of `0.53` WETH.

**Client wants to swap `1` WETH into USDT.**
Client looks up baseToken WETH and quoteToken USDT and uses the `buy` levels above. `1` is multiplied by `2000` for a total of `2000` WETH.

**Client wants to swap WETH into `1000` USDT.**
Client looks up baseToken USDT and quoteToken WETH and uses the `sell` levels above. `1000` is multiplied by `0.00055` for a total of `0.55` WETH.

**Client wants to swap USDT into `1` WETH.**
Client looks up baseToken WETH and quoteToken USDT and uses the `sell` levels above. `1` is multiplied by `2001` for a total of `2001` WETH.

# Protocol

**1. Client connects and subscribes to token pairs**

```
{
  "jsonrpc": "2.0",
  "method": "subscribe",
  "id": 123,
  "params": [{
    "baseToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "quoteToken": "0xdac17f958d2ee523a2206206994597c13d831ec7",
  }, {
    "baseToken": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "quoteToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  }]
}
```

**2. Server responds with current levels or formulas**

```
  "jsonrpc": "2.0",
  "id": 123,
  "result": [{
    "baseToken": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "quoteToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "buy": [["100", "0.00053"], ["1000", "0.00061"], ["10000", "0.0007"]],
    "sell": [["100", "0.00055"], ["1000", "0.00067"], ["10000", "0.0008"]],
  },{
    "baseToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "quoteToken": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "buy": [["0.5", "2000"], ["1", "2010"], ["10", "2050"]],
    "sell": [["0.5", "2001"], ["1", "2015"], ["10", "2060"]],
  }]
```

**3. Server updates continuously with new levels or formulas**

```
  "jsonrpc": "2.0",
  "method": "update",
  "params": [{
    "baseToken": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "quoteToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "buy": [["100", "0.00053"], ["1000", "0.00061"], ["10000", "0.0007"]],
    "sell": [["100", "0.00055"], ["1000", "0.00067"], ["10000", "0.0008"]],
  }]
```

**4. Client uses most recent price to provide an order**

```
  "jsonrpc": "2.0",
  "id": "abc",
  "method": "consider",
  "params": {
    "nonce": "1",
    "expiry": "1629117312",
    "signerWallet": "0x0...",
    signerToken": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    signerAmount: "1000000000",
    senderToken: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    senderAmount: "530000000000000000",
    v: "28",
    r: "0x0...",
    s: "0x0..."
  }
```

**4. Server submits a transaction to Ethereum**

Server assesses the price and may submit a `swap` transaction to the Light contract using the `params` from the `consider` method above. See [latest contract deployments](../contract-deployments.md)

# Types

### `Levels`

Tuple with an amount of baseToken and respective price of quoteToken. Each level specifies the price up to that amount.

```TypeScript
[[ amount: string, price: string ], ... ]
```

### `Formula`

String representing a mathematical expression to use for pricing.

```TypeScript
formula: string
```

### `Order`

Object with the parameters of a signed order to be filled.

```TypeScript
{
  nonce: string,        // Single use nonce
  expiry: string,       // Expiry in seconds
  signerWallet: string, // Wallet address of the client
  signerToken: string,  // Token the client would transfer
  signerAmount: string, // Amount the client would transfer
  senderToken: string,  // Token the server would transfer
  senderAmount: string, // Amount the server would transfer
  v: string,            // ECDSA signature
  r: string,
  s: string
}
```
