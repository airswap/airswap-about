AirSwap works with a combination of web protocols and smart contracts. There are two kinds of liquidity providers in the system, those that run their own HTTP servers to provide liquidity, and those that manage onchain delegates that make trades on their behalf.

![](../.gitbook/assets/architecture.png)

# Trading with Makers

Makers are HTTPS servers that implement the [Maker API](../guides/build-a-maker.md#maker-api).

**Web Apps** call...

1. `getIntents` on the **Maker [Indexer](../reference/indexer.md)** using protocol `0x0000` and receives locators (URLs).
2. `getOrder` on each **HTTPS [Maker](../guides/build-a-maker.md)** using JSON-RPC over HTTP.
3. `swap` on the **[Swap](../reference/swap.md) Contract** with the order that it wishes to trade.

# Trading with Delegates

Delegates are smart contracts that follow trading rules.

**Web Apps** call...

1. `getIntents` on the **Delegate [Indexer](../reference/indexer.md)** using protocol `0x0001` and receives contract addresses.
2. `get*Quote` on each **[Delegate](../reference/delegate.md) Contract**.
3. `provideOrder` on the selected **Delegate Contract** that performs the **[Swap](../reference/swap.md)**.
