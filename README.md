# Welcome

[![Discord](https://img.shields.io/discord/590643190281928738.svg)](https://chat.airswap.io) ![Twitter Follow](https://img.shields.io/twitter/follow/airswap?style=social) ![Subreddit subscribers](https://img.shields.io/reddit/subreddit-subscribers/AirSwap?style=social) ![GitHub stars](https://img.shields.io/github/stars/airswap/airswap-protocols?style=social)

[AirSwap](https://www.airswap.io/) is an open developer community building decentralized trading systems. AirSwap technology powers peer-to-peer swap networks using facto standard [RFQ](technology/request-for-quote.md) and [Last Look](technology/last-look.md) protocols making it the weapon of choice for traditional market makers entering the decentralized financial system.

Our vision is a future where all forms of value are represented as digital assets and flow freely and reliably among people and communities around the world. Our mission is to be the world’s best peer-to-peer trading system: a fundamental primitive of the decentralized economy.

* **AirSwap** is recognized by...
  * **St. Louis Fed** as the leading peer-to-peer trading protocol [→](https://research.stlouisfed.org/publications/review/2021/02/05/decentralized-finance-on-blockchain-and-smart-contract-based-financial-markets)
  * **MIT Technology Review** as a protocol built to survive [→](https://www.technologyreview.com/2018/02/22/145100/when-the-cryptocurrency-bubble-pops-these-tokens-are-built-to-survive/)
  * **Stanford Journal** on Blockchain Law and Policy [→](https://stanford-jblp.pubpub.org/pub/deconstructing-dex/release/1)
  * _**Trust Machine**_, a 2018 film about the blockchain industry [→](https://www.imdb.com/title/tt7407496/)
* Used for the **first ever peer-to-peer swap** of a tokenized security [→](https://tokenist.com/airswap-facilitates-first-compliant-security-token-transfer-on-a-public-blockchain/)
* **Rated \#1 in security** among decentralized exchanges \(DEX\) [→](https://icorating.com/pdf/65/1/pnN3XH96SRWtSs1YMNn2MSw805II3mD7UwKyMrPA.pdf)
* Founding member of **"wrapped bitcoin" \(WBTC\)** to represent bitcoin on Ethereum [→](https://www.bitgo.com/newsroom/press-releases/wbtc-brings-bitcoin-to-ethereum)
* Active in the **Ethereum community** and a champion of the technology [→](https://medium.com/fluidity/airswap-devcon-5-43adcf758ba8)

## Technology

AirSwap introduced a decentralized peer-to-peer network for trading digital assets: a novel design that protects traders from counterparty risk, price slippage, and front running. Any market participant can discover each other and trade directly peer-to-peer using a combination of web protocols and smart contracts. AirSwap technology is open source and can be found on [GitHub](https://github.com/airswap/).

### Benefits

At the core, AirSwap enables two parties to perform an "atomic" swap, through which both sides succeed or the entire transaction reverts. This type of transaction is "trustless" such that neither party needs to trust one another to transact.

* **Not your keys, not your coins**. AirSwap is non-custodial and without deposits or escrow. Every transaction is peer-to-peer with no counterparty risk, intermediating participants, or infrastructure beyond the Ethereum virtual machine.
* **Competitive and efficient**. Trading firms provide liquidity via AirSwap at competitive prices because they hedge on centralized exchanges. Since it’s peer-to-peer, the price you see is the price you get, without slippage, front running, or manipulation.
* **Zero limitations**. Each swap is between two parties, two tokens, and a smart contract. This means any digital asset conforming to ERC20, ERC721, or ERC1155 can be swapped at a custom price and at any size. No matter the swap, settlement is cheap and efficient.

### Protocols

At the protocol level, each swap is between two parties, a signer and a sender. The signer is the party that creates and cryptographically signs an order, and sender is the party that sends the order to the Ethereum blockchain for settlement.

* [Request-for-quote](technology/request-for-quote.md) \(RFQ\) is an automated request-response protocol for market makers running web servers from which clients request orders via JSON-RPC over HTTP.
* [Last Look](technology/last-look.md) \(LL\) is an automated streaming protocol that allows market makers to stream pricing to clients via JSON-RPC over WebSocket, which in turn submit orders to the server for settlement.
* [Over-the-counter](https://trader.airswap.io/) \(OTC\) is trading between known counterparties via chat applications or email using AirSwap for settlement. Some of the [largest trades](https://etherscan.io/tx/0x346a9f45c70d4f323c67fd0f348b2a8aaa7477a719557c27a8130c8873279d3b) in DeFi have been made on AirSwap OTC.

### Applications

Several applications are available to end users.

* [AirSwap Web](https://preview.airswap.io/) — **\(alpha\)** New open source web app currently in development.
* [AirSwap OTC](https://trader.airswap.io/) — Industry standard OTC interface for large bespoke swaps.
* [AirSwap CLI](https://github.com/airswap/airswap-cli) — Command-line interface for interacting with AirSwap.

### Integrations

Several DEX aggregators and market makers and have implemented AirSwap.

* [MetaMask Swaps](https://metamask.io/swaps.html) — Swap directly from the MetaMask wallet browser extension.
* Market maker activity can be tracked on the [Dune dashboard](https://dune.xyz/queries/28752/57978).

## Community

AirSwap itself is a community asset owned by its token holders, operating as an open project with a transparent decision-making and product development process. Both the network technology and organization aim to be maximally decentralized. Community members stake AirSwap tokens \(AST\) to participate in governance and other community activities and benefits. Ideating, drafting, voting on, and accepting proposals is an open process.

AirSwap is **accessible**, **equitable**, and **transparent**. Every participant and contributor is treated fairly and rewarded consistently. All opportunities are inclusive and available. Decisions are made in the open and contributions are open source. New information is continuously and actively shared throughout.

### Tokens

AirSwap launched the AirSwap Token \(AST\) on [October 10th, 2017](https://medium.com/fluidity/airswap-token-launch-report-fbd04b748eb1) using the original atomic swap contract. The token initially enabled traders to announce their availability and today also functions as a way for contributors to participate in governance and development. AST gives its holders the opportunity to work commensurate with their holdings, and the opportunity to earn commensurate with their contribution, which fundamentally requires active participation. AST is the gateway to joining and being a part of the AirSwap community.

### Principles

Decentralized governance starts with shared principles to align collective decision-making.

1. **Design for simplicity** — Perfection is achieved when there is nothing left to take away. This is especially true with blockchain based technology and applications.
2. **Prioritize security** — Our work is done in an adversarial setting. While blockchain requires users to take security into their own hands, they trust AirSwap to be designed and to operate in a secure way.
3. **Decide with data** — Drive decisions with data that matters. AirSwap performance indicators are trading volume, token holders, community engagement, and tokens used for governance.
4. **Seek opportunity** — Decentralized finance is abundant with opportunities. Seek and prioritize opportunities that positively impact both AirSwap and the broader ecosystem.
5. **Win together** — Our community spans platforms across cyberspace and countries across the globe. We grow by both sharing responsibility and celebrating each success.

### Governance

To generate new ideas and directions for the project and cultivate open decision-making, we use a process called AirSwap Improvement Proposals \(AIP\). AIPs give the community a way to develop and finalize proposals to core contributors on an ongoing basis. For more information see [AIP 1](https://community.airswap.io/t/aip-1-proposal-how-to) and check out [all active proposals](https://github.com/airswap/aips). This process is how the community captures, selects, and prioritizes new projects.

Each AIP is ratified by calling it to vote and being accepted by the token holder community. Voting is held on [Codefi Activate](https://activate.codefi.network/staking/airswap/governance). To participate in governance, see the [Voters](guides/voters.md) guide. Once votes are completed, proposals are considered finalized and placed in a backlog for selection by contributors. Based on requirements and feasibility, contributors may accept the proposal for prioritization and implementation.

## History

AirSwap [launched on October 10th, 2017](https://medium.com/fluidity/airswap-token-launch-report-fbd04b748eb1). Over the years, new products and upgrades have been continuously published to further enable and popularize the benefits of trading digital assets using decentralized protocols. See the years in review for [2018](https://medium.com/fluidity/2018-a-year-in-review-d7f5cb0e5d76) and [2019](https://medium.com/fluidity/2019-a-year-in-review-6b40035e6edb).

* [AirSwap Roadmap](https://medium.com/fluidity/the-airswap-roadmap-1c1a3c3b20d3) \(November 16th, 2017\)
* [AirSwap is Here](https://medium.com/fluidity/airswap-is-here-c83c001d5bbe) \(April 25, 2018\)
* [Spaces is Here](https://medium.com/fluidity/spaces-is-here-a36fa6753474) \(October 10, 2018\)
* [AirSwap Instant 2.0](https://medium.com/fluidity/airswap-instant-2-0-d10906447838) \(April 26, 2019\)
* [AirSwap Trader](https://medium.com/fluidity/introducing-airswap-trader-63a0ef9e67c0) \(August 6, 2019\)
* [AirSwap Delegates](https://medium.com/fluidity/introducing-airswap-delegates-1c3db83be1db) \(February 4, 2020\)
* [Phase II Kickoff](https://twitter.com/airswap/status/1346542008345747457) and [Transition Complete](https://twitter.com/airswap/status/1359190898110853122) \(2021\)

Having achieved its initial goals and delivered its technology roadmap, AirSwap is now an open project and community of contributors who pursue initiatives to continue to develop and grow the network.

## Explore

* AirSwap [Discord Server](https://chat.airswap.io/)
* AirSwap [Voting Portal](https://activate.codefi.network/staking/airswap/governance)
* AirSwap [Twitter](https://twitter.com/airswap)

