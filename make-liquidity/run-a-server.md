Servers implement the [Quote](../protocols/quote.md) and [Order](../protocols/order.md) APIs using [JSON-RPC over HTTP](https://www.jsonrpc.org/historical/json-rpc-over-http.html). To be reachable for RFQs, servers run at public endpoints with [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) enabled. To become discoverable, server URLs are added to the [Indexer](./add-to-the-indexer.md) smart contract, which is [queried](../take-liquidity/request-quotes.md) by prospective counterparties.

# Introduction

AirSwap liquidity providers are **makers**, generally online and quoting, with **takers** on the other side of each trade. At the lower protocol level, where the software used by makers and takers interacts with Ethereum, there are **signers**, who set and cryptographically sign terms (an order), and **senders** who submit those terms for settlement on the Swap contract. Within the [AirSwap](https://instant.airswap.io/) system, a Server is always the **signer** and a taker is always the **sender**.

- **Orders** are signed and executable trades and **Quotes** are indicative prices. Servers should provide both.
- **Intent** is a signal to takers that a server is trading specific tokens, including contact information (locator), without pricing.
- **Locators** take the form of `hostname[:port][/path]` with a max length is 32 characters. If no scheme is provided, `https://` is implied.

# Getting Started

- [_Deploy a Serverless Maker Bot on AirSwap_](https://medium.com/fluidity/deploy-a-serverless-maker-bot-on-airswap-part-i-1f711ff4d379) using [Vercel](https://vercel.com/) and the [AirSwap CLI](https://github.com/airswap/airswap-cli).
- [_AirSwap Vercel Example_](https://github.com/airswap/airswap-zeit-example) includes an example server to get started.

## To run the Vercel example

Vercel is an integrated devops platform and CLI.

```
$ git clone git@github.com:airswap/airswap-vercel-example.git
$ cd airswap-vercel-example
$ airswap-vercel-example yarn
$ airswap-vercel-example yarn global add vercel
$ airswap-vercel-example echo "ETHEREUM_ACCOUNT=[A PRIVATE KEY]" > .env
$ airswap-vercel-example vercel dev
Vercel CLI 20.1.2 dev (beta) — https://vercel.com/feedback
> Ready! Available at http://localhost:3000
```

Now that the example is running, you can debug with the [CLI](./debug-with-cli.md). This example is for convenience, but any web hosting platform will work.

# Quote and Order APIs

Servers implement the [Quote](../system/quote-protocol.md) and [Order](../system/quote-protocol.md) APIs. The following responses would be based on your internal pricing strategies.

## Quote API

See: [Quote Protocol](../system/quote-protocol.md)

- `getMaxQuote` requests a Quote. You set the **signer** and **sender** amounts.
- `getSignerSideQuote` requests a Quote. You set the **signer** amount.
- `getSenderSideQuote` requests a Quote. You set the **sender** amount.

## Order API

See: [Light Protocol](../system/quote-protocol.md)

- `getSignerSideOrder` requests an Order. You set the **signer** amount.
- `getSenderSideOrder` requests an Order. You set the **sender** amount.

# Example

The following is an example of a `getMaxQuote` request.

### Request from a Client

```json
POST / HTTP/1.1
Content-Length: 185
Content-Type: application/json

{"jsonrpc":"2.0","id":123,"method":"getMaxQuote","params":{"senderToken": "0xc778417e063141139fce010982780140aa0cd5ab","signerToken":"0x27054b13b1b798b345b591a4d22e6562d47ea75a"}}
```

### Your Response

```json
HTTP/1.1 200 OK
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

The following are AirSwap specific errors:

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
