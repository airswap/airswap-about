# Dictionary

## Swap

- **Swap** is a transaction of multiple Token transfers that succeeds for all parties or fails.
- **Token** is a fungible (ERC-20) or non-fungible (ERC-721) Ethereum asset to be transferred.
- **Maker** is a party that sets and signs the parameters and price of an Order.
- **Taker** is a party that accepts the parameters of an Order and settles it on Ethereum.
- **Affiliate** is an _optional_ party compensated by the Maker for facilitating a Swap.
- **Delegate** is an _optional_ party authorized to make or take Orders on behalf of another party.
- **Order** is a specification of the tokens, amounts, and parties to a Swap.
- **Signature** is an ECDSA cryptographic signature of an Order.
- **Nonce** is a numeric parameter of every Order that is unique to its Maker.

## Peer

- **Peer** is a smart contract that trades based on rules. Acts as taker.
- **Consumer** is a party that gets quotes from and sends orders to the peer. Acts as maker.
- **Rule** is an amount of tokens to trade at a specific price.
- **Price Coefficient** is the significant digits of the price.
- **Price Exponent** is the location of the decimal on the price.

## Indexer

- **Locator** is 32 bytes of data that describe how to reach a peer.
- **Intent** is an interest in trading that includes a locator.
- **Market** is a list of intents to trade.
- **Indexer** is a collection of markets.
