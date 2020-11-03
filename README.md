[![Discord](https://img.shields.io/discord/590643190281928738.svg)](https://chat.airswap.io) ![Twitter Follow](https://img.shields.io/twitter/follow/airswap?style=social) ![Subreddit subscribers](https://img.shields.io/reddit/subreddit-subscribers/AirSwap?style=social) ![GitHub stars](https://img.shields.io/github/stars/airswap/airswap-protocols?style=social)

[AirSwap](https://www.airswap.io/) is a peer-to-peer RFQ style trading network for Ethereum. Peers connect and agree on price through mutual cryptographic signatures, settling trades via atomic swap without an intermediary. Every trade on AirSwap requires an existing liquidity provider (LP) to be available as a web server, a delegate smart contract, or a trader manually communicating prices over-the-counter (OTC).

# Quick Start

- **Provide liquidity** with **dynamic pricing** → [Run a Server](./make-liquidity/run-a-server.md)
- **Embed** AirSwap into **your app** → [Embed AirSwap](./take-liquidity/embed-airswap.md)
- **Explore** the AirSwap **smart contracts** → [Swap](./reference/swap.md) · [Indexer](./reference/indexer.md) · [Delegate](./reference/delegate.md)

# Peer-to-Peer

Every participant on the network, whether a [Server](./make-liquidity/run-a-server.md) running on the public internet, a user connected through a [web application](./take-liquidity/embed-airswap.md), a trader using the [CLI](./tools/airswap-cli), or a [Delegate](./reference/delegate.md) deployed to Ethereum, is equipped to trade. Peers can take either side of a trade, depending on their intentions. Many forms of trading can be done peer-to-peer, including RFQ, last look, limit orders (issuing fixed price quotes), and partial fills (requesting specific amounts), in a fully trustless way.

**For end users**, no trading fees, no deposits, and no sign-ups. AirSwap is simple enough to stay intuitive, secure, and liquid, without front-running, price slippage, or order collisions.

**For makers**, no costly price updates with onchain order books. Prices are per request. Easily manage exposure, and, if needed, cancel orders individually or as a batch in a single transaction.

# AirSwap Improvement Proposals (AIPs)

AirSwap is governed by a community proposal and voting process called AirSwap Improvement Proposals (AIP). For more information on AIPs see [AIP 1](https://github.com/airswap/AIPs/issues/1) and see [https://github.com/airswap/AIPs/issues](https://github.com/airswap/AIPs/issues) for all active proposals. Voting is held on [https://vote.airswap.io/](https://vote.airswap.io/).

# MetaMask Swaps

AirSwap is the easiest and most direct way to provide liquidity to over 1M active users of [MetaMask Swaps](https://medium.com/metamask/introducing-metamask-swaps-84318c643785). Just [Run a Server](./make-liquidity/run-a-server.md) and [Use the CLI](./make-liquidity/debug-with-cli.md) to add it to the Indexer. Requests for quotes will start coming your way immediately.

# Around the Web

- **Website** → https://www.airswap.io/
- **Blog** → https://blog.airswap.io/
- **Support** → https://support.airswap.io/
- **Discord** → https://chat.airswap.io/
