Makers run web servers that implement the RFQ and Last Look APIs using [JSON-RPC over HTTP](https://www.jsonrpc.org/historical/json-rpc-over-http.html). To be reachable by clients, servers run at public endpoints with [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) enabled. To become discoverable, server URLs are added to the [Registry](./add-to-the-registry.md) smart contract, which is queried by clients.

# Introduction

AirSwap liquidity providers are **makers**, generally online and quoting, with **takers** on the other side of each trade. At the lower protocol level, where the software used by makers and takers interacts with Ethereum, there are **signers**, who set and cryptographically sign terms (an order), and **senders** who submit those terms for settlement on the Swap contract.

For the RFQ protocol, a server is always the **signer** and a Client is always the **sender**. For Last Look, a Client is always the **signer** and a Server is always the **sender**.

- **Nonces** are unique identifiers for swaps and used for cancels. They should be generated incrementally but might execute out of order.
- **Locators** take the form of `hostname[:port][/path]` with a max length is 32 characters. If no scheme is provided, `https://` is implied.
- **Registries** are used to signal that a server is available to trade specific tokens, including contact information (locator), without pricing.

# Getting Started

Getting started is as easy as standing up a JSON-RPC web server and adding its URL to the Registry.

- Servers generally implement the [RFQ: Light](../technology/request-for-quote.md) protocol.
- You can debug your server with the [CLI](#debugging-with-the-cli).
- See [_Deploy a Serverless Maker Bot on AirSwap_](https://medium.com/fluidity/deploy-a-serverless-maker-bot-on-airswap-part-i-1f711ff4d379) for a guide using [Vercel](https://vercel.com/).
- When ready, add your server [to the Registry](#adding-to-the-registry).

# Protocol Fees

A protocol fee (in basis points) is hashed into the signature and verified during settlement. The value of this parameter must match its current value of `signerFee` on the [Light](../technology/deployments.md) contract. The amount is transferred from the `signerWallet` address upon settlement.

100% of protocol fees go into a reward system for AirSwap contributors.

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

# Debugging with the CLI

Ensure the AirSwap CLI is installed.

```
$ yarn global add airswap
```

In development, set the chain to `4` with the `airswap chain` command. The following examples assume a local development server is running at `http://localhost:3000`.

Request a maximum quote to see what's available.

```
$ airswap quote:max
AirSwap CLI 1.3.8 — https://support.airswap.io/

get a max quote from a peer RINKEBY

locator:  http://localhost:3000
buy or sell:  buy
token:  weth
for:  dai

Response: http://localhost:3000

Selling up to 0.25 WETH for 100 DAI
```

Request a quote for 0.1 WETH.

```
$ airswap quote:get
AirSwap CLI 1.3.8 — https://support.airswap.io/

get a quote from a peer RINKEBY

locator:  http://localhost:3000
buy or sell:  buy
amount:  0.1
of:  weth
for:  dai

Quote from http://localhost:3000

✨ Buy 0.1 WETH for 40 DAI
Price 0.0025 WETH/DAI (400 DAI/WETH)
```

# Adding to the Registry

You can debug all methods using the `quote` and `order` [AirSwap CLI commands](https://github.com/airswap/airswap-cli#all-commands).

Ensure the AirSwap CLI is installed.

```
$ yarn global add airswap
```

Once your [server](./run-a-server.md) is up and running at a **public URL**, you're ready to add it to the Registry. First, ensure an account is set with the `airswap account:import` command. You can but are not required to use the same Ethereum account that your Server is using.

Let's take a look at the available Registry commands.

```
$ airswap registry
AirSwap CLI 1.6.1 — https://airswap.io/
add and remove supported tokens

USAGE
  $ airswap registry:COMMAND

COMMANDS
  registry:add     add supported tokens to the registry
  registry:enable  enable staking on the registry
  registry:get     get urls from the registry
  registry:list    list supported tokens from registry
  registry:remove  remove supported tokens from the registry
  registry:url     set server url on the registry
```

First run the following command to enable staking for your account.

```
$ airswap registry:enable
```

Now run the following command to set your server url on the registry.

```
$ airswap registry:url
```

Now run the following command to add tokens you support.

```
$ airswap registry:add
```

To ensure your configuration is correct, you can query tokens that you support on the registry.

```
$ airswap registry:get
AirSwap CLI 1.6.1 — https://airswap.io/

get urls from the registry RINKEBY

Registry 0xa77fbeD39D5128e1cA9795d68D73010851393BCc

Token pair (e.g. WETH/USDT):  DAI/WETH

Server
----------------------------------------
https://maker.example.com/
```

Now that your server is running and has been added to the Registry, your quotes will be returned among results of the `airswap order:best` command and aggregators like [MetaMask Swaps](https://medium.com/metamask/introducing-metamask-swaps-84318c643785).

```
$ airswap order:best
AirSwap CLI 1.6.1 — https://airswap.io/

get the best available order MAINNET

full or light:  light
buy or sell:  buy
amount:  0.1
of:  weth
for:  dai

Quote from https://maker.example.com/

✨ Buy 0.1 WETH for 250 DAI
Price 0.0004 WETH/DAI (2500 DAI/WETH)
```
