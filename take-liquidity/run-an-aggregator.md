Aggregators take liquidity by interacting with Servers and Delegates. Generally, Servers are online processes that listen for requests via JSON-RPC over HTTP, making for on-demand real-time pricing. Delegates on the other hand are smart contracts with fixed rules, functioning as non-custodial limit orders. These combine to enable a wide variety of traders to provide liquidity to a wide variety of tokens on the network.

# Server Liquidity (HTTPS)

Servers implement the [Quote](../system/apis.md#quote-api) and [Order](../system/apis.md#order-api) APIs using [JSON-RPC 2.0](http://www.jsonrpc.org/specification). In the following scenarios, the Server is always the **signer** and the end user is always the **sender**.

## Determine Total Liquidity

For complete source code check out [GitHub](https://github.com/airswap/airswap-taker-examples/blob/master/examples/server-liquidity.ts).

```TypeScript
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

// Sum up the amounts on quotes and convert to decimal
const amount = toDecimalString(
  getTotalBySignerAmount(quotes),
  rinkebyTokens.DAI.decimals,
))
console.log(`${amount} DAI available for WETH from Servers on Rinkeby.`)
```

## Take the Best Order

For complete source code check out [GitHub](https://github.com/airswap/airswap-taker-examples/blob/master/examples/server-order.ts).

```TypeScript
// Fetch Server locators from the Rinkeby Indexer
const { locators } = await new Indexer().getLocators(signerToken, senderToken)

// Load a wallet using ethers.js
const signer = new ethers.Wallet('...')

// Iterate to get orders from all Servers
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

// Get and swap the best among all returned orders
const best = getBestByLowestSenderAmount(orders)
if (best) {
  const hash = await new Swap().swap(best, signer)
  console.log(getEtherscanURL(chainIds.RINKEBY, hash))
}
```

# Delegate Liquidity (On-Chain)

Delegates implement the [Quote](../system/apis.md#quote-api) and [Last Look](../system/apis.md#last-look-api) protocols as an Ethereum smart contract. In the following scenarios, the Delegate is always the **sender** and end user is always the **signer**.

Delegates **require signatures** on orders, which enables them to be passed through the Wrapper contract. There may be future versions of Delegates intended for onchain integrations that do not require signatures.

## Determine Total Liquidity

For complete source code check out [GitHub](https://github.com/airswap/airswap-taker-examples/blob/master/examples/delegate-liquidity.ts).

```TypeScript
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

// Sum up the amounts on quotes and convert to decimal
const amount = toDecimalString(
  getTotalBySenderAmount(quotes),
  rinkebyTokens.DAI.decimals,
))
console.log(`${amount} DAI available for WETH from Delegates on Rinkeby.`)
```

## Fetch a Quote and Provide an Order

For complete source code check out [GitHub](https://github.com/airswap/airswap-taker-examples/blob/master/examples/delegate-order.ts).

```TypeScript
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

// Get and swap the best among all returned quotes
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
  const hash = await delegate.provideOrder(order, signer)
  console.log(getEtherscanURL(chainIds.RINKEBY, hash))
}
```
