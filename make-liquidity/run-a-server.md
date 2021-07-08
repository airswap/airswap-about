Servers implement the [Quote](../protocols/quote.md) and [Order](../protocols/order.md) APIs using [JSON-RPC over HTTP](https://www.jsonrpc.org/historical/json-rpc-over-http.html). To be reachable for RFQs, servers run at public endpoints with [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) enabled. To become discoverable, server URLs are added to the [Indexer](./add-to-the-indexer.md) smart contract, which is [queried](../take-liquidity/request-quotes.md) by prospective counterparties.

# Introduction

AirSwap liquidity providers are **makers**, generally online and quoting, with **takers** on the other side of each trade. At the lower protocol level, where the software used by makers and takers interacts with Ethereum, there are **signers**, who set and cryptographically sign terms (an order), and **senders** who submit those terms for settlement on the Swap contract.

For the RFQ protocol, a Server is always the **signer** and a Client is always the **sender**. For Last Look, a Client is always the **signer** and a Server is always the **sender**.

- **Nonces** are unique identifiers for swaps and used for cancels. They should be generated incrementally but might execute out of order.
- **Locators** take the form of `hostname[:port][/path]` with a max length is 32 characters. If no scheme is provided, `https://` is implied.
- **Indexers** are used to signal that a server is available to trade specific tokens, including contact information (locator), without pricing.

# Getting Started

Getting started is as easy as standing up a JSON-RPC web server and adding its URL to the Indexer.

- Servers generally implement the [RFQ: Light](../protocols/light.md) protocol.
- You can debug your server with the [CLI](./debug-with-cli.md).
- See [_Deploy a Serverless Maker Bot on AirSwap_](https://medium.com/fluidity/deploy-a-serverless-maker-bot-on-airswap-part-i-1f711ff4d379) for a guide using [Vercel](https://vercel.com/).
- When ready, add your server [to the Indexer](./add-to-the-indexer.md).

# Helpful for Testing

The following resources are helpful for testing on **Rinkeby**.

- **ETH** to pay for transactions - [Faucet](https://faucet.rinkeby.io/)
- **WETH** for trading - `0xc778417e063141139fce010982780140aa0cd5ab` [Etherscan](https://rinkeby.etherscan.io/address/0xc778417e063141139fce010982780140aa0cd5ab)
- **DAI** for trading - `0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea` [Etherscan](https://rinkeby.etherscan.io/address/0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea)
- **AST** for staking - `0xcc1cbd4f67cceb7c001bd4adf98451237a193ff8` [Etherscan](https://rinkeby.etherscan.io/address/0xcc1cbd4f67cceb7c001bd4adf98451237a193ff8) / [Faucet](https://ast-faucet-ui.development.airswap.io/)

# Handling Errors

You should provide descriptive errors where possible. In the case of a server side error, return a JSON-RPC error response.

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
