# Mainnet

| Contract | Version                                                           | Address                                                                                                                 | Commit                                                                                                        |
| :------- | :---------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------ |
| Swap     | [`3.3.5`](https://www.npmjs.com/package/@airswap/swap/v/3.3.5)    | [`0x5fc1d62123558feAbad1B806FDEfeC1dE61162dE`](https://etherscan.io/address/0x5fc1d62123558feAbad1B806FDEfeC1dE61162dE) | [`6ae3...4902`](https://github.com/airswap/airswap-protocols/commit/6ae3e6f900f791562d4f893086702b87bd484902) |
| Indexer  | [`2.6.7`](https://www.npmjs.com/package/@airswap/indexer/v/2.6.7) | [`0x08FaDac1e47e92c8C01D590147208bDA84594dB3`](https://etherscan.io/address/0x08FaDac1e47e92c8C01D590147208bDA84594dB3) | [`6ae6...5cbd`](https://github.com/airswap/airswap-protocols/commit/6ae6b1aedce4aafb3d006bc77525c2c0e5625cbd) |
| Wrapper  | [`1.5.5`](https://www.npmjs.com/package/@airswap/wrapper/v/1.5.5) | [`0x200c6958F6B5dfb463F84f67792b9e8a9966829F`](https://etherscan.io/address/0x200c6958F6B5dfb463F84f67792b9e8a9966829F) | [`6ae3...4902`](https://github.com/airswap/airswap-protocols/commit/6ae3e6f900f791562d4f893086702b87bd484902) |
| Types    | [`1.4.4`](https://www.npmjs.com/package/@airswap/types/v/1.4.4)   | [`0xCE4a46E27986c523d989aD929b42B0e6714C6CC8`](https://etherscan.io/address/0xCE4a46E27986c523d989aD929b42B0e6714C6CC8) | [`6ae3...4902`](https://github.com/airswap/airswap-protocols/commit/6ae3e6f900f791562d4f893086702b87bd484902) |

# Rinkeby

| Contract | Version                                                           | Address                                                                                                                         | Commit                                                                                                        |
| :------- | :---------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| Swap     | [`2.3.2`](https://www.npmjs.com/package/@airswap/swap/v/3.3.4)    | [`0xE032C9585fF89FE9e9e99a3E49c9f302Aa636D77`](https://rinkeby.etherscan.io/address/0xE032C9585fF89FE9e9e99a3E49c9f302Aa636D77) | [`96c0...aa07`](https://github.com/airswap/airswap-protocols/commit/96c0a5ef627f5539ce638e8408b2a4373e6baa07) |
| Indexer  | [`2.6.7`](https://www.npmjs.com/package/@airswap/indexer/v/2.6.7) | [`0x18C90516a38Dd7B779A8f6C19FA698F0F4Efc7FC`](https://rinkeby.etherscan.io/address/0x18C90516a38Dd7B779A8f6C19FA698F0F4Efc7FC) | [`6ae6...5cbd`](https://github.com/airswap/airswap-protocols/commit/6ae6b1aedce4aafb3d006bc77525c2c0e5625cbd) |
| Wrapper  | [`0.4.1`](https://www.npmjs.com/package/@airswap/wrapper/v/0.4.1) | [`0x56b5236826836c722B70B1E9785ae829aCFccC6D`](https://rinkeby.etherscan.io/address/0x56b5236826836c722B70B1E9785ae829aCFccC6D) | [`96c0...aa07`](https://github.com/airswap/airswap-protocols/commit/96c0a5ef627f5539ce638e8408b2a4373e6baa07) |
| Types    | [`0.4.2`](https://www.npmjs.com/package/@airswap/types/v/0.4.2)   | [`0x748981557D20b6C42052A5018CF33385F0da669C`](https://rinkeby.etherscan.io/address/0x748981557D20b6C42052A5018CF33385F0da669C) | [`96c0...aa07`](https://github.com/airswap/airswap-protocols/commit/96c0a5ef627f5539ce638e8408b2a4373e6baa07) |
>>>>>>> e4467ee5cc38080bc11ea7e7ebc6a8a4cdaad111



## Deploy Process

The step-by-step guide to the deployment process is documented within (https://github.com/airswap/airswap-protocols/blob/master/DEPLOYMENT_GUIDE.md). Deployments to public networks are only carried out on the master branch. Contracts will be deployed to a public network and then their source code will be verified on Etherscan. Post-deploy, the addresses are updated in the repo in `deploys.json` and versions of the contracts a incremented based on the versioning schema described below. The ABIs and contracts are published to npm allow application developers to pull from correct versions.


## Smart Contract Versioning

**MAJOR.MINOR.PATCH (Semantic Versioning) similar to NPM**

**MAJOR** will be incremented on refer to MAINNET releases

**MINOR** will be incremented on TESTNET releases, specifically RINKEY

**PATCH** will be incremented at a release cadence (proposing at least every 2 weeks)

Each subrepo: delegate, delegate-factory, index, indexer, swap, tokens, types, wrapper will have its own version stored within the package.json

There will not be a version in the root package.json as each subrepo has its own versioning. To help manage the dependencies, there is a dependency-checker script within the `scripts` folder.

## What's part of the release and published to NPM?

- Swap version + that's deployed + address
- contract versions (semver)
- Abis, located in build within npm with version update
- contract addresses located within deploys.json
