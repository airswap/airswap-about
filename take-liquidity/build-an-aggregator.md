Aggregators are applications that communicate with Servers and Delegates to take liquidity from the AirSwap network. Generally, Servers are online processes that listen for requests via JSON-RPC over HTTP, making for on-demand real-time pricing. Delegates on the other hand are smart contracts with fixed rules, functioning as non-custodial limit orders. These combine to enable a wide variety of traders to provide liquidity to a wide variety of tokens on the network.

# Server Liquidity (HTTPS)

Servers implement the [Quote](../protocols/quote.md) and [Order](../protocols/order.md) protocols using [JSON-RPC 2.0](http://www.jsonrpc.org/specification). In the following scenarios, the Server is always the **signer** and the end user is always the **sender**.

## Determine Total Liquidity

```javascript
import { Indexer, Server } from '@airswap/protocols'
import { Quote } from '@airswap/types'
import { rinkebyTokens } from '@airswap/constants'
import { toDecimalString, getTotalBySignerAmount } from '@airswap/utils'

async function getServerLiquidity(signerToken: string, senderToken: string) {
  // Fetch Server locators from the Rinkeby Indexer
  const { locators } = await new Indexer().getLocators(signerToken, senderToken)

  // Iterate through Servers to get quotes
  const quotes: Array<Quote> = []
  for (let locator of locators) {
    try {
      quotes.push(
        await new Server(locator).getMaxQuote(signerToken, senderToken),
      )
    } catch (error) {
      continue
    }
  }
  return toDecimalString(
    getTotalBySignerAmount(quotes),
    rinkebyTokens.DAI.decimals,
  )
}

getServerLiquidity(rinkebyTokens.DAI.address, rinkebyTokens.WETH.address).then(
  amount => {
    console.log(`${amount} DAI available for WETH from Servers on Rinkeby.`)
  },
)
```

## Take the Best Order

```javascript
import { Indexer, Server, Swap } from '@airswap/protocols'
import { Order } from '@airswap/types'
import { chainIds, rinkebyTokens } from '@airswap/constants'
import {
  toAtomicString,
  getBestByLowestSenderAmount,
  getEtherscanURL,
} from '@airswap/utils'
import { ethers } from 'ethers'
import { BigNumber } from 'ethers/utils'

async function takeBestServerOrder(
  signerAmount: string,
  signerToken: string,
  senderToken: string,
) {
  // Load a wallet using ethers.js
  const signer = new ethers.Wallet('...')

  // Fetch Server locators from the Rinkeby Indexer
  const { locators } = await new Indexer().getLocators(signerToken, senderToken)

  // Iterate to get orders from all Servers.
  let orders: Array<Order> = []
  for (const locator of locators) {
    try {
      orders.push(
        await new Server(locator).getSenderSideOrder(
          signerAmount,
          signerToken,
          senderToken,
          signer.address,
        ),
      )
    } catch (error) {
      continue
    }
  }

  // Get the best among all returned orders.
  const best = getBestByLowestSenderAmount(orders)

  if (best) {
    return await new Swap().swap(best, signer)
  }
}

// Request to buy 1 DAI for WETH.
takeBestServerOrder(
  toAtomicString(new BigNumber(1), rinkebyTokens.DAI.decimals),
  rinkebyTokens.DAI.address,
  rinkebyTokens.WETH.address,
).then(hash => {
  if (hash) {
    console.log(getEtherscanURL(chainIds.RINKEBY, hash))
  } else {
    console.log('No valid orders found.')
  }
})
```

# Delegate Liquidity (On-Chain)

Delegates implement the [Quote](../protocols/quote.md) and [Last Look](../protocols/last-look.md) protocols as an Ethereum smart contract. In the following scenarios, the Delegate is always the **sender** and end user is always the **signer**.

Delegates **require signatures** on orders, which enables them to be passed through the Wrapper contract. There may be future versions of Delegates intended for on-chain integrations that do not require signatures.

## Determine Total Liquidity

```javascript
import { Indexer, Delegate } from '@airswap/protocols'
import { Quote } from '@airswap/types'
import { rinkebyTokens, protocols } from '@airswap/constants'
import { toDecimalString, getTotalBySenderAmount } from '@airswap/utils'

async function getDelegateLiquidity(signerToken: string, senderToken: string) {
  // Fetch Delegate locators from the Rinkeby Indexer
  const { locators } = await new Indexer().getLocators(
    signerToken,
    senderToken,
    protocols.DELEGATE,
  )

  // Iterate through Delegates to get quotes
  const quotes: Array<Quote> = []
  for (let locator of locators) {
    try {
      quotes.push(
        await new Delegate(locator).getMaxQuote(signerToken, senderToken),
      )
    } catch (error) {
      continue
    }
  }

  return toDecimalString(
    getTotalBySenderAmount(quotes),
    rinkebyTokens.DAI.decimals,
  )
}

getDelegateLiquidity(
  rinkebyTokens.DAI.address,
  rinkebyTokens.WETH.address,
).then(amount => {
  console.log(`${amount} DAI available for WETH from Delegates on Rinkeby.`)
})
```

## Fetch a Quote and Provide an Order

```javascript
import { Indexer, Delegate, Swap } from '@airswap/protocols'
import { Quote, Order } from '@airswap/types'
import { chainIds, rinkebyTokens, protocols } from '@airswap/constants'
import {
  createOrderForQuote,
  signOrder,
  getBestByLowestSignerAmount,
  getEtherscanURL,
  toAtomicString,
} from '@airswap/utils'
import { ethers } from 'ethers'
import { BigNumber } from 'ethers/utils'

async function takeBestDelegateQuote(
  senderAmount: string,
  senderToken: string,
  signerToken: string,
) {
  // Fetch Server locators from the Rinkeby Indexer
  const { locators } = await new Indexer().getLocators(
    signerToken,
    senderToken,
    protocols.DELEGATE,
  )

  // Iterate through Delegates to get quotes
  const quotes: Array<Quote> = []
  for (let locator of locators) {
    try {
      quotes.push(
        await new Delegate(locator).getSignerSideQuote(
          senderAmount,
          signerToken,
          senderToken,
        ),
      )
    } catch (error) {
      continue
    }
  }

  // Get the best among all returned quotes
  const best = getBestByLowestSignerAmount(quotes)

  if (best) {
    // Load a wallet using ethers.js
    const signer = new ethers.Wallet('...')

    // Construct a Delegate using the best locator
    const delegate = new Delegate(best.locator)
    const order: Order = await signOrder(
      createOrderForQuote(best, signer.address, await delegate.getWallet()),
      signer,
      Swap.getAddress(),
    )
    // Provide order to the Delegate
    return await delegate.provideOrder(order, signer)
  }
}

// Request to buy 1 DAI for WETH.
takeBestDelegateQuote(
  toAtomicString(new BigNumber(1), rinkebyTokens.WETH.decimals),
  rinkebyTokens.WETH.address,
  rinkebyTokens.DAI.address,
).then(hash => {
  if (hash) {
    console.log(getEtherscanURL(chainIds.RINKEBY, hash))
  } else {
    console.log('No valid quotes found.')
  }
})
```
