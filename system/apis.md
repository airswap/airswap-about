The following APIs are implemented by peers on the network to [make](../make-liquidity/run-a-server.md) and [take](../take-liquidity/request-quotes.md) liquidity.

# RFQ API

## Orders

Orders are priced and executable swaps that specify all parties of a trade.

### `getSenderSideOrder`

Given a `signerAmount`, `senderWallet`, and token pair, return a complete order. The `senderAmount` value is the amount the taker would send. The taker is **buying** from you.

```TypeScript
getSenderSideOrder(
  signerAmount: string,
  signerToken: string,
  senderToken: string,
  senderWallet: string,
  swapContract: string,
  proxyingFor: string,
)
```

| Param          | Type      | Description                                   |
| :------------- | :-------- | :-------------------------------------------- |
| `signerAmount` | `uint256` | Amount of ERC-20 the signer would transfer.   |
| `signerToken`  | `address` | Token the signer would transfer.              |
| `senderToken`  | `address` | Token the sender would transfer.              |
| `senderWallet` | `address` | Wallet of the sender.                         |
| `swapContract` | `address` | Swap contract intended for use.               |
| `proxyingFor`  | `address` | `optional` Ultimate counterparty of the swap. |

Depending on the `swapContract`, a successful `getSenderSideOrder` returns a signed [Order](./types-and-formats.md#orders) or a [Light Order](./types-and-formats.md#light-order) that includes the requested `senderAmount`.

### `getSignerSideOrder`

Given a `senderAmount`, `senderWallet`, and token pair, return a complete order. The `signerAmount` value is the amount you would send. The taker is **selling** to you.

```TypeScript
getSignerSideOrder(
  senderAmount: string,
  signerToken: string,
  senderToken: string,
  senderWallet: string,
  swapContract: string,
  proxyingFor: string,
)
```

| Param          | Type      | Description                                   |
| :------------- | :-------- | :-------------------------------------------- |
| `senderAmount` | `uint256` | Amount of ERC-20 the sender would transfer.   |
| `signerToken`  | `address` | Token the signer would transfer.              |
| `senderToken`  | `address` | Token the sender would transfer.              |
| `senderWallet` | `address` | Wallet of the sender.                         |
| `swapContract` | `address` | Swap contract intended for use.               |
| `proxyingFor`  | `address` | `optional` Ultimate counterparty of the swap. |

Depending on the value set as `swapContract` a successful `getSignerSideOrder` returns a signed [Order](./types-and-formats.md#orders) or a [Light Order](./types-and-formats.md#light-order) including the requested `signerAmount`.

## Quotes

Quotes indicate prices at which a peer is interested in trading.

### `getMaxQuote`

Given a token pair, return a quote object with the maximum amounts a maker is willing to trade.

```javascript
getMaxQuote(
  signerToken: string,
  senderToken: string
): Quote
```

| Param         | Type      | Description                          |
| :------------ | :-------- | :----------------------------------- |
| `senderToken` | `address` | The token the sender would transfer. |
| `signerToken` | `address` | The token the signer would transfer. |

A successful `getMaxQuote` returns a [Quote](./types-and-formats.md#quotes) object.

### `getSenderSideQuote`

Given a `signerAmount` and token pair, return a complete quote. The `senderAmount` value is the amount the taker would send. The taker is **buying** from the maker.

```javascript
getSenderSideQuote(
  signerAmount: string,
  signerToken: string,
  senderToken: string
): Quote
```

| Param          | Type      | Description                                 |
| :------------- | :-------- | :------------------------------------------ |
| `signerAmount` | `uint256` | Amount of ERC-20 the signer would transfer. |
| `senderToken`  | `address` | Token the sender would transfer.            |
| `signerToken`  | `address` | Token the signer would transfer.            |

A successful `getSenderSideQuote` returns a [Quote](./types-and-formats.md#quotes) object including the requested `senderAmount`.

### `getSignerSideQuote`

Given a `senderAmount` and token pair, return a complete quote. The `signerAmount` value is the amount the maker would send. The taker is **selling** to the maker.

```javascript
getSignerSideQuote(
  senderAmount: string,
  senderToken: string,
  signerToken: string
): Quote
```

| Param          | Type      | Description                                 |
| :------------- | :-------- | :------------------------------------------ |
| `senderAmount` | `uint256` | Amount of ERC-20 the sender would transfer. |
| `senderToken`  | `address` | Token the sender would transfer.            |
| `signerToken`  | `address` | Token the signer would transfer.            |

A successful `getSignerSideQuote` returns a [Quote](./types-and-formats.md#quotes) object including the requested `signerAmount`

# Last Look API

Last look is to say that, after having emitted an indicative quote, a maker may accept or decline an order provided to it by a taker. Quotes are primarily served through the [`Quote`](#quote-api) API, but other methods to disseminate pricing information may exist, for example `SetRule` events on `Delegate` contracts.

## `provideOrder`

Given an [Order](./types-and-formats.md#orders), assess its price, and conditionally perform a swap.

```javascript
provideOrder((order: Order))
```

| Param   | Type    | Description    |
| :------ | :------ | :------------- |
| `order` | `Order` | Order to swap. |
