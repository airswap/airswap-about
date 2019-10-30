[![Discord](https://img.shields.io/discord/590643190281928738.svg)](https://chat.airswap.io) ![Twitter Follow](https://img.shields.io/twitter/follow/airswap?style=social) ![Subreddit subscribers](https://img.shields.io/reddit/subreddit-subscribers/AirSwap?style=social) ![GitHub stars](https://img.shields.io/github/stars/airswap/airswap-protocols?style=social)

[AirSwap](https://www.airswap.io/) is a peer-to-peer trading network for Ethereum tokens. Peers connect based on common interest, agree on a price through mutual cryptographic signatures, and settle trades without intermediaries. At the heart of the AirSwap network is the [Swap](contracts/swap.md) contract, which enables trustless peer-to-peer trading. Swap is a simple contract with support for a variety of tokens and signature types.

**For end users** every trade is peer-to-peer, which means no trading fees, no deposits, and no sign-ups. AirSwap is a decentralized trading network that's simple enough to stay intuitive, secure, and liquid, without front-running, price slippage, or order collisions.

**For makers** no costly price updates with onchain order books. Prices are per request. Easily manage exposure by issuing multiple orders with the same nonce, and if needed, cancellations can be batched or fully invalidated below a nonce value.

Every peer on the network, whether a [server running](./instant/run-a-maker.md) on the public internet, a user connected through a [web application](./instant/add-to-your-app.md), or a delegated [smart contract](./contracts/delegate.md), is equipped to trade. Some peers are designed to always provide prices for taking. Some peers are designed to always request prices and take them. Some, both. Generally, peers can take either side of a trade, depending on their intentions.

Many forms of trading can be done peer-to-peer, including RFQ, last look, limit orders (issuing fixed price quotes), and partial fills (requesting specific amounts), in a fully trustless way.

# Quick Start

- **Build** on **Smart Contracts** → [Swap](./contracts/swap.md) · [Indexer](./contracts/indexer.md) · [Delegate](./contracts/delegate.md)
- **Build** for the **Automated** trading network → [Instant](./instant/add-to-your-app.md)
- **Build** for **Manual** / **OTC** trading applications → [Trader](./trader/add-to-your-app.md)

# Around the Web

- **Website** → https://www.airswap.io/
- **Blog** → https://blog.airswap.io/
- **Support** → https://support.airswap.io/
- **Discord** → https://chat.airswap.io/
