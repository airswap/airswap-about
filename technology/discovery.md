# Registry

To find servers that support a token pair, clients call the `getURLsForToken` function on the [Registry](https://about.airswap.xyz/deployments) contract for each token and then intersect the results. For example, if the resulting URLs for token A are `[maker1.com, maker2.com]` and for token B are `[maker2.com, maker3.com]` then the only server supporting swapping token A for B is `maker2.com`.

See `getURLsForToken` on the Registry contract:

```typescript
function getURLsForToken(address token) external view returns (string[] memory urls);
```

Check [deployments](https://about.airswap.xyz/deployments) for latest contract addresses for Registry.

## Fetching URLs via CLI

Ensure the AirSwap CLI is installed.

```
$ yarn global add airswap
```

Use `airswap chain` to set your chain to Goerli or Mainnet.

```
$ airswap chain
AirSwap CLI 4.0.1 — https://www.airswap.xyz/

set the active ethereum chain

Current chain: 5 (GOERLI)

New chain id:  (5) 1

Set active chain to ETHEREUM.
```

Use `registry:get` to fetch server URLs for a token pair.

```
$ airswap registry:list
AirSwap CLI 4.0.1 — https://www.airswap.xyz/

get urls from the registry ETHEREUM

Registry 0x8F9DA6d38939411340b19401E8c54Ea1f51B8f95

Token pair (e.g. WETH/USDT):  dai/weth

Server
----------------------------------------
https://maker.example.com/
```

### Example: Take an Order

Try `airswap order` with a server URL from the previous command.

## TypeScript

Using the `Registry` library from `@airswap/libraries` returns `Server` instances that you can interact with.

```typescript
import { ProtocolIds } from '@airswap/utils'
import { Registry } from '@airswap/libraries'
const servers = await Registry.getServers(
  provider,
  chainId,
  ProtocolIds.RequestForQuoteERC20,
  signerToken,
  senderToken,
)
```

Calling the Registry directly using `ethers`

```typescript
import { ethers } from 'ethers'
import { chainNames } from '@airswap/utils'
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

### Example: Take an Order

```typescript
import { Registry, SwapERC20 } from '@airswap/libraries'
import { ProtocolIds, chainNames, orderERC20ToParams } from '@airswap/utils'

const servers = await Registry.getServers(
  provider,
  chainId,
  ProtocolIds.RequestForQuoteERC20,
  signerToken,
  senderToken,
)

const order = servers[0].getSignerSideOrderERC20(
  senderAmount,
  signerToken,
  senderToken,
  senderWallet,
)

await SwapERC20.getContract(provider, chainId).swapLight(
  ...orderERC20ToParams(order),
)
```
