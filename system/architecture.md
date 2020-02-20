AirSwap works with a combination of web protocols and smart contracts. There are two kinds of liquidity providers in the system, those that run their own HTTP servers to provide liquidity and those that manage onchain delegates that make trades on their behalf.

Each swap is between at least two parties, a `signer` and a `sender`. The `signer` is the party that creates and cryptographically signs an order, and `sender` is the party that sends the order to the Ethereum blockchain for settlement.

![](../.gitbook/assets/airswap-architecture.png)

# Make Liquidity

Makers run Servers or deploy Delegates and use the Indexer to signal their interest in trading.

**Makers**...

1. [Run a Server](../make-liquidity/run-a-server.md) at a public URL and use it as their `locator` value.
2. [Stake](../make-liquidity/use-the-indexer.md) AirSwap Tokens to signal their intent to trade on the [Indexer](../reference/indexer.md).
3. Respond to [`get*Quote`](./apis.md#quote-api) and [`get*Order`](./apis.md#order-api) requests.

See code examples of these protocols at work in the [Run a Server](../make-liquidity/run-a-server.md) section.

# Take Liquidity

Takers use the Indexer to find Servers and Delegates to interact with.

## Servers (HTTPS)

Servers implement the [Quote](../system/apis.md#quote-api) and [Order](../system/apis.md#order-api) protocols.

**Takers**...

1. Call `getIntents` on the **Server [Indexer](../reference/indexer.md)** using protocol `0x0000` and receives locators (URLs).
2. Call `get*Order` on each **HTTPS [Server](../make-liquidity/run-a-server.md)** using JSON-RPC over HTTPS.
3. Call `swap` on the **[Swap](../reference/swap.md) Contract** with the order that it wishes to execute.

## Delegates (onchain)

Delegates implement the [Quote](../system/apis.md#quote-api) and [Last Look](../system/apis.md#last-look-api) protocols.

**Takers**...

1. Call `getIntents` on the **Delegate [Indexer](../reference/indexer.md)** using protocol `0x0001` and receives contract addresses.
2. Call `get*Quote` on each **[Delegate](../reference/delegate.md) Contract**.
3. Call `provideOrder` on the selected **Delegate Contract** that performs the **[Swap](../reference/swap.md)**.

See code examples of these protocols at work in the [Run an Aggregator](../take-liquidity/run-an-aggregator.md) section.

# Third-Parties

**Authorizations** are for parties that trade on behalf of others. These parties are authorized by an individual to send or sign orders for them. Parties can be wallets (people or programs) or smart contracts.

**Affiliates** are third-parties compensated for their part in bringing together the two parties of a trade and can be other traders or software applications that connect traders on the network.
