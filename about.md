AirSwap is a peer-to-peer trading network for Ethereum tokens.

Every peer on the network, whether a [server running](instant/running-peers.md) on the public internet, a user connected through a [web application](instant/add-to-your-app), or a [smart contract](instant/deploying-delegates.md) running on a blockchain, is equipped to trade. Some peers are designed to always provide prices for taking. Some peers are designed to always request prices and take them. Some, both. Generally, peers can take either side of a trade, depending on their intentions.

Many forms of trading can be done peer-to-peer, including RFQ, last look, limit orders (issuing fixed price quotes), and partial fills (requesting specific amounts), in a fully trustless way. Additionally, two powerful features include authorizations and affiliates.

**For makers** no costly price updates with onchain order books. Prices are per request. Easily manage exposure by issuing multiple orders with the same nonce, and if needed, cancellations can be batched or fully invalidated below a nonce value.

**For end users** every trade is peer-to-peer, which means no trading fees, no deposits, and no sign-ups. AirSwap is a decentralized trading network that's simple enough to stay intuitive, secure, and liquid, without front-running, price slippage, or order collisions.

# Features

**Authorizations** are for peers that trade on behalf of others. These peers are authorized for either side of a trade, and can be wallets (people or programs) or smart contracts.

**Affiliates** are third-parties compensated for their part in bringing together the two parties of a trade, and can be other traders or software applications that connect traders on the network.

# Indexers

Peers use indexers to signal their intent to trade and to find others who share mututal intent. Indexers are smart contracts that manage "indexes" of "locators" that represent endpoints at which a peer can be found. Each index is sorted based on the number of tokens each peer has staked for its locator.

# Instant

Instant is an automated OTC network that implements most features. [Learn more about Instant](instant/architecture.md)

# Trader

Trader is a simple tool for building and sharing peer-to-peer orders. [Learn more about Trader](instant/architecture.md)
