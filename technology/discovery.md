# Discovery

To find servers that support a token pair, clients call the `getURLsForToken` function on the [Registry](./deployments.md) contract for each token and then intersect the results. For example, if the resulting URLs for token A are `[maker1.com, maker2.com]` and for token B are `[maker2.com, maker3.com]` then the only server supporting swapping token A for B is `maker2.com`.

See `getURLsForToken` on the Registry contract:

```typescript
function getURLsForToken(address token) external view returns (string[] memory urls);
```

Check [deployments](./deployments.md) for latest contract addresses for Registry.

## Fetching URLs via CLI

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

### Example: Take an Order

Try `airswap order:get` with a server URL from the previous command.

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

const baseTokenURLs = await this.contract.getURLsForToken(baseToken)
const quoteTokenURLs = await this.contract.getURLsForToken(quoteToken)

const serverURLs = baseTokenURLs.filter((value) =>
  quoteTokenURLs.includes(value),
)
```

### Example: Take an Order

```typescript
import { Registry, Swap } from '@airswap/libraries'
import { chainNames } from '@airswap/constants'

const provider = ethers.getDefaultProvider(chainNames[chainId].toLowerCase())

const servers = await new Registry(chainId, provider).getServers(
  quoteToken,
  baseToken,
)

const order = servers[0].getSignerSideOrder(
  baseTokenAmount,
  quoteToken,
  baseToken,
  wallet.address,
)

const tx = await new Swap(chainId, provider).light(order)
```
