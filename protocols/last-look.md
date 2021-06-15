Last look is implemented by servers that provide quote levels and accept signed orders provided by clients.

# Protocol

1. Client establishes a websocket connection to the Server.

2. Client calls `subscribeLevels` on the Server.

3. Server periodically calls `updateLevels` on the Client.

4. Client periodically calls `provideOrder` to the Server with a signed order.

5. Client calls `unsubscribeLevels` to unsubscribe from the stream.

# Server Methods

In Last Look protocols, the client is the order signer and server the order sender.

### `getLevels`

Given a token pair, return an array of Levels.

```TypeScript
getLevels(
  signerToken: string, // Token the sender would transfer
  senderToken: string  // Token the signer would transfer
)
```

### `subscribeLevels`

Subscribe to level updates, which are delivered to the Client with `updateLevels`.

```TypeScript
subscribeLevels(
  signerToken: string, // Token the sender would transfer
  senderToken: string  // Token the signer would transfer
)
```

### `unsubscribeLevels`

Given a token pair, return a quote object with the maximum amounts a maker is willing to trade.

```TypeScript
subscribeLevels(
  signerToken: string, // Token the sender would transfer
  senderToken: string  // Token the signer would transfer
)
```

### `getMaxQuote`

Given a token pair, return a quote object with the maximum amounts a maker is willing to trade.

```TypeScript
getMaxQuote(
  signerToken: string, // Token the sender would transfer
  senderToken: string  // Token the signer would transfer
)
```

A successful `getMaxQuote` returns a Quote object.

### `getSignerSideQuote`

Given a `senderAmount` and token pair, return a complete quote. The `signerAmount` value is the amount the maker would send. The taker is **selling** to the maker.

```TypeScript
getSignerSideQuote(
  senderAmount: string, // Amount the sender would transfer
  signerToken: string,  // Token the sender would transfer
  senderToken: string   // Token the signer would transfer
)
```

A successful `getSignerSideQuote` returns a Quote object including the requested `signerAmount`

### `getSenderSideQuote`

Given a `signerAmount` and token pair, return a complete quote. The `senderAmount` value is the amount the taker would send. The taker is **buying** from the maker.

```TypeScript
getSenderSideQuote(
  signerAmount: string, // Amount the signer would transfer
  signerToken: string,  // Token the sender would transfer
  senderToken: string   // Token the signer would transfer
)
```

A successful `getSenderSideQuote` returns a Quote object including the requested `senderAmount`.

### `provideOrder`

Given an Order, assess its price, and perform a swap.

```TypeScript
provideOrder(
  order: Order // Order to fill
)
```

# Client Methods

### `updateLevels`

Given a token pair, return a quote object with the maximum amounts a maker is willing to trade.

```TypeScript
updateLevels(
  signerToken: string,  // Token the sender would transfer
  senderToken: string,  // Token the signer would transfer
  levels: Array<Level>  // Array of quote levels
)
```

# Types

### `Level`

Tuple with an amount of signerToken and respective amount of senderToken in atomic units.

```TypeScript
[string, string]
```

### `Quote`

Object with signer and sender tokens and maximum amounts.

```TypeScript
{
  signerToken: string,
  signerAmount: string,
  senderToken: string,
  senderAmount: string,
  timestamp?: string
  protocol?: string
  locator?: string
}
```
