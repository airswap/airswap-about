Aggregators are applications that communicate with Servers and Delegates to take liquidity from the AirSwap network. Generally, Servers are online processes that listen for requests via JSON-RPC over HTTP, which means that the prices they provide are highly dynamic. On the other hand, Delegates are smart contracts with fixed rules, effectively functioning as non-custodial limit orders. These combine to enable a wide variety of traders provide liquidity in a wide variety of tokens on the network.

# Server Liquidity (HTTPS)

Servers implement the [Quote](../protocols/quote.md) and [Order](../protocols/order.md) protocol with [JSON-RPC 2.0](http://www.jsonrpc.org/specification). In the following scenarios, the Server is always the **signer** and the end user is always the **sender**.

## Fetching Servers from an Indexer

Fetching Servers can be done in just a few lines of code.

```javascript
import { ethers } from 'ethers'
import { constants } from '@airswap/utils'

const Indexer = require('@airswap/indexer/build/contracts/Indexer.json')
const indexerDeploys = require('@airswap/indexer/deploys.json')
const provider = ethers.getDefaultProvider(constants.chainNames.RINKEBY)

const signerToken = constants.tokens.RINKEBY.DAI
const senderToken = constants.tokens.RINKEBY.WETH
const protocol = constants.protocols.HTTPS
const cursor = constants.indexer.HEAD
const numLocators = 10

new ethers.Contract(indexerDeploys[constants.chainIds.RINKEBY], Indexer.abi, provider)
  .getLocators(signerToken, senderToken, protocol, cursor, numLocators)
  .then(({ locators }) => {
    for (let locator of locators) {
      console.log(ethers.utils.parseBytes32String(locator))
    }
  })
```

## Fetching an Order from a Server

```javascript
import { getMakerClient, getAtomicValue } from '@airswap/utils'

const senderWallet = '...' // Your wallet (address)
const locator = '...' // Server locator (URL)

try {
  const airSwapMaker = getMakerClient(constants.protocols.HTTPS, locator)
  const order = await airSwapMaker.getSenderSideOrder({
    signerAmount: getAtomicValue(1, constants.tokens.RINKEBY.DAI.decimals),
    signerToken: constants.tokens.RINKEBY.DAI.address,
    senderToken: constants.tokens.RINKEBY.WETH.address,
    senderWallet,
  })
  console.log('Order', locator, order)
} catch (e) {
  console.log('Error', locator, e)
}
```

## Completing a Swap with an Order

```javascript
import { ethers } from 'ethers'

const Swap = require('@airswap/swap/build/contracts/Swap.json')
const swapDeploys = require('@airswap/swap/deploys.json')
const swapContract = new ethers.Contract(swapDeploys[constants.chainIds.RINKEBY], Swap.abi, wallet)

const tx = await swapContract.swap(order)
await tx.wait(constants.MIN_CONFIRMATIONS)
console.log('Transaction mined!')
```

# Delegate Liquidity (On-Chain)

Delegates implement the [Quote](../protocols/quote.md) and [Last Look](../protocols/last-look.md) protocol as an Ethereum smart contract. In the following scenarios, the Delegate is always the **sender** and end user is always the **signer**.

Delegates are designed to maximize usability and security, and therefore **require signatures** on orders. This enables them to be passed through the Wrapper contract. There may be future versions of Delegates intended for on-chain integrations that do not require signatures.

## Fetching Delegates from an Indexer

Fetching Servers can be done in just a few lines of code.

```javascript
...
const protocol = constants.protocols.DELEGATE
...

new ethers.Contract(indexerDeploys[constants.chainIds.RINKEBY], Indexer.abi, provider)
  .getLocators(signerToken, senderToken, protocol, cursor, numLocators)
  .then(({ locators }) => {
    for (let locator of locators) {
      console.log(ethers.utils.getAddress(locator.slice(0, 42))
    }
  })
```

## Fetching a Quote from a Delegate

```javascript
import { getMakerClient, getAtomicValue } from '@airswap/utils'

const senderWallet = '0x1FF808E34E4DF60326a3fc4c2b0F80748A3D60c2'
const locator = 'http://localhost:3000/'

try {
  const airSwapMaker = getMakerClient(constants.protocols.DELEGATE, locator)
  const quote = await airSwapMaker.getSenderSideQuote({
    signerAmount: getAtomicValue(1, constants.tokens.RINKEBY.DAI.decimals),
    signerToken: constants.tokens.RINKEBY.DAI.address,
    senderToken: constants.tokens.RINKEBY.WETH.address,
  })
  console.log('Quote', locator, quote)
} catch (e) {
  console.log('Error', locator, e)
}
```

## Completing a Swap with a Quote

```javascript
const swapDeploys = require('@airswap/swap/deploys.json')
const swapContract = swapDeploys[constants.chainIds.RINKEBY]

try {
  const airSwapMaker = getMakerClient(constants.protocols.DELEGATE, locator)
  const signerWallet = await airSwapMaker.tradeWallet()

  const order = await orders.getOrder({
    signer: {
      wallet: signerWallet,
      token: quote.signer.token,
      amount: quote.signer.amount,
    },
    sender: {
      wallet: senderWallet,
      token: quote.sender.token,
      amount: quote.sender.amount,
    },
  })

  order.signature = getPrivateKeySignature(order, privateKey, swapContract)

  const tx = await delegate.provideOrder(order)
  await tx.wait(constants.MIN_CONFIRMATIONS)
  console.log('Transaction mined!')
}
```
