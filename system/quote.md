## `getSenderSideQuote`

Given a `signerAmount` and token pair, return a complete quote. The `senderAmount` value is the amount the taker would send. The taker is **buying** from you.

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

Given a `senderAmount` and token pair, return a complete quote. The `signerAmount` value is the amount you would send. The taker is **selling** to you.

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

A successful `getSignerSideQuote` returns a [Quote](./orders-and-signatures.md#quotes) object including the requested `signerAmount`. Maximum amounts of tokens you're willing to trade.

## `getMaxQuote`

Given a token pair, return a quote object with the maximum amounts you're willing to trade.

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

# Creating Quotes

Quotes are simple structures that only include the `token`, `amount`, `id`, and `kind` fields for `signer` and `sender`. The `kind` is the token interface identifier `0x36372b07` (ERC-20) or `0x80ac58cd` (ERC-721). The `amount` is the number of ERC-20 tokens being transferred, and `id` is the ID of the ERC-721 being transferred.

**Example**

```json
{
  "signer": {
    "token": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
    "amount": "10000",
    "id": "0",
    "kind": "0x36372b07"
  },
  "sender": {
    "token": "0xc778417e063141139fce010982780140aa0cd5ab",
    "amount": "100000000",
    "id": "0",
    "kind": "0x36372b07"
  }
}
```
