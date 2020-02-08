Makers are HTTPS servers that implement the [Maker API](#maker-api) using [JSON-RPC 2.0](http://www.jsonrpc.org/specification). To be accessible by other applications and websites, these servers run at public endpoints with [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) enabled. Each endpoint (locator) is staked on an _indexer_ contract that takers query based on the tokens they wish to trade.

# Introduction

On AirSwap there are **makers**, generally available to trade, and **takers**, everyday people looking to buy or sell tokens. At the lower protocol level, where the software used by makers and takers interacts with Ethereum, there are **signers**, who set and cryptographically sign terms (an order), and **senders** who submit those terms for execution and settlement on the Swap contract. Within the [AirSwap](https://instant.airswap.io/) system, a maker is always the **signer** and a taker is always the **sender** throughout the protocol implementation.

- [**Orders**](./orders-and-signatures.md#creating-orders) are signed and executable trades and [**Quotes**](./orders-and-signatures.md#quotes) are indicative prices. Makers should provide both.
- **Intent** is a signal to takers that a maker is trading specific tokens, including contact information (locator), without pricing.
- **Locators** take the form of `hostname[:port][/path]` and resolve to web servers that implement the Maker API. The max length is 32 characters and `https://` is implied.

# Resources

- [_Deploy a Serverless Maker Bot on AirSwap_](https://medium.com/fluidity/deploy-a-serverless-maker-bot-on-airswap-part-i-1f711ff4d379) using Maker Kit and ZEIT.
- [_Maker Kit Examples_](https://github.com/airswap/airswap-maker-kit-examples) includes tools and examples to help you run a maker.

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

# Indexer API

Indexers are smart contracts used to signal your intent to trade and publish the URL at which your maker is running. You can interact with indexer contracts either programmatically or through tools like [AirSwap Maker Kit](https://github.com/airswap/airswap-maker-kit) and [MEW](https://www.myetherwallet.com/). See the [Indexer Contract](../reference/indexer.md) for complete method details.

## `createIndex`

Each token pair must have an `Index` before calling `setIntent`. If the requested `Index` already exists, the function returns its address.

```java
function createIndex(
  address signerToken,
  address senderToken
) external returns (address)
```

| Param         | Type      | Description                                                |
| :------------ | :-------- | :--------------------------------------------------------- |
| `signerToken` | `address` | Address of the token transferred from a signer in a trade. |
| `senderToken` | `address` | Address of the token transferred from a sender in a trade. |

## `setIntent`

Stake tokens to the indexer and set an intent to trade. If the caller already has an intent on the specified Index, then the intent is updated to reflect the new `stakingAmount` and `locator`.

```java
function setIntent(
  address signerToken,
  address senderToken,
  uint256 stakingAmount,
  bytes32 locator
) external
```

| Param           | Type      | Description                                             |
| :-------------- | :-------- | :------------------------------------------------------ |
| `signerToken`   | `address` | Signer token of the Index being staked.                 |
| `senderToken`   | `address` | Sender token of the Index being staked.                 |
| `stakingAmount` | `uint256` | Amount of stakingToken to stake.                        |
| `locator`       | `bytes32` | Arbitrary data. Often an address in the first 20 bytes. |

## `unsetIntent`

Unset an intent to trade and return staked tokens to the sender.

```java
function unsetIntent(
  address signerToken,
  address senderToken
) external
```

| Param         | Type      | Description                               |
| :------------ | :-------- | :---------------------------------------- |
| `signerToken` | `address` | Signer token of the Index being unstaked. |
| `senderToken` | `address` | Sender token of the Index being unstaked. |

## `getLocators`

Get a list of locators that have an intent to trade a token pair. Along with the locators, their corresponding staking scores are returned, and the address of the next cursor to pass back into the function to achieve pagination.

```java
function getLocators(
  address signerToken,
  address senderToken,
  address cursor,
  uint256 limit
) external view returns (
  bytes32[] memory locators,
  uint256[] memory scores,
  address nextCursor
) {
```

| Param         | Type      | Description                                     |
| :------------ | :-------- | :---------------------------------------------- |
| `signerToken` | `address` | Address of the token that the signer transfers. |
| `senderToken` | `address` | Address of the token that the sender transfers. |
| `cursor`      | `address` | Address of the user to start from in the list.  |
| `limit`       | `uint256` | Maximum number of items to return.              |

# Helpful for Testing

The following resources are helpful for testing on **Rinkeby**.

- **ETH** to pay for transactions - [Faucet](https://faucet.rinkeby.io/)
- **WETH** for trading - `0xc778417e063141139fce010982780140aa0cd5ab` [Etherscan](https://rinkeby.etherscan.io/address/0xc778417e063141139fce010982780140aa0cd5ab)
- **DAI** for trading - `0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea` [Etherscan](https://rinkeby.etherscan.io/address/0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea)
- **AST** for staking - `0xcc1cbd4f67cceb7c001bd4adf98451237a193ff8` [Etherscan](https://rinkeby.etherscan.io/address/0xcc1cbd4f67cceb7c001bd4adf98451237a193ff8) / [Faucet](https://ast-faucet-ui.development.airswap.io/)
