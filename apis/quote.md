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

A successful `getMaxQuote` returns a [Quote](./orders-and-signatures.md#quotes) object.

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

A successful `getSenderSideQuote` returns a [Quote](./orders-and-signatures.md#quotes) object including the requested `senderAmount`.

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

A successful `getSignerSideQuote` returns a [Quote](./orders-and-signatures.md#quotes) object including the requested `signerAmount`
