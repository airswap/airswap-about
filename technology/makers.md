# Makers

Makers run web servers that implement APIs like RFQ and LastLook using JSON-RPC [over HTTP](https://www.jsonrpc.org/historical/json-rpc-over-http.html) or WebSocket. To be reachable by clients, servers run at public endpoints with [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) enabled. To become discoverable, server URLs are added to the [Registry](./deployments.md) smart contract, which is queried by clients.

## Introduction

AirSwap liquidity providers are **makers**, generally online and quoting, with **takers** on the other side of each trade. At the lower protocol level, where the software used by makers and takers interacts with Ethereum, there are **signers**, who set and cryptographically sign terms (an order), and **senders** who submit those terms for settlement on the Swap contract.

For the RFQ protocol, a server is always the **signer** and the client is always the **sender**. For LastLook, the client is always the **signer** and a server is always the **sender**.

- **Nonces** are unique identifiers for swaps and used for cancels. They should be generated incrementally but might execute out of order.
- **URLs** may be to either HTTP or WebSocket servers using `https` or `wss` respectively.
- **Registry** is used to signal that a server is available to trade specific tokens, including contact information (URL), without pricing.

## HTTP vs WebSocket

If a URL is HTTPS, it implies that the server supports the latest RFQ protocol at that endpoint. If a URL is WebSocket (`wss`) then the server communicates its supported protocols upon connnection. See the `setProtocols` method of the [Request for Quote](./protocols.md#rfq) and [LastLook](./protocols.md#last-look) protocols for details. WebSocket servers can support both RFQ and LastLook protocols.

## Getting Started

Getting started is as easy as standing up a JSON-RPC web server and adding its URL to the Registry.

- Servers generally implement the [RFQ](./protocols) protocol at minimum.
- You can debug your server with the [CLI](./makers.md#debugging-with-the-cli) or via curl.
- When ready, add your server [to the Registry](./makers.md#adding-to-the-registry) which requires [100K AST](https://etherscan.io/address/0x8F9DA6d38939411340b19401E8c54Ea1f51B8f95#readContract#F6).

## Protocol Fees

When signing orders in RFQ, a protocol fee (in basis points) is [hashed into the signature](./formats.md#signatures) and verified during settlement. The value of this parameter must match its current value of `protocolFeeLight` on the [SwapERC20](./deployments.md) contract. The amount is transferred from the `signerWallet` address upon settlement.

100% of protocol fees go toward rewarding AirSwap governance participants and project contributors.

## Handling Errors

Provide descriptive errors where possible. In the case of a server side error, return a JSON-RPC error response.

```javascript
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

## Testing with the Web App

To connect directly to your server via the Web App, construct a URL as follows.

```
https://swap.eth.limo/#/swap/:fromToken/:toToken?serverUrl=SERVER_URL
```

- `fromToken` the contract address of the senderToken (client).
- `toToken` the contract address of the signerToken (server).
- `SERVER_URL` a URL-encoded server URL to connect to including schema.

A complete example:

```
https://swap.eth.limo/#/swap/0xdac17f958d2ee523a2206206994597c13d831ec7/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48?serverUrl=https%3A%2F%2Fmaker.com%2Fapi
```

## Testing with the CLI

Ensure the AirSwap CLI is installed.

```
$ yarn global add airswap
```

In development, set the chain to `5` with the `airswap chain` command. The following examples assume a local development server is running at `http://localhost:3000`.

Several useful commands can help you debug your server:

- `airswap order` to request an order directly from your server. (RFQ)
- `airswap compare` to request an order from servers supporting a specific token pair. Once your server is on the registry it will be queried with this command. (RFQ)
- `airswap stream` to subscribe to a pricing stream and make orders for your server. (LastLook)

## Adding to the Registry

You can debug all methods using the `quote` and `order` [AirSwap CLI commands](https://github.com/airswap/airswap-cli#all-commands).

Ensure the AirSwap CLI is installed.

```
$ yarn global add airswap
```

Once your server is up and running at a **public URL**, you're ready to add it to the Registry. First, ensure an account is set with the `airswap account:import` command. You can but are not required to use the same Ethereum account that your Server is using.

Let's take a look at the available Registry commands.

```
$ airswap registry
AirSwap CLI 5.0.0 — https://www.airswap.xyz/
add and remove supported tokens

USAGE
  $ airswap registry:COMMAND

COMMANDS
  registry:approve  enable staking on the registry
  registry:eject    remove url, protocols, and tokens from registry
  registry:list     get urls from the registry
  registry:revoke   disable staking on the registry
  registry:status   check status of url, protocols, and tokens on registry
  registry:url      set server url on the registry
```

First run the following command to enable staking for your account.

```
$ airswap registry:approve
```

Next run the following command to set your server url on the registry.

```
$ airswap registry:url
```

Next run the following command to add protocols you support.

```
$ airswap protocols:add
```

Next run the following command to add tokens you support.

```
$ airswap tokens:add
```

To ensure your configuration is correct, run the following.

```
$ airswap registry:status
```

Now that your server is running and has been added to the Registry, your quotes will be returned among results of the `airswap compare` command and aggregators like [MetaMask Swaps](https://medium.com/metamask/introducing-metamask-swaps-84318c643785).

```
$ airswap best
AirSwap CLI 5.0.0 — https://www.airswap.xyz/

get the best available order ETHEREUM

buy or sell:  buy
amount:  0.1
of:  weth
for:  dai

Requesting from 7 peers... done

Quote from https://maker.example.com/

✨ Buy 0.1 WETH for 250 DAI
Price 0.0004 WETH/DAI (2500 DAI/WETH)
```
