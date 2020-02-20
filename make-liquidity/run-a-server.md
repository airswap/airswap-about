Servers are processes that implement the [Quote](../system/apis.md#quote-api) and [Order](../system/apis.md#order-api) protocols using [JSON-RPC 2.0](http://www.jsonrpc.org/specification) over HTTPS. To be accessible by other applications and websites, these servers run at public endpoints with [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) enabled. Each endpoint (locator) is staked on an _indexer_ contract that takers query based on the tokens they wish to trade.

# Introduction

On AirSwap there are **makers**, generally available to trade, and **takers**, everyday people looking to buy or sell tokens. At the lower protocol level, where the software used by makers and takers interacts with Ethereum, there are **signers**, who set and cryptographically sign terms (an order), and **senders** who submit those terms for execution and settlement on the Swap contract. Within the [AirSwap](https://instant.airswap.io/) system, a Server is always the **signer** and a taker is always the **sender**.

- [**Orders**](../system/orders-and-signatures.md#creating-orders) are signed and executable trades and [**Quotes**](../system/types-and-formats.md#quotes) are indicative prices. Servers should provide both.
- **Intent** is a signal to takers that a server is trading specific tokens, including contact information (locator), without pricing.
- **Locators** take the form of `hostname[:port][/path]` with a max length is 32 characters. If no scheme is provided `https://` is implied.

# Resources

- [_Deploy a Serverless Maker Bot on AirSwap_](https://medium.com/fluidity/deploy-a-serverless-maker-bot-on-airswap-part-i-1f711ff4d379) using AirSwap CLI and ZEIT.
- [_AirSwap ZEIT Example_](https://github.com/airswap/airswap-zeit-example) includes a simple example to help you run a server.

# Error codes

The above call may have thrown an error, matched by `id`:

**Example**

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "error": {
    "code": -33605,
    "message": "Rate limit exceeded"
  }
}
```

The following are error codes in the [JSON-RPC specification](http://www.jsonrpc.org/specification#error_object):

- `-32700` Parse error
- `-32600` Invalid Request
- `-32601` Method not found
- `-32602` Invalid params
- `-32603` Internal error
- `-32000 to -32099` Reserved for implementation-defined server-errors.

We have allocated the following range for Swap Protocol errors:

- `-33600` Cannot provide the requested quote or order
- `-33601` Not trading the requested `signerToken` `senderToken` pair
- `-33602` The specified `senderAmount` or `signerAmount` is too low
- `-33603` The specified `senderAmount` or `signerAmount` is too high
- `-33604` Invalid request parameters
- `-33605` Rate limit exceeded
- `-33700 to -33799` Reserved for implementation specific trading errors.

# Helpful for Testing

The following resources are helpful for testing on **Rinkeby**.

- **ETH** to pay for transactions - [Faucet](https://faucet.rinkeby.io/)
- **WETH** for trading - `0xc778417e063141139fce010982780140aa0cd5ab` [Etherscan](https://rinkeby.etherscan.io/address/0xc778417e063141139fce010982780140aa0cd5ab)
- **DAI** for trading - `0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea` [Etherscan](https://rinkeby.etherscan.io/address/0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea)
- **AST** for staking - `0xcc1cbd4f67cceb7c001bd4adf98451237a193ff8` [Etherscan](https://rinkeby.etherscan.io/address/0xcc1cbd4f67cceb7c001bd4adf98451237a193ff8) / [Faucet](https://ast-faucet-ui.development.airswap.io/)
