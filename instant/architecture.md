![](../.gitbook/assets/architecture.png)

# Trading with Makers on the Web

The **Web App** calls...

1. `getIntents` on the **Maker [Indexer](../conracts/indexer.md) Contract** and gets back HTTP endpoints.
2. `getOrder` on each **HTTP [Maker](running-makers.md)** using JSON-RPC over HTTP.
3. `swap` on the **[Swap](../contracts/swap.md) Contract** with the order that it wishes to trade.

# Trading with Onchain Delegates

The **Web App** calls...

1. `getIntents` on the **Delegate [Indexer](../conracts/indexer.md) Contract** and gets back contract addresses.
2. `get*Quote` on each **[Delegate](../delegate.md) Contract**.
3. `provideOrder` on the selected **Delegate Contract** that performs the **[Swap](../contracts/swap.md)**.
