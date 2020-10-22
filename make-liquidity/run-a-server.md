Servers implement the [Quote](../system/apis.md#quote-api) and [Order](../system/apis.md#order-api) APIs using [JSON-RPC 2.0](http://www.jsonrpc.org/specification) over HTTPS. To be accessible by other applications and websites, these servers run at public endpoints with [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) enabled. Each endpoint (locator) is staked on an _indexer_ contract that takers query based on the tokens they wish to trade.

# Introduction

On AirSwap there are **makers**, generally available to trade, and **takers**, everyday people looking to buy or sell tokens. At the lower protocol level, where the software used by makers and takers interacts with Ethereum, there are **signers**, who set and cryptographically sign terms (an order), and **senders** who submit those terms for execution and settlement on the Swap contract. Within the [AirSwap](https://instant.airswap.io/) system, a Server is always the **signer** and a taker is always the **sender**.

- **Orders** are signed and executable trades and Quotes are indicative prices. Servers should provide both.
- **Intent** is a signal to takers that a server is trading specific tokens, including contact information (locator), without pricing.
- **Locators** take the form of `hostname[:port][/path]` with a max length is 32 characters. If no scheme is provided, `https://` is implied.

# Getting Started

- [_Deploy a Serverless Maker Bot on AirSwap_](https://medium.com/fluidity/deploy-a-serverless-maker-bot-on-airswap-part-i-1f711ff4d379) using AirSwap CLI and ZEIT.
- [_AirSwap ZEIT Example_](https://github.com/airswap/airswap-zeit-example) includes a simple example to help you run a server.

# Quote and Order APIs

Servers implement the [Quote](../system/apis.md#quote-api) and [Order](../system/apis.md#order-api) APIs. The following responses would be based on your internal pricing.

## Quote API

- `getMaxQuote` requests a [`Quote`](../system/types-and-formats.md#quotes) including maximum **signer** and **sender** amounts.
- `getSignerSideQuote` requests a [`Quote`](../system/types-and-formats.md#quotes) including the **signer** amount.
- `getSenderSideQuote` requests a [`Quote`](../system/types-and-formats.md#quotes) including the **sender** amount.

## Order API

- `getSignerSideOrder` is a request for an [`Order`](../system/types-and-formats.md#orders) including the **signer** amount.
- `getSenderSideOrder` is a request for an [`Order`](../system/types-and-formats.md#orders) including the **sender** amount.

# Example

The following is an example of an HTTP request-response cycle with JSON-RPC payloads.

### Request from a Client

```json
POST / HTTP/1.0
Content-Length: 185
Content-Type: application/json

{"jsonrpc":"2.0","id":123,"method":"getMaxQuote","params":{"senderToken": "0xc778417e063141139fce010982780140aa0cd5ab","signerToken":"0x27054b13b1b798b345b591a4d22e6562d47ea75a"}}
```

### Response from your server

```json
HTTP/1.0 200 OK
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: *
Access-Control-Allow-Methods: POST, OPTIONS
Content-Length: 262
Content-Type: application/json

{"jsonrpc":"2.0","id":123,"result":{"signer":{"kind":"0x36372b07","token":"0x27054b13b1b798b345b591a4d22e6562d47ea75a","amount":"10000","id":"0"},"sender":{"kind":"0x36372b07","token":"0xc778417e063141139fce010982780140aa0cd5ab","amount":"100000000","id":"0"}}}
```

# Error Handling

A JSON-RPC request may result in an error, matched by its request `id`:

```json
{
  "jsonrpc": "2.0",
  "id": 123,
  "error": { "code": -33605, "message": "Rate limit exceeded" }
}
```

The following are error codes in the [JSON-RPC specification](http://www.jsonrpc.org/specification#error_object):

- `-32700` Parse error
- `-32600` Invalid Request
- `-32601` Method not found
- `-32602` Invalid params
- `-32603` Internal error
- `-32000 to -32099` (Reserved for implementation-defined server-errors)

We have allocated the following range for Swap Protocol errors:

- `-33600` Cannot provide the requested quote or order
- `-33601` Not trading the requested `signerToken` `senderToken` pair
- `-33602` The specified `senderAmount` or `signerAmount` is too low
- `-33603` The specified `senderAmount` or `signerAmount` is too high
- `-33604` Invalid request parameters
- `-33605` Rate limit exceeded
- `-33700 to -33799` (Reserved for implementation specific trading errors)

# Helpful for Testing

The following resources are helpful for testing on **Rinkeby**.

- **ETH** to pay for transactions - [Faucet](https://faucet.rinkeby.io/)
- **WETH** for trading - `0xc778417e063141139fce010982780140aa0cd5ab` [Etherscan](https://rinkeby.etherscan.io/address/0xc778417e063141139fce010982780140aa0cd5ab)
- **DAI** for trading - `0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea` [Etherscan](https://rinkeby.etherscan.io/address/0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea)
- **AST** for staking - `0xcc1cbd4f67cceb7c001bd4adf98451237a193ff8` [Etherscan](https://rinkeby.etherscan.io/address/0xcc1cbd4f67cceb7c001bd4adf98451237a193ff8) / [Faucet](https://ast-faucet-ui.development.airswap.io/)
