# Mainnet

| Contract | Version                                                            | Address                                                                                                                 | Commit                                                                                                    |
| :------- | :----------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| Swap     | [`4.3.5`](https://www.npmjs.com/package/@airswap/swap/v/4.3.5)     | [`0x3E0c31C3D4067Ed5d7d294F08B79B6003B7bf9c8`](https://etherscan.io/address/0x3E0c31C3D4067Ed5d7d294F08B79B6003B7bf9c8) | [`5e8a07c`](https://github.com/airswap/airswap-protocols/commit/5e8a07c7cb7d2b9a8456194eeb43da853b21f45f) |
| Indexer  | [`3.6.7`](https://www.npmjs.com/package/@airswap/indexer/v/3.6.7)  | [`0xbA9aB9710Bd461F30C247f4cA2Cb7f453C22570e`](https://etherscan.io/address/0xbA9aB9710Bd461F30C247f4cA2Cb7f453C22570e) | [`5e8a07c`](https://github.com/airswap/airswap-protocols/commit/5e8a07c7cb7d2b9a8456194eeb43da853b21f45f) |
| Delegate | [`1.5.6`](https://www.npmjs.com/package/@airswap/delegate/v/1.5.6) | [`0xCA109988465266970bE8fd0048A7e235b9e62Bc3`](https://etherscan.io/address/0xCA109988465266970bE8fd0048A7e235b9e62Bc3) | [`5e8a07c`](https://github.com/airswap/airswap-protocols/commit/5e8a07c7cb7d2b9a8456194eeb43da853b21f45f) |
| Wrapper  | [`2.5.7`](https://www.npmjs.com/package/@airswap/wrapper/v/2.5.7)  | [`0xC4c01Afb1211E007CFA48f56552FB8a8B0Bdc51c`](https://etherscan.io/address/0xC4c01Afb1211E007CFA48f56552FB8a8B0Bdc51c) | [`5e8a07c`](https://github.com/airswap/airswap-protocols/commit/5e8a07c7cb7d2b9a8456194eeb43da853b21f45f) |
| Types    | [`2.4.4`](https://www.npmjs.com/package/@airswap/types/v/2.4.4)    | [`0xef5ED6D6f1600C56c54c51841bCF97421CDdb52d`](https://etherscan.io/address/0xef5ED6D6f1600C56c54c51841bCF97421CDdb52d) | [`5e8a07c`](https://github.com/airswap/airswap-protocols/commit/5e8a07c7cb7d2b9a8456194eeb43da853b21f45f) |

# Rinkeby

| Contract | Version                                                           | Address                                                                                                                         | Commit                                                                                                        |
| :------- | :---------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| Swap     | [`2.3.2`](https://www.npmjs.com/package/@airswap/swap/v/3.3.4)    | [`0xa03855b0695013cF331FbD91dd7cBc4C2211793f`](https://rinkeby.etherscan.io/address/0xa03855b0695013cF331FbD91dd7cBc4C2211793f) | [`5e8a07c`](https://github.com/airswap/airswap-protocols/commit/5e8a07c7cb7d2b9a8456194eeb43da853b21f45f) |
| Indexer  | [`2.6.7`](https://www.npmjs.com/package/@airswap/indexer/v/2.6.7) | [`0x10F6702447414cE1250Af5f7000D7c9A0f04E824`](https://rinkeby.etherscan.io/address/0x10F6702447414cE1250Af5f7000D7c9A0f04E824) | [`5e8a07c`](https://github.com/airswap/airswap-protocols/commit/5e8a07c7cb7d2b9a8456194eeb43da853b21f45f) |
| DelegateFactory    | [`1.5.6`](https://www.npmjs.com/package/@airswap/delegate/v/1.5.6)   | [`0xd393FB3f3062e208049FC75B26BFa5aB0890CBB3`](https://etherscan.io/address/0xd393FB3f3062e208049FC75B26BFa5aB0890CBB3) | [`5e8a07c`](https://github.com/airswap/airswap-protocols/commit/5e8a07c7cb7d2b9a8456194eeb43da853b21f45f) |
| Wrapper  | [`0.4.1`](https://www.npmjs.com/package/@airswap/wrapper/v/0.4.1) | [`0x33356FcCF3bdeb37f3CD3Dc5382Ae5BF4AAda26c`](https://rinkeby.etherscan.io/address/0x33356FcCF3bdeb37f3CD3Dc5382Ae5BF4AAda26c) | [`5e8a07c`](https://github.com/airswap/airswap-protocols/commit/5e8a07c7cb7d2b9a8456194eeb43da853b21f45f) |
| Types    | [`0.4.2`](https://www.npmjs.com/package/@airswap/types/v/0.4.2)   | [`0xe25b7504856bfb230b7c32BC87047479815cbc70`](https://rinkeby.etherscan.io/address/0xe25b7504856bfb230b7c32BC87047479815cbc70) | [`5e8a07c`](https://github.com/airswap/airswap-protocols/commit/5e8a07c7cb7d2b9a8456194eeb43da853b21f45f) |

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
