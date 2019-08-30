# Introduction

## Swap Contract

We’ve maintained the same simplicity that makes the Swap Protocol elegant. We’ve added support for more token and signature types, improved efficiency, and added two powerful new features: affiliates and authorizations.

### Token types

Token types include ERC-20 and ERC-721 (NFT) with a path to supporting more standards over time. Signature types include both standard and ERC-712 (typed) for improved wallet usability and transparency. All signatures are now more secure by implementing EIP-191.

### Affiliates

Affiliates are third-parties compensated for their part in bringing together two parties making a trade. These come into play if a transaction is facilitated by a third-party or a software application helps to connect its users to other traders on the network.

### Authorizations

Authorizations are for peers that trade on behalf of others. These peers are authorized for either side of a trade, and can be wallets (people or programs) or smart contracts, opening a new world of integration possibilities.
See the Swap source code on GitHub. It’s in production.

See [Swap Contract](swap-contract.md) for details.

## Onchain Indexers

We envision a future of many indexers, supporting makers of many kinds. An indexer employs a token for staking, a necessary utility to give makers an opportunity to be among the first returned when the indexer is queried.
For example, an application like AirSwap Instant may be interested in querying a maximum of 20 prospective makers at a time. By staking variable amounts of AirSwap Token, makers can ensure that they are included among those results and able to provide that liquidity.

In the future, an indexer could be deployed for IPFS hashes that resolve to arbitrary URLs for makers that live around the web at various endpoints speaking various protocols. We think the new indexer design both fits this wide open future and matches our original vision well.

See [Onchain Indexers](onchain-indexers.md) for details.

## Onchain Peers

The authorization feature enables traders to deploy smart contracts that implement the Peer Protocol and trade on their behalf. The simplest form of this is rules that effectively provide limit orders and partial fills. Others can include arbitrary logic and integrations with other liquidity sources.

The AirSwap network today, comprised of automated makers and trading desks, does a great job covering higher liquidity assets and large over-the-counter trades. Onchain liquidity now lets everyday people and token teams participate without having to run online maker software.

In combination with existing automated makers and trading desks, we think this solution fills the long tail of liquidity completes the picture.

See [Onchain Peers](onchain-peers.md) for details.
