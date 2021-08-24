# About AirSwap

- AirSwap is a decentralized network for trading digital assets: a novel design that protects traders from counterparty risk, price slippage, and front running.
- AirSwap is the weapon of choice for traditional market makers entering the decentralized financial system. With its focus on peer-to-peer, AirSwap is the de facto standard for RFQ (“request for quote”) and OTC (“over the counter”) style trading.
- AirSwap itself is an open project and community that collaborates on network development with participants earning protocol fees for their contributions.
- AirSwap is recognized by...
    - **St. Louis Fed** as the leading peer-to-peer trading protocol $^1$
    - **MIT Technology Review** as a protocol built to survive $^2$
    - **Stanford Journal** on Blockchain Law and Policy $^3$
    - ***Trust Machine***, a 2018 film about the blockchain industry $^4$
- Used for the **first ever peer-to-peer swap** of a tokenized security $^5$
- **Rated #1 in security** among decentralized exchanges (DEX) $^6$
- Founding member of **“wrapped bitcoin” (WBTC)** to represent bitcoin on Ethereum $^7$
- Active in the **Ethereum community** and a champion of the technology $^8$

# Background

AirSwap [launched on October 10th, 2017](https://medium.com/fluidity/airswap-token-launch-report-fbd04b748eb1). Over the years, new products and upgrades have been continuously published to further enable and popularize the benefits of trading digital assets using decentralized protocols. See the years in review for [2018](https://medium.com/fluidity/2018-a-year-in-review-d7f5cb0e5d76) and [2019](https://medium.com/fluidity/2019-a-year-in-review-6b40035e6edb).

- [AirSwap Roadmap](https://medium.com/fluidity/the-airswap-roadmap-1c1a3c3b20d3) (November 16th, 2017)
- [AirSwap is Here](https://medium.com/fluidity/airswap-is-here-c83c001d5bbe) (April 25, 2018)
- [Spaces is Here](https://medium.com/fluidity/spaces-is-here-a36fa6753474) (October 10, 2018)
- [AirSwap Instant 2.0](https://medium.com/fluidity/airswap-instant-2-0-d10906447838) (April 26, 2019)
- [AirSwap Trader](https://medium.com/fluidity/introducing-airswap-trader-63a0ef9e67c0) (August 6, 2019)
- [AirSwap Delegates](https://medium.com/fluidity/introducing-airswap-delegates-1c3db83be1db) (February 4, 2020)
- [Phase II Kickoff](https://twitter.com/airswap/status/1346542008345747457) and [Transition Complete](https://twitter.com/airswap/status/1359190898110853122) (2021)

Having achieved its initial goals and delivered its technology roadmap, AirSwap is now an open project and community of contributors who pursue initiatives to continue to develop and grow the network. ConsenSys is the project steward.

# Technology

The two primary use cases for AirSwap are RFQ (“request for quote”) and OTC (“over the counter”), which are productized as AirSwap Instant and AirSwap OTC respectively. Other significant products in the AirSwap ecosystem include MetaMask Swaps.

**AirSwap Instant** is an automated OTC desk. Instantly request real-time quotes from online market makers run by professional trading firms. These firms implement the AirSwap RFQ API to make liquidity available to clients across the Internet directly from their web browser.

**AirSwap OTC** is for bespoke trades. Some of the largest trades in DeFi have been performed using AirSwap OTC for its safety and simplicity. Individuals and communities no longer have to trust escrow or administrators to handle funds: everything is peer-to-peer.

**MetaMask Swaps** is baked right into your favorite digital wallet on desktop and mobile. Implementing the AirSwap RFQ API as one of its core protocols, MetaMask enables its users to get the benefits of AirSwap, trading without slippage and at the lowest fees possible.

## Benefits

At the core, AirSwap enables two parties to perform an “atomic” swap, through which both sides successfully transfer or the entire transaction reverts. This type of transaction is “trustless” such that neither party needs to trust one another to transact.

**Not your keys, not your coins**. AirSwap is non-custodial and without deposits or escrow. Every transaction is peer-to-peer with no counterparty risk, intermediating participants, or infrastructure beyond the Ethereum virtual machine.

**Competitive and efficient**. Trading firms provide liquidity via AirSwap at competitive prices because they hedge on centralized exchanges. Since it’s peer-to-peer, the price you see is the price you get, without slippage, front running, or manipulation.

**Zero limitations**. Each swap is between two parties, two tokens, and a smart contract. This means any digital asset conforming to ERC20, ERC721, or ERC1155 can be swapped at a custom price and at any size. No matter the swap, settlement is cheap and efficient.

See the architecture and how these benefits stack up to alternatives in the appendix.

# Organization

AirSwap itself is a community asset owned by its token holders, operating as an open project with a transparent decision-making and product development process. Both the network technology and organization aim to be maximally decentralized.

## Vision and mission

Our vision is a future where all forms of value are represented as digital assets and flow freely and reliably among people and communities around the world. Our mission within that is to be the world’s best peer-to-peer trading system: a fundamental primitive of a tokenized economy.

See the project values and principles in the appendix.

## Network tokens

AirSwap tokens represent equity in the network and provide opportunities to participate as a stakeholder and earn as a contributor. Network equity, held as staked tokens, grants the holder both voting power and a right to work and earn a share of the cash flows from protocol fees.

The AirSwap Token (AST) launched on October 10th, 2017 using the original atomic swap contract. The token initially enabled traders to announce their availability and today also functions as a way for contributors to participate in governance and development.

AST gives its holders a right to work commensurate with their holdings, and a right to earn commensurate with their contribution, which fundamentally requires active participation. AST is the gateway to joining and being a part of the AirSwap network and community.

## Network development

AirSwap is organized as a decentralized network of contributors using a continuous process called AirSwap Improvement Proposals (AIP). This process is how the community captures, selects, and prioritizes new projects.

Token holders stake AST to participate in network governance and development. Stakers contribute by authoring, voting on, and implementing various AIPs to help develop and grow the network. Each proposal is authored by one or more contributors.

Each AIP is ratified by calling it to vote and being accepted by the token holder community. Once accepted, the AIP is placed in a backlog for selection by developers and implemented. Several participation incentives are built in for authors, voters, and developers.

# Future

Professional trading firms are becoming comfortable operating in a world of decentralized finance. For these firms, the clear benefits of AirSwap over AMMs make building on AirSwap easily justifiable. Looking ahead, some of the most actively traded markets in the world (e.g. FX) work a lot like AirSwap. While AMMs trade massive volumes today due to ease of use, more traditional market participants are onboarding to DeFi and AirSwap will be the choice.

# Architecture

AirSwap works with a combination of web protocols and smart contracts. There are two kinds of liquidity providers in the system, those that run their own HTTP servers to provide liquidity and those that manage onchain Delegates that make trades on their behalf.

[https://lh6.googleusercontent.com/NAU5_nSeoxB-XYvPv7ZSZNoeCS8MeIVLzmib08oqrnqsKwMzORLkay6z5AQIYqC-K9XyCPo9Bup77c8-MkHWh4U0E1ZE9YYy31X_QztdJXm2q-VnueWUaqcGq_sVzgLGbURvfiaQ](https://lh6.googleusercontent.com/NAU5_nSeoxB-XYvPv7ZSZNoeCS8MeIVLzmib08oqrnqsKwMzORLkay6z5AQIYqC-K9XyCPo9Bup77c8-MkHWh4U0E1ZE9YYy31X_QztdJXm2q-VnueWUaqcGq_sVzgLGbURvfiaQ)

Counterparty discovery happens on AirSwap Indexer, a smart contract used by market makers to announce their intent to trade specific token pairs. Along with this intent is either the URL to their HTTP RFQ server or Ethereum address of their onchain Delegate.

Each swap is between at least two parties, a signer and a sender. The signer is the party that creates and cryptographically signs an order, and sender is the party that sends the order to the Ethereum blockchain for settlement.

# RFQ vs. AMM

AirSwap is a request-for-quote network (RFQ) that runs as a combination of off-chain (peer-to-peer negotiation) and on-chain (settlement by atomic swap). Uniswap, alternatively, is an automated market maker (AMM) that runs fully on-chain. There are benefits to each.

On AirSwap there is no price slippage and trades are unlimited size. The trade-off is that it's easier for everyday users to provide liquidity to Uniswap. These days we're seeing the ecosystem mature and more trading firms entering and bringing RFQ servers online.

Liquidity providers on AirSwap and Uniswap are fundamentally different audiences. Anyone can submit a transaction to “add liquidity” to Uniswap and pricing is automated by the smart contract. AirSwap servers run their own pricing logic requiring some sophistication.

# Vision and Mission

Our vision is a future where all forms of value are represented as digital assets and flow freely and reliably among people and communities around the world. Our mission within that is to be the world’s best peer-to-peer trading system: a fundamental primitive of a tokenized economy.

# Values

**Accessibility.** Anyone can participate and contribute to AirSwap. The more open and connected the community is the healthier the network will be.

**Equitability.** Every participant and contributor is treated fairly and rewarded consistently. All opportunities are inclusive and available.

**Transparency.** Decisions are made in the open and contributions are open source. New information is continuously and actively shared throughout.

# Principles

**Design for simplicity.** Perfection is achieved when there is nothing left to take away. This is particularly true with blockchain based technology and applications.

**Prioritize security.** This is an adversarial setting. While blockchain requires users to take security into their own hands, they trust AirSwap to be designed and to operate in a secure way.

**Decide with data.** Drive decisions with data that matters. AirSwap performance indicators are trading volume, stakeholders, community engagement, and tokens used for governance.

**Seek opportunity.** Decentralized finance is abundant with opportunities. Seek and prioritize opportunities that positively impact both AirSwap and the broader ecosystem.

**Win together.** Our community spans platforms across cyberspace and countries across the globe. We grow by both sharing responsibility and celebrating each success.

# References

1. [Decentralized Finance: On Blockchain- and Smart Contract-Based Financial Markets | St. Louis Fed](https://research.stlouisfed.org/publications/review/2021/02/05/decentralized-finance-on-blockchain-and-smart-contract-based-financial-markets)
2. [When the cryptocurrency bubble pops, these tokens are built to survive](https://www.technologyreview.com/2018/02/22/145100/when-the-cryptocurrency-bubble-pops-these-tokens-are-built-to-survive/)
3. [Deconstructing Decentralized Exchanges · Stanford Journal of Blockchain Law & Policy](https://stanford-jblp.pubpub.org/pub/deconstructing-dex/release/1)
4. [Trust Machine: The Story of Blockchain (2018)](https://www.imdb.com/title/tt7407496/)
5. [AirSwap Facilitates First Compliant Security Token Transfer on a Public Blockchain](https://tokenist.com/airswap-facilitates-first-compliant-security-token-transfer-on-a-public-blockchain/)
6. [DEX Security Report](https://icorating.com/pdf/65/1/pnN3XH96SRWtSs1YMNn2MSw805II3mD7UwKyMrPA.pdf)
7. [WBTC Brings Bitcoin to Ethereum](https://www.bitgo.com/newsroom/press-releases/wbtc-brings-bitcoin-to-ethereum)
8. [AirSwap @ Devcon 5](https://medium.com/fluidity/airswap-devcon-5-43adcf758ba8)