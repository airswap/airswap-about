[![Discord](https://img.shields.io/discord/590643190281928738.svg)](https://chat.airswap.io) ![Twitter Follow](https://img.shields.io/twitter/follow/airswap?style=social) ![Subreddit subscribers](https://img.shields.io/reddit/subreddit-subscribers/AirSwap?style=social) ![GitHub stars](https://img.shields.io/github/stars/airswap/airswap-protocols?style=social)

[AirSwap](https://www.airswap.io/) is a peer-to-peer trading network for Ethereum tokens. Peers connect based on common interest, agree on a price through mutual cryptographic signatures, and settle trades without intermediaries. At the heart of the AirSwap network is the [Swap](contracts/swap.md) contract, which enables trustless peer-to-peer trading. Swap is a simple contract with support for a variety of tokens and signature types.

**For end users** every trade is peer-to-peer, which means no trading fees, no deposits, and no sign-ups. AirSwap is a decentralized trading network that's simple enough to stay intuitive, secure, and liquid, without front-running, price slippage, or order collisions.

**For makers** no costly price updates with onchain order books. Prices are per request. Easily manage exposure by issuing multiple orders with the same nonce, and if needed, cancellations can be batched or fully invalidated below a nonce value.

{% hint style="warning" %}
This documentation is in the works and subject to change.
{% endhint %}

# Quick Start

- **Build** on **Smart Contracts** → [Swap](./contracts/swap.md) · [Indexer](./contracts/indexer.md) · [Delegate](./contracts/delegate.md)
- **Build** for the **Automated** trading network → [Instant](./instant/add-to-your-app.md)
- **Build** for **Manual** / **OTC** trading applications → [Trader](./trader/add-to-your-app.md)

# Around the Web

- **Website** → https://www.airswap.io/
- **Blog** → https://blog.airswap.io/
- **Support** → https://support.airswap.io/
- **Discord** → https://chat.airswap.io/

# Mainnet Deploys

| Contract | Version | Address                                                                                                                 |
| :------- | :------ | :---------------------------------------------------------------------------------------------------------------------- |
| Swap     | `2.1.0` | [`0x54d2690e97e477a4b33f40d6e4afdd4832c07c57`](https://etherscan.io/address/0x54d2690e97e477a4b33f40d6e4afdd4832c07c57) |
| Types    | `0.2.0` | [`0x2fA5d35f9c99E11a75F2D3cD9F6E6d904a1241C5`](https://etherscan.io/address/0x2fA5d35f9c99E11a75F2D3cD9F6E6d904a1241C5) |
| Swap     | `1.0.0` | [`0x8fd3121013a07c57f0d69646e86e7a4880b467b7`](https://etherscan.io/address/0x8fd3121013a07c57f0d69646e86e7a4880b467b7) |

# Rinkeby Deploys

| Contract | Version | Application                                                                                                                     |
| :------- | :------ | :------------------------------------------------------------------------------------------------------------------------------ |
| Swap     | `2.1.0` | [`0x6f337bA064b0a92538a4AfdCF0e60F50eEAe0D5B`](https://rinkeby.etherscan.io/address/0x6f337bA064b0a92538a4AfdCF0e60F50eEAe0D5B) |
| Types    | `0.2.0` | [`0x4A041FA0a727c828616C83C090585913221641ba`](https://rinkeby.etherscan.io/address/0x4A041FA0a727c828616C83C090585913221641ba) |
