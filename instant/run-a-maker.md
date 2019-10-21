{% hint style="warning" %}
This documentation is in the works and subject to change.
{% endhint %}

Running a maker for AirSwap Instant has three simple requirements.

- An HTTPS server at a public endpoint that implements [JSON-RPC 2.0](http://www.jsonrpc.org/specification) and [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- Pricing logic for the tokens that you wish to trade
- Tools to interact with indexers to signal your intent to trade

# Important notes

- Makers only trade tokens, not native ether (ETH). To trade ETH it must be wrapped (WETH).
- Makers must manage nonces, which are single-use identifiers for each order. Each nonce can only be used once and subsequent nonces should increase.
- Makers must be accessible at public endpoints shorter than 32 characters in length. HTTPS is the assumed URL scheme. For example `maker.example.com:8000` or `99.84.41.93`.

# Implement the Peer API

At the protocol level, a **maker** is a trading party that is generally available to provide pricing and make trades. A **taker** is a trading party that trades one-off or periodically and accepts the pricing of makers. Makers are expected to implement the following methods taking the API role of **signer** in all cases.

| Method to implement  | What you provide                                                                          |
| :------------------- | :---------------------------------------------------------------------------------------- |
| `getSenderSideQuote` | The amount you expect the taker to send. The taker is **buying** from you.                |
| `getSignerSideQuote` | The amount you expect to send. The taker is **selling** to you.                           |
| `getMaxQuote`        | The maximum amounts of tokens you're willing to trade.                                    |
| `getSenderSideOrder` | An order that includes the amount the taker would send. The taker is **buying** from you. |
| `getSignerSideOrder` | An order that includes the amount you would send. The taker is **selling** to you.        |

See the [API Reference](./api-reference.md) for method details.

# Approve Your Tokens

Atomic swaps require that both parties have approved the Swap contract to transfer their tokens. [Learn more about ERC20 and the approval process](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md).

# Signal Intent to Trade

With your server ready to go, it's time to signal to other peers that you're ready to trade. Each intent to trade includes a public endpoint for your server, excluding the URL scheme, as HTTPS is assumed. Each intent to trade is for only **one side** of a market e.g. WETH/DAI and so another intent must be set for DAI/WETH.

| Function to call       | When to call it                                                                                                                               |
| :--------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| `setIntent`            | Start receiving requests. Sets a token pair and location of your server. Stake AirSwap Tokens (AST) for better visibility among other makers. |
| `unsetIntent`          | Stop receiving requests. Unsets a token pair. Any staked AST will be returned.                                                                |
| `getIntents`           | Get a list of all makers trading a token pair.                                                                                                |
| `createTokenPairIndex` | If your token pair is not on the indexer it must be created.                                                                                  |

See the [Indexer Contract](../contracts/indexer.md) for method details. You can interact with indexer contracts either programmatically or through tools like [MEW](https://www.myetherwallet.com/).
