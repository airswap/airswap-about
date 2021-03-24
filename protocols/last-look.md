Last look is implemented by servers that provide quotes and accept signed orders provided by clients.

# Pull Methods

In Last Look protocols, the client is the order signer and server the order sender.

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

# Push Methods

### `provideQuote`

Given a token pair, return a quote object with the maximum amounts a maker is willing to trade.

```TypeScript
provideQuote(
  signerToken: string,  // Token the sender would transfer
  senderToken: string   // Token the signer would transfer
)
```

### `provideOrder`

Given an Order, assess its price, and conditionally perform a swap.

```TypeScript
provideOrder(
  order: Order // Order to fill
)
```

# Responses

A `Quote` has the following properties:

| Property  | Type      | Description                                       |
| :-------- | :-------- | :------------------------------------------------ |
| signer    | `Party`   | Party to the trade that sets and signs terms.     |
| sender    | `Party`   | Party to the trade that accepts and sends terms.  |
| timestamp | `string`  | (optional) Timestamp of the quote.                |
| version   | `address` | (optional) Swap contract intended for settlement. |
| locator   | `string`  | (optional) Locator URL of the server quoting.     |

Each `Party` has the following properties.

| Property | Type      | Description                                                                |
| :------- | :-------- | :------------------------------------------------------------------------- |
| kind     | `bytes4`  | `0x36372b07` (ERC-20), `0x80ac58cd` (ERC-721), or `0xd9b67a26` (ERC-1155). |
| token    | `address` | Contract address of the token.                                             |
| amount   | `uint256` | Amount of the token (ERC-20, ERC-1155).                                    |
| id       | `uint256` | ID of the token (ERC-721, ERC-1155).                                       |

## Example

The following is an example of a `getMaxQuote` request.

### Request from a Client

```json
POST / HTTP/1.1
Content-Length: ...
Content-Type: application/json

{
  "jsonrpc": "2.0",
  "id": 123,
  "method": "getMaxQuote",
  "params": {
    "senderToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "signerToken": "0xdac17f958d2ee523a2206206994597c13d831ec7"
  }
}
```

```json
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: *
Access-Control-Allow-Methods: POST, OPTIONS
Content-Length: ...
Content-Type: application/json

{
  "jsonrpc": "2.0",
  "id": 123,
  "result": {
    "timestamp": "1566941284",
    "version": "0xc549a5c701cb6e6cbc091007a80c089c49595468",
    "locator": "maker.example.com",
    "signer": {
      "kind": "0x36372b07",
      "token": "0xdac17f958d2ee523a2206206994597c13d831ec7",
      "amount": "10000",
      "id": "0"
    },
    "sender": {
      "kind": "0x36372b07",
      "token": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      "amount": "100000000",
      "id": "0"
    }
  }
}
```
