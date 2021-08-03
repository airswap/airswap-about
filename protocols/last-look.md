Servers provide prices to Clients and Clients provide signed orders to Servers.

# Protocol

In Last Look, Clients are **signers** and Servers are **senders**.

1. Client establishes a bidirectional (e.g. WebSocket) connection to the Server.

2. Client calls `subscribeLevels` on the Server with a list of token pairs.

3. Server periodically calls `updateLevels` on the Client for each token pair.

4. Client calls `provideOrder` on the Server with a signed order.

5. Server may send the signed order to Ethereum for settlement.

# Levels

Each level is a tuple of amount and price at that level. In the following example, a `senderAmount` up to `100` has price `0.3`, from `100` to `1000` has price `0.2`, and so on.

```
  [100, 0.1],
  [1000, 0.2],
  [10000, 0.3]
```

The Server has indicated that it would accept orders with the following values:

1. `senderAmount` of `100` and `signerAmount` of `10`.
2. `senderAmount` of `500` and `signerAmount` of `90` because the first `100` is `10` and the next `400` is `80`.
3. `senderAmount` of `5000` and `signerAmount` of `1390` because the first `100` is `10`, the next `900` is `180`, and the next `4000` is `1200`.

There is no minimum and the maximum is the largest `senderAmount`.

# Server Methods

In Last Look protocols, the Client is the order signer and Server the order sender.

### `subscribeLevels`

A request to receive updates to for a token pair. Returns the current price levels.

```TypeScript
subscribeLevels(
  signerToken: string, // Token the Client would transfer
  senderToken: string  // Token the Server would transfer
): Levels
```

### `unsubscribeLevels`

A request to stop receiving updates for a token pair. Returns a boolean.

```TypeScript
unsubscribeLevels(
  signerToken: string, // Token the Client would transfer
  senderToken: string  // Token the Server would transfer
): boolean
```

### `getLevels`

Given a token pair, return an array of price levels.

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

Update price levels for a token pair. This is a notification so returns no result.

```TypeScript
updateLevels(
  levels: Levels // Levels object as specified below
)
```

# Example

Calls are JSON-RPC over WebSocket. Take `getLevels` as an example.

Client connects and sends the following message to the Server:

```json
{
  "jsonrpc": "2.0",
  "id": 123,
  "method": "getLevels",
  "params": {
    "signerToken": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "senderToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
  }
}
```

Server then sends the following message to the Client:

```json
{
  "jsonrpc": "2.0",
  "id": 123,
  "result": {
    "signerToken": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "senderToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "minimumAmount": "10",
    "levels": [
      [100, 0.002132234],
      [1000, 0.002002234],
      [10000, 0.001992234]
    ]
  }
}
```

# Types

### `Levels`

Tuple with an amount of signerToken and respective amount of senderToken in atomic units.

```TypeScript
{
  signerToken: string              // Token the Client would transfer
  senderToken: string              // Token the Server would transfer
  minimumAmount: string            // Minimum acceptable senderAmount
  levels: Array<[string, string]>  // Array of price levels
}
```

### `Order`

Object with the parameters of a signed order to be filled.

```TypeScript
{
  nonce: string,        // Single use nonce
  expiry: string,       // Expiry in seconds
  signerWallet: string, // Wallet of the Client
  signerToken: string,  // Token the Client would transfer
  signerAmount: string, // Amount the Client would transfer
  senderToken: string,  // Token the Server would transfer
  senderAmount: string, // Amount the Server would transfer
  v: string,            // ECDSA signature
  r: string,
  s: string
}
```
