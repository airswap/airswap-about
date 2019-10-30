{% hint style="warning" %}
The following system is in beta on Rinkeby.
{% endhint %}

# Maker Kit (Beta)

Maker Kit (Beta) is a collection of tools and examples to explore the AirSwap network, manage the Indexer, and interact with other peers. [Check it out on GitHub](https://github.com/airswap/airswap-maker-kit) to get started.

# Introduction

Running a maker for AirSwap Instant has three simple requirements.

- A web server that implements the [Peer API](./api-reference.md) using [JSON-RPC 2.0](http://www.jsonrpc.org/specification) and [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- One-time approvals and pricing logic for the tokens that you intend to trade
- Interacting with the Indexer to signal your intent to trade

# Implement the Peer API

At the liquidity level, a **maker** is a trading party that is generally available to provide pricing and make trades. A **taker** is a trading party that trades one-off or periodically and accepts the pricing of makers. Makers are expected to implement the following methods taking the API role of **signer** in all cases.

| Method to implement  | What you provide                                                                          |
| :------------------- | :---------------------------------------------------------------------------------------- |
| `getSenderSideQuote` | Amount you expect the taker to send. The taker is **buying** from you.                    |
| `getSignerSideQuote` | Amount you expect to send. The taker is **selling** to you.                               |
| `getMaxQuote`        | Maximum amounts of tokens you're willing to trade.                                        |
| `getSenderSideOrder` | An order that includes the amount the taker would send. The taker is **buying** from you. |
| `getSignerSideOrder` | An order that includes the amount you would send. The taker is **selling** to you.        |

See the [API Reference](./api-reference.md) for method details.

# Running your Server

It's common to deploy makers to AWS, GCP, and other cloud hosting providers. Going forward our team will produce tools and tutorials for deploying makers to various platforms.

# Approve Your Tokens

Atomic swaps require that both parties have approved the Swap contract to transfer their tokens. [Learn more about ERC20 and the approval process](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md).

# Signal Intent to Trade

With your server up and running, signal to other peers that you're ready to trade. Each intent to trade includes a public endpoint for your server. Each intent to trade is for only **one side** of a market e.g. WETH/DAI and so a second intent would need to be set for DAI/WETH.

| Function to call | When to call it                                                                                                                                |
| :--------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| `setIntent`      | Start receiving requests. Sets a token pair and location of your server. Stake AirSwap Tokens (AST) to be ranked higher for better visibility. |
| `unsetIntent`    | Stop receiving requests. Unsets a token pair. Any staked AST will be returned.                                                                 |
| `getLocators`    | Get a list of all makers trading a token pair.                                                                                                 |
| `createIndex`    | If your token pair is not on the Indexer it must be created.                                                                                   |

See the [Indexer Contract](../contracts/indexer.md) for method details. You can interact with Indexer contracts either programmatically or through tools like [AirSwap Maker Kit](https://github.com/airswap/airswap-maker-kit) and [MEW](https://www.myetherwallet.com/).

# Helpful Links for Testing (Rinkeby)

- **ETH** to pay for transactions - [ETH Faucet](https://faucet.rinkeby.io/)
- **WETH** for trading - `0xc778417e063141139fce010982780140aa0cd5ab` [Etherscan](https://rinkeby.etherscan.io/address/0xc778417e063141139fce010982780140aa0cd5ab)
- **DAI** for trading - `0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea` [Etherscan](https://rinkeby.etherscan.io/address/0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea)
- **AST** for staking - [AST Faucet](https://ast-faucet-ui.development.airswap.io/)
