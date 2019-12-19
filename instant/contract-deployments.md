# Mainnet

| Contract | Version                                                           | Address                                                                                                                 | Commit                                                                                                        |
| :------- | :---------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------ |
| Swap     | [`4.3.5`](https://www.npmjs.com/package/@airswap/swap/v/4.3.5)    | [`0x5fc1d62123558feAbad1B806FDEfeC1dE61162dE`](https://etherscan.io/address/0x5fc1d62123558feAbad1B806FDEfeC1dE61162dE) | [`5e8a07c`](https://github.com/airswap/airswap-protocols/commit/5e8a07c7cb7d2b9a8456194eeb43da853b21f45f) |
| Indexer  | [`3.6.7`](https://www.npmjs.com/package/@airswap/indexer/v/3.6.7) | [`0x08FaDac1e47e92c8C01D590147208bDA84594dB3`](https://etherscan.io/address/0x08FaDac1e47e92c8C01D590147208bDA84594dB3) | [`5e8a07c`](https://github.com/airswap/airswap-protocols/commit/5e8a07c7cb7d2b9a8456194eeb43da853b21f45f) |
| DelegateFactory    | [`1.5.6`](https://www.npmjs.com/package/@airswap/delegate/v/1.5.6)   | [`0xCE4a46E27986c523d989aD929b42B0e6714C6CC8`](https://etherscan.io/address/0xCE4a46E27986c523d989aD929b42B0e6714C6CC8) | [`5e8a07c`](https://github.com/airswap/airswap-protocols/commit/5e8a07c7cb7d2b9a8456194eeb43da853b21f45f) |
| Wrapper  | [`2.5.7`](https://www.npmjs.com/package/@airswap/wrapper/v/2.5.7) | [`0x200c6958F6B5dfb463F84f67792b9e8a9966829F`](https://etherscan.io/address/0x200c6958F6B5dfb463F84f67792b9e8a9966829F) | [`5e8a07c`](https://github.com/airswap/airswap-protocols/commit/5e8a07c7cb7d2b9a8456194eeb43da853b21f45f) |
| Types    | [`2.4.4`](https://www.npmjs.com/package/@airswap/types/v/2.4.4)   | [`0xCE4a46E27986c523d989aD929b42B0e6714C6CC8`](https://etherscan.io/address/0xCE4a46E27986c523d989aD929b42B0e6714C6CC8) | [`5e8a07c`](https://github.com/airswap/airswap-protocols/commit/5e8a07c7cb7d2b9a8456194eeb43da853b21f45f) |

# Rinkeby

| Contract | Version                                                           | Address                                                                                                                         | Commit                                                                                                        |
| :------- | :---------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| Swap     | [`2.3.2`](https://www.npmjs.com/package/@airswap/swap/v/3.3.4)    | [`0xE032C9585fF89FE9e9e99a3E49c9f302Aa636D77`](https://rinkeby.etherscan.io/address/0xE032C9585fF89FE9e9e99a3E49c9f302Aa636D77) | [`96c0...aa07`](https://github.com/airswap/airswap-protocols/commit/96c0a5ef627f5539ce638e8408b2a4373e6baa07) |
| Indexer  | [`2.6.7`](https://www.npmjs.com/package/@airswap/indexer/v/2.6.7) | [`0x18C90516a38Dd7B779A8f6C19FA698F0F4Efc7FC`](https://rinkeby.etherscan.io/address/0x18C90516a38Dd7B779A8f6C19FA698F0F4Efc7FC) | [`6ae6...5cbd`](https://github.com/airswap/airswap-protocols/commit/6ae6b1aedce4aafb3d006bc77525c2c0e5625cbd) |
| Wrapper  | [`0.4.1`](https://www.npmjs.com/package/@airswap/wrapper/v/0.4.1) | [`0x56b5236826836c722B70B1E9785ae829aCFccC6D`](https://rinkeby.etherscan.io/address/0x56b5236826836c722B70B1E9785ae829aCFccC6D) | [`96c0...aa07`](https://github.com/airswap/airswap-protocols/commit/96c0a5ef627f5539ce638e8408b2a4373e6baa07) |
| Types    | [`0.4.2`](https://www.npmjs.com/package/@airswap/types/v/0.4.2)   | [`0x748981557D20b6C42052A5018CF33385F0da669C`](https://rinkeby.etherscan.io/address/0x748981557D20b6C42052A5018CF33385F0da669C) | [`96c0...aa07`](https://github.com/airswap/airswap-protocols/commit/96c0a5ef627f5539ce638e8408b2a4373e6baa07) |

# Deploy Process

See [Deployer](https://github.com/airswap/airswap-protocols/tree/master/utils/deployer) for a guide to the deployment process. Each deploy has the following outputs:

- A new contract is deployed from the master branch.
- After deploy, the contract source code is verified on Etherscan.
- New contract addresses are written to `deploys.json` in each package. (Both on GitHub and NPM)
- New contract ABI is written to `build/contracts` in each package. (Only on NPM)

# Contract Versioning

Packages are versioned based on deploys. Major versions e.g. 1.x.x are mainnet deploys, while minor versions e.g. x.1.x are rinkeby deploys. Packages that are not deployed increment patch versions e.g. x.x.1.

**MAJOR.MINOR.PATCH** (Semantic Versioning)

- _MAJOR_ is incremented on _MAINNET_ deploy
- _MINOR_ is incremented on _TESTNET_ deploy (specifically RINKEBY)
- _PATCH_ is incremented to publish to NPM, unrelated to a deploy.
