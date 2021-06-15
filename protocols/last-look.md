Last look is implemented by servers that provide quote levels and accept signed orders provided by clients.

# Protocol

1. Client establishes a websocket connection to the Server.

2. Client calls `subscribeLevels` on the Server.

3. Server periodically calls `updateLevels` on the Client.

4. Client periodically calls `provideOrder` to the Server with a signed order.

5. Client calls `unsubscribeLevels` to unsubscribe from the stream.

# Server Methods

In Last Look protocols, the Client is the order signer and Server the order sender.

### `subscribeLevels`

A request to receive updates to quote levels for a token pair. Returns the current quote levels.

```TypeScript
subscribeLevels(
  signerToken: string, // Token the Client would transfer
  senderToken: string  // Token the Server would transfer
): Levels
```

### `unsubscribeLevels`

A request to stop receiving updates to quote levels for a token pair. Returns a boolean.

```TypeScript
subscribeLevels(
  signerToken: string, // Token the Client would transfer
  senderToken: string  // Token the Server would transfer
): boolean
```

### `getLevels`

Given a token pair, return an array of quote levels.

```TypeScript
getLevels(
  signerToken: string, // Token the Client would transfer
  senderToken: string  // Token the Server would transfer
): Levels
```

### `provideOrder`

Provide a signed order to be filled or ignored. Response should be a transaction ID.

```TypeScript
provideOrder(
  order: Order // Signed order as specified below
): string
```

# Client Methods

### `updateLevels`

Update quote levels for a token pair. This is a notification so returns no result.

```TypeScript
updateLevels(
  levels: Levels // Levels object as specified below
)
```

# Types

### `Levels`

Tuple with an amount of signerToken and respective amount of senderToken in atomic units.

```TypeScript
{
  signerToken: string               // Token the Client would transfer
  senderToken: string               // Token the Server would transfer
  amounts: Array<[string, string]>  // Array of quote levels
  timestamp?: string                // Optional timestamp of the quote levels
  url?: string                      // Optional url of the server
}
```

### `Order`

Object with the parameters of a firm order to be filled.

```TypeScript
{
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
}
```
