# Quote API

Quotes indicate prices at which a peer is interested in trading.

## `getMaxQuote`

Given a token pair, return a quote object with the maximum amounts a maker is willing to trade.

**Example Request**

```json
{
  "jsonrpc": "2.0",
  "method": "getMaxQuote",
  "params": {
    "senderToken": "0xc778417e063141139fce010982780140aa0cd5ab",
    "signerToken": "0x27054b13b1b798b345b591a4d22e6562d47ea75a"
  },
  "id": "123"
}
```

| Param         | Type      | Description                          |
| :------------ | :-------- | :----------------------------------- |
| `senderToken` | `address` | The token the sender would transfer. |
| `signerToken` | `address` | The token the signer would transfer. |

A successful `getMaxQuote` returns a [Quote](./types-and-formats.md#quotes) object.

## `getSenderSideQuote`

Given a `signerAmount` and token pair, return a complete quote. The `senderAmount` value is the amount the taker would send. The taker is **buying** from the maker.

**Example Request**

```json
{
  "jsonrpc": "2.0",
  "method": "getSenderSideQuote",
  "params": {
    "senderToken": "0xc778417e063141139fce010982780140aa0cd5ab",
    "signerToken": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
    "signerAmount": "100000000"
  },
  "id": "123"
}
```

| Param          | Type      | Description                                 |
| :------------- | :-------- | :------------------------------------------ |
| `signerAmount` | `uint256` | Amount of ERC-20 the signer would transfer. |
| `senderToken`  | `address` | Token the sender would transfer.            |
| `signerToken`  | `address` | Token the signer would transfer.            |

A successful `getSenderSideQuote` returns a [Quote](./types-and-formats.md#quotes) object including the requested `senderAmount`.

## `getSignerSideQuote`

Given a `senderAmount` and token pair, return a complete quote. The `signerAmount` value is the amount the maker would send. The taker is **selling** to the maker.

**Example Request**

```json
{
  "jsonrpc": "2.0",
  "method": "getSignerSideQuote",
  "params": {
    "senderToken": "0xc778417e063141139fce010982780140aa0cd5ab",
    "senderAmount": "100000000",
    "signerToken": "0x27054b13b1b798b345b591a4d22e6562d47ea75a"
  },
  "id": "123"
}
```

| Param          | Type      | Description                                 |
| :------------- | :-------- | :------------------------------------------ |
| `senderAmount` | `uint256` | Amount of ERC-20 the sender would transfer. |
| `senderToken`  | `address` | Token the sender would transfer.            |
| `signerToken`  | `address` | Token the signer would transfer.            |

A successful `getSignerSideQuote` returns a [Quote](./types-and-formats.md#quotes) object including the requested `signerAmount`

# Order API

Orders are priced and executable swaps that indicate all parties to a trade.

## `getSenderSideOrder`

Given a `signerAmount`, `senderWallet`, and token pair, return a complete order. The `senderAmount` value is the amount the taker would send. The taker is **buying** from you.

**Example Request**

```json
{
  "jsonrpc": "2.0",
  "method": "getSenderSideOrder",
  "params": {
    "signerAmount": "10000",
    "signerToken": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
    "senderToken": "0xc778417e063141139fce010982780140aa0cd5ab",
    "senderWallet": "0x1FF808E34E4DF60326a3fc4c2b0F80748A3D60c2"
  },
  "id": "123"
}
```

| Param          | Type      | Description                                 |
| :------------- | :-------- | :------------------------------------------ |
| `signerAmount` | `uint256` | Amount of ERC-20 the signer would transfer. |
| `signerToken`  | `address` | Token the signer would transfer.            |
| `senderToken`  | `address` | Token the sender would transfer.            |
| `senderWallet` | `address` | Wallet of the sender.                       |

A successful `getSenderSideOrder` returns a signed [Order](./orders-and-signatures.md#creating-orders) object including the requested `senderAmount`.

## `getSignerSideOrder`

Given a `senderAmount`, `senderWallet`, and token pair, return a complete order. The `signerAmount` value is the amount you would send. The taker is **selling** to you.

**Example Request**

```json
{
  "jsonrpc": "2.0",
  "method": "getSignerSideOrder",
  "params": {
    "signerToken": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
    "senderWallet": "0x1FF808E34E4DF60326a3fc4c2b0F80748A3D60c2",
    "senderToken": "0xc778417e063141139fce010982780140aa0cd5ab",
    "senderAmount": "100000000"
  },
  "id": "123"
}
```

| Param          | Type      | Description                                     |
| :------------- | :-------- | :---------------------------------------------- |
| `senderAmount` | `uint256` | The amount of ERC-20 the sender would transfer. |
| `signerToken`  | `address` | The token the signer would transfer.            |
| `senderToken`  | `address` | The token the sender would transfer.            |
| `senderWallet` | `address` | The wallet of the sender.                       |

A successful `getSignerSideOrder` returns a signed [Order](./orders-and-signatures.md#creating-orders) object including the requested `signerAmount`.

# Last Look API

Last look is to say that, after having emitted an indicative quote, a maker may accept or decline an order provided to it by a taker. Quotes are primarily served through the [`Quote`](./quote.md) protocol, but other methods to disseminate pricing information may exist, for example `SetRule` events on `Delegate` contracts.

## `provideOrder`

Given an order, assess its price, and conditionally perform a swap.

| Param   | Type    | Description    |
| :------ | :------ | :------------- |
| `order` | `Order` | Order to swap. |

**Example Delegate Call**

```TypeScript
import { Delegate } from '@airswap/protocols'
const delegate = new Delegate('...')
const hash = await delegate.provideOrder(order);
```
