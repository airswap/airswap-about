
## Deploy and Versioning System

Description of our deploy, package, and versioning system to AirSwap Docs

## Deploy Process

The step-by-step guide to the deployment process is documented within (https://github.com/airswap/airswap-protocols/blob/master/DEPLOYMENT_GUIDE.md). Deployments to public networks are only carried out on the master branch. Contracts will be deployed to a public network and then their source code will be verified on Etherscan. Post-deploy, the addresses are updated in the repo in `deploys.json`. 


## Smart Contract Versioning

**MAJOR.MINOR.PATCH (Semantic Versioning) similar to NPM**

**MAJOR** will be incremented on refer to MAINNET releases

**MINOR** will be incremented on TESTNET releases, specifically RINKEY

**PATCH** will be incremented at a release cadence (proposing at least every 2 weeks)

Each subrepo: delegate, delegate-factory, index, indexer, swap, tokens, types, wrapper will have its own version stored within the package.json

There will not be a version in the root package.json as each subrepo has its own versioning. Swap and Types are coupled. Delegate and DelegateFactory are also coupled. Indexer and Index are also coupled. Coupled meaning that they should both of the have versions.

## Cutting release process

- Confirm with team we're ready and master is in a good place
- git tag -a v0.0.0 -m "Releasing version v1.0.0 <some nice msg> "

## What's part of the release?

This portion can be added via Github rather than cmdline Git.

- Swap version + that's deployed + address
- contract versions (semver)
- Abis, located in build within npm post deploy to Rinkeby
- contract addresses prior to cutting release

### Deploy

### Package and Versioning

