# Mainnet

| Contract | Version                                                            | Address                                                                                                                 | Commit                                                                                                    |
| :------- | :----------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| Swap     | [`5.4.7`](https://www.npmjs.com/package/@airswap/swap/v/5.4.7)     | [`0x4572f2554421Bd64Bef1c22c8a81840E8D496BeA`](https://etherscan.io/address/0x4572f2554421Bd64Bef1c22c8a81840E8D496BeA) | [`953956f`](https://github.com/airswap/airswap-protocols/commit/953956f308c65ec53d1f1b20d35f47fe04b936af) |
| Indexer  | [`3.6.8`](https://www.npmjs.com/package/@airswap/indexer/v/3.6.8)  | [`0xbA9aB9710Bd461F30C247f4cA2Cb7f453C22570e`](https://etherscan.io/address/0xbA9aB9710Bd461F30C247f4cA2Cb7f453C22570e) | [`5e8a07c`](https://github.com/airswap/airswap-protocols/commit/5e8a07c7cb7d2b9a8456194eeb43da853b21f45f) |
| Delegate | [`2.6.8`](https://www.npmjs.com/package/@airswap/delegate/v/2.6.8) | [`0x072073f78a2d58610Ee3d5e170CA7AC9CB58a345`](https://etherscan.io/address/0x072073f78a2d58610Ee3d5e170CA7AC9CB58a345) | [`953956f`](https://github.com/airswap/airswap-protocols/commit/953956f308c65ec53d1f1b20d35f47fe04b936af) |
| Wrapper  | [`3.6.8`](https://www.npmjs.com/package/@airswap/wrapper/v/3.6.8)  | [`0x28de5C5f56B6216441eE114e832808D5B9d4A775`](https://etherscan.io/address/0x28de5C5f56B6216441eE114e832808D5B9d4A775) | [`953956f`](https://github.com/airswap/airswap-protocols/commit/953956f308c65ec53d1f1b20d35f47fe04b936af) |
| Types    | [`3.5.5`](https://www.npmjs.com/package/@airswap/types/v/3.5.5)    | [`0xa42d613D8B8B6cB9507F46A5dd3FD98276570FD7`](https://etherscan.io/address/0xa42d613D8B8B6cB9507F46A5dd3FD98276570FD7) | [`953956f`](https://github.com/airswap/airswap-protocols/commit/953956f308c65ec53d1f1b20d35f47fe04b936af) |

# Rinkeby

| Contract | Version                                                            | Address                                                                                                                         | Commit                                                                                                    |
| :------- | :----------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| Swap     | [`5.4.7`](https://www.npmjs.com/package/@airswap/swap/v/5.4.7)     | [`0xa03855b0695013cF331FbD91dd7cBc4C2211793f`](https://rinkeby.etherscan.io/address/0xa03855b0695013cF331FbD91dd7cBc4C2211793f) | [`953956f`](https://github.com/airswap/airswap-protocols/commit/953956f308c65ec53d1f1b20d35f47fe04b936af) |
| Indexer  | [`3.6.8`](https://www.npmjs.com/package/@airswap/indexer/v/3.6.8)  | [`0x10F6702447414cE1250Af5f7000D7c9A0f04E824`](https://rinkeby.etherscan.io/address/0x10F6702447414cE1250Af5f7000D7c9A0f04E824) | [`5e8a07c`](https://github.com/airswap/airswap-protocols/commit/5e8a07c7cb7d2b9a8456194eeb43da853b21f45f) |
| Delegate | [`2.6.8`](https://www.npmjs.com/package/@airswap/delegate/v/2.6.8) | [`0xd393FB3f3062e208049FC75B26BFa5aB0890CBB3`](https://etherscan.io/address/0xd393FB3f3062e208049FC75B26BFa5aB0890CBB3)         | [`953956f`](https://github.com/airswap/airswap-protocols/commit/953956f308c65ec53d1f1b20d35f47fe04b936af) |
| Wrapper  | [`3.6.8`](https://www.npmjs.com/package/@airswap/wrapper/v/3.6.8)  | [`0x33356FcCF3bdeb37f3CD3Dc5382Ae5BF4AAda26c`](https://rinkeby.etherscan.io/address/0x33356FcCF3bdeb37f3CD3Dc5382Ae5BF4AAda26c) | [`953956f`](https://github.com/airswap/airswap-protocols/commit/5e8a07c7cb7d2b9a8456194eeb43da853b21f45f) |
| Types    | [`3.5.5`](https://www.npmjs.com/package/@airswap/types/v/3.5.5)    | [`0xe25b7504856bfb230b7c32BC87047479815cbc70`](https://rinkeby.etherscan.io/address/0xe25b7504856bfb230b7c32BC87047479815cbc70) | [`953956f`](https://github.com/airswap/airswap-protocols/commit/953956f308c65ec53d1f1b20d35f47fe04b936af) |

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
