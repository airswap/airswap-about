Aggregators are applications that communicate with Servers and Delegates to take liquidity from the AirSwap network. Generally, Servers are online processes that listen for requests via JSON-RPC over HTTP, making for on-demand real-time pricing. Delegates on the other hand are smart contracts with fixed rules, effectively functioning as non-custodial limit orders. These combine to enable a wide variety of traders provide liquidity to a wide variety of tokens on the network.

# Server Liquidity (HTTPS)

Servers implement the [Quote](../protocols/quote.md) and [Order](../protocols/order.md) protocols using [JSON-RPC 2.0](http://www.jsonrpc.org/specification). In the following scenarios, the Server is always the **signer** and the end user is always the **sender**.

## Determine Total Liquidity

```javascript
import { Indexer, Server } from '@airswap/clients'
import { rinkebyTokens } from '@airswap/constants'
import { toDecimalString } from '@airswap/utils'
import { BigNumber } from 'ethers/utils'

const signerToken = rinkebyTokens.DAI.address
const senderToken = rinkebyTokens.WETH.address

// Fetch Server locators from the Rinkeby Indexer for DAI / WETH.
const { locators } = await new Indexer().getLocators(signerToken, senderToken)

// Iterate through Servers to get quotes.
let totalAmountAvailable = new BigNumber(0)
for (let locator of locators) {
  try {
    const quote = await new Server(locator).getMaxQuote(signerToken, senderToken)
    totalAmountAvailable = totalAmountAvailable.add(quote.signer.amount)
  } catch (error) {
    continue
  }
}

// Convert the amount to decimal and display.
const totalAmountDecimal = toDecimalString(totalAmountAvailable, rinkebyTokens.DAI.decimals)
console.log(`${totalAmountDecimal} DAI available from Servers on Rinkeby.`)
```

## Fetch and Take an Order

```javascript
import { Server, Swap } from '@airswap/clients'
import { toAtomicString } from '@airswap/utils'
import { chainIds, rinkebyTokens, etherscanDomains } from '@airswap/constants'
import { ethers } from 'ethers'
import { BigNumber } from 'ethers/utils'

// Create a wallet using ethers.js.
const wallet = new ethers.Wallet(signerPrivateKey, ethers.getDefaultProvider('rinkeby'))

// Request to buy 1 DAI for WETH.
const signerAmount = toAtomicString(new BigNumber(1), rinkebyTokens.DAI.decimals)
const signerToken = rinkebyTokens.DAI.address
const senderToken = rinkebyTokens.WETH.address

// Request the order from the Server.
try {
  const order = await new Server('m.dmosites.now.sh').getSenderSideOrder(
    signerAmount,
    signerToken,
    senderToken,
    wallet.address,
  )

  // Swap the order and display an Etherscan link.
  let hash = await new Swap().swap(order, wallet)
  console.log(`https://${etherscanDomains[chainIds.RINKEBY]}/tx/${hash}`)
} catch (error) {
  console.error(error)
}
```

# Delegate Liquidity (On-Chain)

Delegates implement the [Quote](../protocols/quote.md) and [Last Look](../protocols/last-look.md) protocols as an Ethereum smart contract. In the following scenarios, the Delegate is always the **sender** and end user is always the **signer**.

Delegates **require signatures** on orders, which enables them to be passed through the Wrapper contract. There may be future versions of Delegates intended for on-chain integrations that do not require signatures.

## Determine Total Liquidity

```javascript
import { Indexer, Delegate, ERC20 } from '@airswap/clients'
import { rinkebyTokens } from '@airswap/constants'
import { toDecimalString } from '@airswap/utils'
import { BigNumber } from 'ethers/utils'

const signerToken = rinkebyTokens.DAI.address
const senderToken = rinkebyTokens.WETH.address

// Fetch Delegate locators from the Rinkeby Indexer for DAI / WETH.
const { locators } = await new Indexer().getLocators(signerToken, senderToken, protocols.DELEGATE)

// Iterate through Delegates to get quotes.
let totalAmountAvailable = new BigNumber(0)
for (let locator of locators) {
  try {
    // Construct a Delegate.
    const delegate = new Delegate(locator)

    // Get a quote from the Delegate and check its balance.
    const quote = await delegate.getMaxQuote(senderToken, signerToken)
    const balance = await new ERC20(quote.sender.token).balanceOf(await delegate.getWallet())
    if (balance.lt(quote.sender.amount)) {
      totalAmountAvailable = totalAmountAvailable.add(balance)
    } else {
      totalAmountAvailable = totalAmountAvailable.add(quote.sender.amount)
    }
  } catch (error) {
    continue
  }
}

// Convert the amount to decimal and display.
const totalAmountDecimal = toDecimalString(totalAmountAvailable, rinkebyTokens.DAI.decimals)
console.log(`${totalAmountDecimal} DAI available from Delegates on Rinkeby.`)
```

## Fetch a Quote and Provide an Order

```javascript
import { Delegate, Swap } from '@airswap/clients'
import { chainIds, rinkebyTokens, etherscanDomains } from '@airswap/constants'
import { createOrderFromQuote, toAtomicString, signOrder } from '@airswap/utils'
import { ethers } from 'ethers'
import { BigNumber } from 'ethers/utils'

// Create a wallet using ethers.js.
const wallet = new ethers.Wallet(signerPrivateKey, ethers.getDefaultProvider('rinkeby'))

// Request to buy 1 DAI for WETH from a Delegate.
const senderAmount = toAtomicString(new BigNumber(1), rinkebyTokens.DAI.decimals)
const senderToken = rinkebyTokens.DAI.address
const signerToken = rinkebyTokens.WETH.address

try {
  // Construct the new Delegate.
  const delegate = new Delegate('0xa6897d36cfadf64f80ca2ae4b0202e334948ccb7')

  // Get a quote from the Delegate and create an order from the quote.
  const quote = await delegate.getSignerSideQuote(senderAmount, senderToken, signerToken)
  const order = createOrderFromQuote(quote, wallet.address, await delegate.getWallet())
  order.signature = await signOrder(order, wallet, Swap.getAddress())

  // Provide to the Delegate and display an Etherscan link.
  let hash = await delegate.provideOrder(order, wallet)
  console.log(`https://${etherscanDomains[chainIds.RINKEBY]}/tx/${hash}`)
} catch (error) {
  console.error(error)
}
```
