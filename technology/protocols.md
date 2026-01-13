# AirSwap Trading Protocol

AirSwap trading technology is fully decentralized, powered by smart contracts that enable counterparty discovery and atomic swaps. AirSwap protocols communicate prices off-chain and settle on-chain.

**Version:** 1.0.0

# Methods

# Discovery

## `getProtocols`

Peers may call getProtocols to determine protocols supported by a peer. Protocols are identified by interfaceId and configuration params include the chainId, swapContractAddress, and walletAddress that the peer intends to use.

```typescript
getProtocols(
): [SupportedProtocolInfo](#supportedprotocolinfo)[]
```

### Returns

`[SupportedProtocolInfo](#supportedprotocolinfo)[]` — Array of supported protocol configurations

## `setProtocols`

When connected via WebSocket, the server may send a setProtocols notification to the client to indicate the protocols it supports.

```typescript
setProtocols(
  protocols: [SupportedProtocolInfo](#supportedprotocolinfo)[], // Array of supported protocol configurations
): boolean
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `protocols` | `[SupportedProtocolInfo](#supportedprotocolinfo)[]` | Yes | Array of supported protocol configurations |

### Returns

`boolean`

## `getTokens`

Peers may call getTokens to determine tokens supported by another peer, whether connected via HTTPS or WebSocket. The return value is an array of tokens identified by the token contract address.

```typescript
getTokens(
): [Address](#address)[]
```

### Returns

`[Address](#address)[]` — Array of token contract addresses

## `setTokens`

When connected via WebSocket, the server may send a setTokens notification to indicate the tokens it supports.

```typescript
setTokens(
  tokens: [Address](#address)[], // Array of token contract addresses
): boolean
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `tokens` | `[Address](#address)[]` | Yes | Array of token contract addresses |

### Returns

`boolean`

# RequestForQuoteERC20

## `getSignerSideOrderERC20`

Given a senderAmount the server returns a signed OrderERC20 including the signerAmount. The client is selling to the server. Client may optionally request a minimum expiry in seconds.

```typescript
getSignerSideOrderERC20(
  chainId: [ChainId](#chainid), // The blockchain network chain ID
  swapContract: [Address](#address), // Address of the AirSwap SwapERC20 contract
  senderAmount: [Amount](#amount), // Amount of tokens the sender will provide (in wei)
  signerToken: [Address](#address), // Address of the token the signer will provide
  senderToken: [Address](#address), // Address of the token the sender will provide
  senderWallet: [Address](#address), // Address of the sender's wallet
  minExpiry?: [Amount](#amount), // Minimum expiry in seconds (optional)
  proxyingFor?: [Address](#address), // Address being proxied for (optional)
): [OrderERC20](#ordererc20)
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `chainId` | `[ChainId](#chainid)` | Yes | The blockchain network chain ID |
| `swapContract` | `[Address](#address)` | Yes | Address of the AirSwap SwapERC20 contract |
| `senderAmount` | `[Amount](#amount)` | Yes | Amount of tokens the sender will provide (in wei) |
| `signerToken` | `[Address](#address)` | Yes | Address of the token the signer will provide |
| `senderToken` | `[Address](#address)` | Yes | Address of the token the sender will provide |
| `senderWallet` | `[Address](#address)` | Yes | Address of the sender's wallet |
| `minExpiry` | `[Amount](#amount)` | No | Minimum expiry in seconds (optional) |
| `proxyingFor` | `[Address](#address)` | No | Address being proxied for (optional) |

### Returns

`[OrderERC20](#ordererc20)` — Signed ERC20 order

## `getSenderSideOrderERC20`

Given a signerAmount the server returns a signed OrderERC20 with a senderAmount. The client is buying from the server. Client may optionally request a minimum expiry in seconds.

```typescript
getSenderSideOrderERC20(
  chainId: [ChainId](#chainid), // The blockchain network chain ID
  swapContract: [Address](#address), // Address of the AirSwap SwapERC20 contract
  signerAmount: [Amount](#amount), // Amount of tokens the signer will provide (in wei)
  signerToken: [Address](#address), // Address of the token the signer will provide
  senderToken: [Address](#address), // Address of the token the sender will provide
  senderWallet: [Address](#address), // Address of the sender's wallet
  minExpiry?: [Amount](#amount), // Minimum expiry in seconds (optional)
  proxyingFor?: [Address](#address), // Address being proxied for (optional)
): [OrderERC20](#ordererc20)
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `chainId` | `[ChainId](#chainid)` | Yes | The blockchain network chain ID |
| `swapContract` | `[Address](#address)` | Yes | Address of the AirSwap SwapERC20 contract |
| `signerAmount` | `[Amount](#amount)` | Yes | Amount of tokens the signer will provide (in wei) |
| `signerToken` | `[Address](#address)` | Yes | Address of the token the signer will provide |
| `senderToken` | `[Address](#address)` | Yes | Address of the token the sender will provide |
| `senderWallet` | `[Address](#address)` | Yes | Address of the sender's wallet |
| `minExpiry` | `[Amount](#amount)` | No | Minimum expiry in seconds (optional) |
| `proxyingFor` | `[Address](#address)` | No | Address being proxied for (optional) |

### Returns

`[OrderERC20](#ordererc20)` — Signed ERC20 order

## `getPricingERC20`

Client may request soft pricing for a list of token pairs. Client may optionally request a minimum expiry in seconds to be factored into pricing. Returns current formula or levels for each pair.

```typescript
getPricingERC20(
  pairs: [TokenPair](#tokenpair)[], // Array of token pairs to get pricing for
  minExpiry?: [Amount](#amount), // Minimum expiry in seconds (optional)
): [Pricing](#pricing)[]
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pairs` | `[TokenPair](#tokenpair)[]` | Yes | Array of token pairs to get pricing for |
| `minExpiry` | `[Amount](#amount)` | No | Minimum expiry in seconds (optional) |

### Returns

`[Pricing](#pricing)[]` — Pricing information for each pair

## `getAllPricingERC20`

Client may request pricing for all available pairs.

```typescript
getAllPricingERC20(
): [Pricing](#pricing)[]
```

### Returns

`[Pricing](#pricing)[]` — Pricing information for all available pairs

# LastLookERC20

## `subscribePricingERC20`

Client subscribes to pricing updates for a list of token pairs. Returns current formula or levels for each pair.

```typescript
subscribePricingERC20(
  pairs: [TokenPair](#tokenpair)[], // Array of token pairs to subscribe to
  minExpiry?: [Amount](#amount), // Minimum expiry in seconds (optional)
): [Pricing](#pricing)[]
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pairs` | `[TokenPair](#tokenpair)[]` | Yes | Array of token pairs to subscribe to |
| `minExpiry` | `[Amount](#amount)` | No | Minimum expiry in seconds (optional) |

### Returns

`[Pricing](#pricing)[]` — Current pricing for subscribed pairs

## `subscribeAllPricingERC20`

Client subscribes to pricing updates for all available pairs. Returns current formula or levels for each pair.

```typescript
subscribeAllPricingERC20(
): [Pricing](#pricing)[]
```

### Returns

`[Pricing](#pricing)[]` — Current pricing for all available pairs

## `unsubscribePricingERC20`

Client unsubscribes from pricing updates for a list of token pairs.

```typescript
unsubscribePricingERC20(
  pairs: [TokenPair](#tokenpair)[], // Array of token pairs to unsubscribe from
): boolean
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pairs` | `[TokenPair](#tokenpair)[]` | Yes | Array of token pairs to unsubscribe from |

### Returns

`boolean`

## `unsubscribeAllPricingERC20`

Client unsubscribes from all pricing subscriptions.

```typescript
unsubscribeAllPricingERC20(
): boolean
```

### Returns

`boolean`

## `setPricingERC20`

Server updates pricing for one or more token pairs.

```typescript
setPricingERC20(
  pricing: [Pricing](#pricing)[], // Array of pricing updates
): boolean
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pricing` | `[Pricing](#pricing)[]` | Yes | Array of pricing updates |

### Returns

`boolean`

## `considerOrderERC20`

Client provides a priced OrderERC20 to the server. Returns boolean true if accepted by the server. In last-look, the client is the signer and the server is the sender.

```typescript
considerOrderERC20(
  nonce: [Amount](#amount), // Unique order nonce
  expiry: [Amount](#amount), // Order expiry timestamp
  signerWallet: [Address](#address), // Address of the signer's wallet
  signerToken: [Address](#address), // Address of the token the signer will provide
  signerAmount: [Amount](#amount), // Amount of tokens the signer will provide
  senderToken: [Address](#address), // Address of the token the sender will provide
  senderAmount: [Amount](#amount), // Amount of tokens the sender will provide
  v: [Amount](#amount), // ECDSA signature recovery parameter
  r: [Bytes32](#bytes32), // ECDSA signature r parameter
  s: [Bytes32](#bytes32), // ECDSA signature s parameter
): boolean
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nonce` | `[Amount](#amount)` | Yes | Unique order nonce |
| `expiry` | `[Amount](#amount)` | Yes | Order expiry timestamp |
| `signerWallet` | `[Address](#address)` | Yes | Address of the signer's wallet |
| `signerToken` | `[Address](#address)` | Yes | Address of the token the signer will provide |
| `signerAmount` | `[Amount](#amount)` | Yes | Amount of tokens the signer will provide |
| `senderToken` | `[Address](#address)` | Yes | Address of the token the sender will provide |
| `senderAmount` | `[Amount](#amount)` | Yes | Amount of tokens the sender will provide |
| `v` | `[Amount](#amount)` | Yes | ECDSA signature recovery parameter |
| `r` | `[Bytes32](#bytes32)` | Yes | ECDSA signature r parameter |
| `s` | `[Bytes32](#bytes32)` | Yes | ECDSA signature s parameter |

### Returns

`boolean` — Whether the order was accepted

# Indexing

## `addOrder`

Peers may call addOrder to add an order to another peer.

```typescript
addOrder(
  order: [FullOrder](#fullorder), // The full order to add
  tags?: string[], // Tags to associate with the order
): boolean
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `order` | `[FullOrder](#fullorder)` | Yes | The full order to add |
| `tags` | `string[]` | No | Tags to associate with the order |

### Returns

`boolean`

## `getOrders`

Peers may call getOrders to query for orders indexed by another peer.

```typescript
getOrders(
  filter: [OrderFilter](#orderfilter), // Filter criteria for orders
  offset?: integer, // Pagination offset
  limit?: integer, // Maximum number of orders to return
  by?: [Indexes](#indexes), // Index to sort by
  direction?: [Direction](#direction), // Sort direction
): [OrderResponse](#orderresponse)
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | `[OrderFilter](#orderfilter)` | Yes | Filter criteria for orders |
| `offset` | `integer` | No | Pagination offset |
| `limit` | `integer` | No | Maximum number of orders to return |
| `by` | `[Indexes](#indexes)` | No | Index to sort by |
| `direction` | `[Direction](#direction)` | No | Sort direction |

### Returns

`[OrderResponse](#orderresponse)`

## `getTags`

Peers may call getTags to get all available tags for a token.

```typescript
getTags(
  token: [Address](#address), // Token contract address
): string[]
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `token` | `[Address](#address)` | Yes | Token contract address |

### Returns

`string[]`

# IndexingERC20

## `addOrderERC20`

Peers may call addOrderERC20 to add an ERC20 order to another peer.

```typescript
addOrderERC20(
  order: [FullOrderERC20](#fullordererc20), // The full ERC20 order to add
  tags?: string[], // Tags to associate with the order
): boolean
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `order` | `[FullOrderERC20](#fullordererc20)` | Yes | The full ERC20 order to add |
| `tags` | `string[]` | No | Tags to associate with the order |

### Returns

`boolean`

## `getOrdersERC20`

Peers may call getOrdersERC20 to query for ERC20 orders indexed by another peer.

```typescript
getOrdersERC20(
  filter: [OrderFilter](#orderfilter), // Filter criteria for orders
  offset?: integer, // Pagination offset
  limit?: integer, // Maximum number of orders to return
  by?: [Indexes](#indexes), // Index to sort by
  direction?: [Direction](#direction), // Sort direction
): [OrderResponseERC20](#orderresponseerc20)
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | `[OrderFilter](#orderfilter)` | Yes | Filter criteria for orders |
| `offset` | `integer` | No | Pagination offset |
| `limit` | `integer` | No | Maximum number of orders to return |
| `by` | `[Indexes](#indexes)` | No | Index to sort by |
| `direction` | `[Direction](#direction)` | No | Sort direction |

### Returns

`[OrderResponseERC20](#orderresponseerc20)`

## `getTags`

Peers may call getTags to get all available tags for a token.

```typescript
getTags(
  token: [Address](#address), // Token contract address
): string[]
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `token` | `[Address](#address)` | Yes | Token contract address |

### Returns

`string[]`

# Types

## Address

Ethereum address (20 bytes)

## Bytes32

32-byte hex string

## Amount

Numeric string representing an amount

## ChainId

Blockchain network chain ID

## SupportedProtocolInfo

Information about a supported trading protocol

| Property | Type | Description |
|----------|------|-------------|
| `interfaceId` | `string` | Protocol interface identifier (e.g., 0x02ad05d3 for RequestForQuoteERC20) |
| `params` | `{ chainId: [ChainId](#chainid), swapContractAddress: [Address](#address), walletAddress: [Address](#address), senderServer: string, senderWallet: [Address](#address) }` |  |

## TokenPair

A pair of tokens for trading

| Property | Type | Description |
|----------|------|-------------|
| `baseToken` | `[Address](#address)` | Base token address |
| `quoteToken` | `[Address](#address)` | Quote token address |

## OrderERC20

Signed ERC20 order in AirSwap format

| Property | Type | Description |
|----------|------|-------------|
| `nonce` | `[Amount](#amount)` | Unique order nonce |
| `expiry` | `[Amount](#amount)` | Order expiry timestamp (Unix timestamp) |
| `signerWallet` | `[Address](#address)` | Address of the signer's wallet |
| `signerToken` | `[Address](#address)` | Address of the token the signer will provide |
| `signerAmount` | `[Amount](#amount)` | Amount of tokens the signer will provide (in wei) |
| `protocolFee` | `[Amount](#amount)` | Protocol fee in basis points |
| `senderToken` | `[Address](#address)` | Address of the token the sender will provide |
| `senderAmount` | `[Amount](#amount)` | Amount of tokens the sender will provide (in wei) |
| `v` | `[Amount](#amount)` | ECDSA signature recovery parameter |
| `r` | `[Bytes32](#bytes32)` | ECDSA signature r parameter |
| `s` | `[Bytes32](#bytes32)` | ECDSA signature s parameter |

## FullOrderERC20

Full ERC20 order including settlement information

## FullOrder

Full order for NFT/ERC721 swaps

| Property | Type | Description |
|----------|------|-------------|
| `nonce` | `[Amount](#amount)` |  |
| `expiry` | `[Amount](#amount)` |  |
| `signerWallet` | `[Address](#address)` |  |
| `signerToken` | `[Address](#address)` |  |
| `signerAmount` | `[Amount](#amount)` |  |
| `signerId` | `[Amount](#amount)` |  |
| `senderWallet` | `[Address](#address)` |  |
| `senderToken` | `[Address](#address)` |  |
| `senderAmount` | `[Amount](#amount)` |  |
| `senderId` | `[Amount](#amount)` |  |
| `affiliateWallet` | `[Address](#address)` |  |
| `affiliateAmount` | `[Amount](#amount)` |  |
| `chainId` | `[ChainId](#chainid)` |  |
| `swapContract` | `[Address](#address)` |  |
| `v` | `[Amount](#amount)` |  |
| `r` | `[Bytes32](#bytes32)` |  |
| `s` | `[Bytes32](#bytes32)` |  |

## Pricing

Pricing information for a token pair

| Property | Type | Description |
|----------|------|-------------|
| `baseToken` | `[Address](#address)` |  |
| `quoteToken` | `[Address](#address)` |  |
| `minimum` | `[Amount](#amount)` | Minimum order size |
| `bid` | `any` | Bid pricing (levels array or formula string) |
| `ask` | `any` | Ask pricing (levels array or formula string) |

## Levels

Array of price levels as [baseAmount, quoteAmount] tuples in wei

## Formula

Pricing formula where x is the input amount (e.g., 'x*0.00053')

## OrderFilter

Filter criteria for querying orders

| Property | Type | Description |
|----------|------|-------------|
| `chainId` | `[ChainId](#chainid)` |  |
| `signerWallet` | `[Address](#address)` |  |
| `signerToken` | `[Address](#address)` |  |
| `signerId` | `[Amount](#amount)` |  |
| `senderWallet` | `[Address](#address)` |  |
| `senderToken` | `[Address](#address)` |  |
| `minSignerAmount` | `[Amount](#amount)` |  |
| `maxSignerAmount` | `[Amount](#amount)` |  |
| `minSenderAmount` | `[Amount](#amount)` |  |
| `maxSenderAmount` | `[Amount](#amount)` |  |
| `tags` | `string[]` |  |

## Indexes

Index to sort orders by

## Direction

Sort direction

## OrderResponse

Response containing orders and pagination info

| Property | Type | Description |
|----------|------|-------------|
| `orders` | `[FullOrder](#fullorder)[]` |  |
| `offset` | `integer` |  |
| `total` | `integer` |  |

## OrderResponseERC20

Response containing ERC20 orders and pagination info

| Property | Type | Description |
|----------|------|-------------|
| `orders` | `[FullOrderERC20](#fullordererc20)[]` |  |
| `offset` | `integer` |  |
| `total` | `integer` |  |

