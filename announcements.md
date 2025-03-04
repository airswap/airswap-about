For up-to-date information see [AirSwap on X](https://x.com/airswap) and [AirSwap on Discord](https://discord.gg/Pc6gV3hFjR).

## 4.1 Migration: 30 January, 2024

- All makers **must** migrate to [V4.1](./technology/deployments.md) on or after **30 January**, 2024.
- Makers **must** set a server URL and add supported tokens to the [V4.1 Registry](./technology/deployments#airswap-v4.1) contract and approve the [V4.1 SwapERC20](./technology/deployments#airswap-v4.1) contract for supported tokens. AirSwap CLI [4.1.4](https://www.npmjs.com/package/airswap/v/4.1.4) supports these operations.
- Makers **should** remove all tokens from and revoke approvals for the [V3 Registry](https://etherscan.io/address/0x8F9DA6d38939411340b19401E8c54Ea1f51B8f95) and revoke approvals for [V4 SwapERC20](./technology/deployments#airswap-v4) contracts. AirSwap CLI [4.0.6](https://www.npmjs.com/package/airswap/v/4.0.6) supports these operations.
- Only once all supported tokens are removed from the V3 Registry is all staked AST returned to the maker, which can then be staked to the V4.1 Registry.
- For questions and support please see the [#developers](https://discord.com/channels/590643190281928738/877682977616838656) channel on Discord.

## Linea Voyage: 8-16 December, 2023

**To complete the bonus OTC task for [Wave 7: Trading](https://www.intract.io/linea/quest/6572fc0bef415b56fd67608f)**

- Either make or take an order. If you make an order, you can take it with another account you own.
- One of the sides (maker or taker) of the order must have a value of $15 or more.
- If you make an order with ETH, it will be wrapped as WETH, a 1:1 conversion of ETH to make it swappable.
- If you take an order with WETH, you can unwrap it by clicking RFQ and swapping WETH to ETH on [https://linea.airswap.eth.limo/](https://linea.airswap.eth.limo/).

**To make an OTC order**

1. Navigate to [https://linea.airswap.eth.limo/](https://linea.airswap.eth.limo/)
2. Choose "OTC" from the side menu.
3. Select tokens to send and receive, one of which must have value of at least $15.
4. Optionally change the expiry or set a specific taker address.
5. Sign and share the URL on the [AirSwap Discord](https://discord.gg/9sEBHXnD).
6. Your counterparty (or another account you own) must take the order.

Your order transaction should look [something like this](https://lineascan.build/tx/0x774b7ccc7495fdb1144471bcea1b29cd8de76b1d00a784c21bd8e5c3a6eabc80) (potentially different tokens and amounts).

**To take an OTC order**

1. Find available orders on the [AirSwap Discord](https://discord.gg/9sEBHXnD).
2. Click one of the `linea.airswap.eth.limo` links to take it.

**Verification may take a few hours** but if the swap is valid it will be verified by Intract.

## 4.1.1 Release: 26 October, 2023

- `v4.1.1` release has been tagged on [GitHub](https://github.com/airswap/airswap-protocols/releases).
- Includes latest Registry, SwapERC20, Wrapper, Registry, and Pool across all [19 supported chains](https://github.com/airswap/airswap-protocols/blob/v4.1.1/tools/constants/index.ts#L10).
- All network participants are encouraged to upgrade. [Latest contract addresses](./technology/deployments.md) are up to date.

## Activate Shutdown: 3 October, 2023

- On **3 October, 2023**, the Activate [Voting Portal](https://activate.codefi.network/staking/airswap/governance) will shut down.
- On **5 October, 2023**, a new application will be available for staking and voter rewards.
- The new application will be shared exclusively via the official [AirSwap X](https://x.com/airswap) account and [AirSwap Discord](https://discord.gg/Pc6gV3hFjR).
- Any unused Activate points will be migrated to the new voter rewards application.
