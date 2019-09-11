[![Discord](https://img.shields.io/discord/590643190281928738.svg)](https://chat.airswap.io) ![Twitter Follow](https://img.shields.io/twitter/follow/airswap?style=social) ![Subreddit subscribers](https://img.shields.io/reddit/subreddit-subscribers/AirSwap?style=social) ![GitHub stars](https://img.shields.io/github/stars/airswap/airswap-protocols?style=social)

[AirSwap](https://www.airswap.io/) is a peer-to-peer trading network for Ethereum tokens. Peers connect based on common interest, agree on a price through mutual cryptographic signatures, and settle trades without intermediaries. At the heart of the AirSwap network is the [Swap](contracts/swap.md) contract, which enables trustless peer-to-peer trading. Swap is a simple contract with support for a variety of tokens and signature types.

**For makers** no costly price updates with onchain order books. Prices are per request. Easily manage exposure by issuing multiple orders with the same nonce, and if needed, cancellations can be batched or fully invalidated below a nonce value.

**For end users** every trade is peer-to-peer, which means no trading fees, no deposits, and no sign-ups. AirSwap is a decentralized trading network that's simple enough to stay intuitive, secure, and liquid, without front-running, price slippage, or order collisions.

# Quick Start

- **Smart Contracts** → [Swap](contracts/swap.md)
- **Automated** trading network → [Instant](instant/add-to-your-app.md)
- **Manual** trading applications → [Trader](trader/add-to-your-app.md)

# Peer-to-Peer

Every peer on the network, whether a [server running](instant/running-peers.md) on the public internet, a user connected through a [web application](instant/add-to-your-app), or a [smart contract](instant/deploying-delegates.md) running on a blockchain, is equipped to trade. Some peers are designed to always provide prices for taking. Some peers are designed to always request prices and take them. Some, both. Generally, peers can take either side of a trade, depending on their intentions.

Many forms of trading can be done peer-to-peer, including RFQ, last look, limit orders (issuing fixed price quotes), and partial fills (requesting specific amounts), in a fully trustless way. Additionally, two powerful features include authorizations and affiliates.

**Authorizations** are for peers that trade on behalf of others. These peers are authorized for either side of a trade, and can be wallets (people or programs) or smart contracts.

**Affiliates** are third-parties compensated for their part in bringing together the two parties of a trade, and can be other traders or software applications that connect traders on the network.

# Indexers

Peers use indexers to signal their intent to trade and to find others who share mututal intent. Indexers are smart contracts that manage "indexes" of "locators" that represent endpoints at which a peer can be found. Each index is sorted based on the number of tokens each peer has staked for its locator.

# Instant

Instant is an automated OTC network that implements most features. [Learn more about Instant](instant/architecture.md)

# Trader

Trader is a simple tool for building and sharing peer-to-peer orders. [Learn more about Trader](instant/architecture.md)
