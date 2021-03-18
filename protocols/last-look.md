Last look is implemented by servers that provide quotes and accept signed orders provided by clients.

# Methods

In Last Look protocols, the client is the order signer and server the order sender.

### `getMaxQuote`

Given a token pair, return a quote object with the maximum amounts a maker is willing to trade.

```javascript
getMaxQuote(
  signerToken: string, // Token the sender would transfer
  senderToken: string  // Token the signer would transfer
): Quote
```

A successful `getMaxQuote` returns a Quote object.

### `getSignerSideQuote`

Given a `senderAmount` and token pair, return a complete quote. The `signerAmount` value is the amount the maker would send. The taker is **selling** to the maker.

```javascript
getSignerSideQuote(
  senderAmount: string, // Amount the sender would transfer
  signerToken: string,  // Token the sender would transfer
  senderToken: string   // Token the signer would transfer
): Quote
```

A successful `getSignerSideQuote` returns a Quote object including the requested `signerAmount`

### `getSenderSideQuote`

Given a `signerAmount` and token pair, return a complete quote. The `senderAmount` value is the amount the taker would send. The taker is **buying** from the maker.

```javascript
getSenderSideQuote(
  signerAmount: string, // Amount the signer would transfer
  signerToken: string,  // Token the sender would transfer
  senderToken: string   // Token the signer would transfer
): Quote
```

A successful `getSenderSideQuote` returns a Quote object including the requested `senderAmount`.

### `provideQuote`

Given a token pair, return a quote object with the maximum amounts a maker is willing to trade.

```javascript
provideQuote(
  signerToken: string,  // Token the sender would transfer
  senderToken: string   // Token the signer would transfer
): boolean
```

### `provideOrder`

Given an Order, assess its price, and conditionally perform a swap.

```javascript
provideOrder(
  order: Order // Order to fill
): boolean
```
