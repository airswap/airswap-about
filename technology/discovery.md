# Discovery

To find servers that support a token pair, clients call the `getURLsForToken` function on the [Registry](https://github.com/airswap/airswap-docs/tree/82d700b725317da365a3680f53106d69db7273bc/technology/deployments/README.md) contract for each token and then intersect the results. For example, if the resulting URLs for token A are `[maker1.com, maker2.com]` and for token B are `[maker2.com, maker3.com]` then the only server supporting swapping token A for B is `maker2.com`.

See `getURLsForToken` on the Registry contract:

```typescript
function getURLsForToken(address token) external view returns (string[] memory urls);
```

Check [deployments](https://github.com/airswap/airswap-docs/tree/82d700b725317da365a3680f53106d69db7273bc/technology/deployments/README.md) for latest contract addresses for Registry.

### Connections

When connecting via HTTP, the server may respond with status code 426 \(Upgrade Required\) in which case the client should connect using WebSocket.

## TypeScript

Using the `Registry` library from `@airswap/protocols` can return `Server` objects that implement the [RFQ API](request-for-quote.md).

```typescript
import { Registry } from '@airswap/protocols'
const servers = await new Registry(chainId, provider).getServers(
  signerToken,
  senderToken,
)
```

Calling the Registry directly using `ethers`

```typescript
import { ethers } from 'ethers'
import { chainNames } from '@airswap/constants'
import * as RegistryContract from '@airswap/registry/build/contracts/Registry.sol/Registry.json'
import * as registryDeploys from '@airswap/registry/deploys.js'
const RegistryInterface = new ethers.utils.Interface(
  JSON.stringify(RegistryContract.abi),
)

new ethers.Contract(
  registryDeploys[chainId],
  RegistryInterface,
  ethers.getDefaultProvider(chainNames[chainId].toLowerCase()),
)

const signerTokenURLs = await this.contract.getURLsForToken(signerToken)
const senderTokenURLs = await this.contract.getURLsForToken(senderToken)

const serverURLs = signerTokenURLs.filter((value) =>
  senderTokenURLs.includes(value),
)
```

## Using the CLI

Ensure the AirSwap CLI is installed.

```text
$ yarn global add airswap
```

Use `airswap chain` to set your chain to Rinkeby or Mainnet.

```text
$ airswap chain
AirSwap CLI 1.6.1 — https://airswap.io/

set the active ethereum chain

Current chain: 4 (RINKEBY)

New chain: (1=mainnet, 4=rinkeby, 5=goerli, 42=kovan, 56=binance):  (4) 1

Set active chain to MAINNET.
```

Use `registry:get` to fetch server URLs for a token pair.

```text
$ airswap registry:get
AirSwap CLI 1.6.1 — https://airswap.io/

get urls from the registry MAINNET

Registry 0x8F9DA6d38939411340b19401E8c54Ea1f51B8f95

Token pair (e.g. WETH/USDT):  DAI/WETH

Server
----------------------------------------
https://maker.example.com/
```

