![](../.gitbook/assets/architecture.png)

# Trading with Makers on the Web

1. Web App calls `getIntents` on the Maker Indexer Contract, which returns HTTP endpoints.
2. Web App calls `getOrder` on each Maker using JSON-RPC over HTTP.
3. Web App calls `swap` with the order that it wishes to trade.

# Trading with Onchain Delegates

1. Web App calls `getIntents` on the Delegate Indexer Contract, which returns contract addresses.
2. Web App calls `get*Quote` on each Delegate contract.
3. Web App calls `provideOrder` on the Delegate that with the order it wishes to trade.
