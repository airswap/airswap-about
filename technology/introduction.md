AirSwap trading technology is fully decentralized, powered by smart contracts that enable counterparty discovery and atomic swaps. AirSwap protocols communicate prices **off-chain** and settle **on-chain**. Peers take the form of individuals trading manually or software trading in an automated way, in which case market makers run servers that implement the following protocols.

For information on finding counter-parties, see [Discovery](./discovery.md). For protocol method specifications, see [Protocols](./protocols.md).

# Orders

AirSwap orders are mutually signed instructions to perform an atomic swap. Prior to execution, both the signer (party that creates and signs the order) and sender (party that sends the order to the EVM) must have approved the swap contract to transfer the specified tokens on their behalf.

## Properties

An `OrderERC20` has the following properties:

| Property     | Type      | Description                               |
| :----------- | :-------- | :---------------------------------------- |
| nonce        | `uint256` | Unique per signer and usually sequential. |
| expiry       | `uint256` | Expiry in seconds since 1 January 1970.   |
| signerWallet | `address` | Wallet that sets and signs terms.         |
| signerToken  | `address` | Token that the signer transfers.          |
| signerAmount | `uint256` | Amount that the signer transfers.         |
| senderToken  | `address` | Token that the sender transfers.          |
| senderAmount | `uint256` | Amount that the sender transfers.         |
| v            | `uint8`   | `v` value of the ECDSA signature.         |
| r            | `bytes32` | `r` value of the ECDSA signature.         |
| s            | `bytes32` | `s` value of the ECDSA signature.         |

## Execution

Orders are passed to the [SwapERC20](./deployments.md) contract for execution, which emits a `SwapERC20` event on success. The `swapLight` function is more efficient, whereas the `swap` function provides protocol fee rebates to staked AST holders. Either function can execute a properly signed order.

```typescript
  function swapLight(
    uint256 nonce,
    uint256 expiry,
    address signerWallet,
    address signerToken,
    uint256 signerAmount,
    address senderToken,
    uint256 senderAmount,
    uint8 v,
    bytes32 r,
    bytes32 s
  ) external;
```

# RequestForQuoteERC20

AirSwap [RequestForQuoteERC20](../glossary.md#request-for-quote-rfq) is a client-server protocol used by market makers running servers from which clients request ERC20 orders via HTTP or WebSocket. In RFQ, the server is the signer (i.e. `signerAmount`, `signerToken`) and the client is the sender (i.e. `senderAmount`, `senderToken`).

## Example

To find counterparties, see [Discovery](./discovery.md). With server URLs in hand, clients may call `getSignerSideOrderERC20` or `getSenderSideOrderERC20` as JSON-RPC requests on servers that support RequestForQuoteERC20.

### Client Request

```javascript
POST / HTTP/1.1
Content-Length: ...
Content-Type: application/json

{
  "jsonrpc": "2.0",
  "id": 123,
  "method": "getSignerSideOrderERC20",
  "params": {
    "chainId": "1",
    "swapContract": "0xd82FA167727a4dc6D6F55830A2c47aBbB4b3a0F8",
    "signerToken": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "senderWallet": "0xed669F5fe2A37Ef204DB178c7a982717B9f03Ec2",
    "senderToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "senderAmount": "1000000000000000000",
  }
}
```

Requests can also be made using curl or wget for debugging.

```bash
curl -H 'Content-Type: application/json' \
     -d '{"jsonrpc":"2.0","id":"123","method":"getSignerSideOrderERC20","params":{"chainId":"1","swapContract":"0xd82FA167727a4dc6D6F55830A2c47aBbB4b3a0F8","signerToken":"0xdac17f958d2ee523a2206206994597c13d831ec7","senderWallet":"0xed669F5fe2A37Ef204DB178c7a982717B9f03Ec2","senderToken":"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2","senderAmount":"1000000000000000000"}}' \
     http://localhost:3000/
```

### Server Response

```javascript
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: *
Access-Control-Allow-Methods: POST, OPTIONS
Content-Length: ...
Content-Type: application/json

{
  "jsonrpc": "2.0",
  "id": 123,
  "result": {
    "nonce": "99",
    "expiry": "1566941284",
    "signerWallet": "0x73BCEb1Cd57C711feaC4224D062b0F6ff338501f",
    "signerToken": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "signerAmount": "100000000",
    "senderToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "senderAmount": "1000000000000000000",
    "v": "28",
    "r": "0x67e0723b0afd357d4f28523bf633dfee16e0eab2f3cbcf8ce1afd32a035d2764",
    "s": "0x1b71e6e633b3334fc88faf4ec0ca1b7611883bc0de4df7024abec07af78b97c3"
  }
}
```

### Client Settlement

With an OrderERC20 in hand, the client sends an Ethereum transaction to the [SwapERC20](./deployments.md) contract. The `swapLight` function is gas efficient, whereas the `swap` function provides protocol fee rebates to staked AST holders. Either function can settle a correctly signed OrderERC20. A successful swap emits a `SwapERC20` event.

```typescript
  function swapLight(
    uint256 nonce,
    uint256 expiry,
    address signerWallet,
    address signerToken,
    uint256 signerAmount,
    address senderToken,
    uint256 senderAmount,
    uint8 v,
    bytes32 r,
    bytes32 s
  ) external;
```

```typescript
  event SwapERC20(
    uint256 indexed nonce,
    address indexed signerWallet,
    address signerToken,
    uint256 signerAmount,
    uint256 protocolFee,
    address indexed senderWallet,
    address senderToken,
    uint256 senderAmount
  );
```

The server or client may subscribe to a filter for a `SwapERC20` event with the order `nonce` to track fills.

# LastLookERC20

AirSwap [LastLookERC20](../glossary.md/#lastlook-ll) is used by servers to stream quotes to clients. Clients periodically send signed OrderERC20s to the server, which then has the "last look" and option to send it to the EVM for settlement. In last-look, the client is the signer (e.g. `signerAmount`, `signerToken`) and the server is the sender (e.g. `senderAmount`, `senderToken`).

## Example

To find counterparties, see [Discovery](./discovery.md). With WebSocket server URLs in hand (i.e. the URL schema is `wss`), clients connect to each and calls methods as JSON-RPC over WebSocket.

### WebSocket

Upon connection, the server calls `setProtocols` on the client.

```javascript
{
  "jsonrpc": "2.0",
  "method": "setProtocols",
  "id": 123,
  "params": [
    [
      {
        "interfaceId": "0x2ca4c820",
        "params": {
          "chainId": "1",
          "swapContractAddress": "0xd82FA167727a4dc6D6F55830A2c47aBbB4b3a0F8",
          "walletAddress": "0x73BCEb1Cd57C711feaC4224D062b0F6ff338501f"
        }
      }
    ]
  ]
}
```

The client may then subscribe to pricing updates.

```javascript
{
  "jsonrpc": "2.0",
  "method": "subscribeAllPricingERC20",
  "id": 123,
  "params": []
}
```

The server then continuously updates the client with new pricing.

```javascript
{
  "jsonrpc": "2.0",
  "method": "setPricingERC20",
  "id": 123,
  "params": [
    [
      {
        "baseToken": "0xdac17f958d2ee523a2206206994597c13d831ec7",
        "quoteToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        "bid": [
          ["100", "0.00053"],
          ["1000", "0.00061"],
          ["10000", "0.0007"]
        ],
        "ask": [
          ["100", "0.00055"],
          ["1000", "0.00067"],
          ["10000", "0.0008"]
        ]
      }
    ]
  ]
}
```

The client may send an OrderERC20 to the server to consider a swap.

```javascript
{
  "jsonrpc": "2.0",
  "id": 123,
  "method": "considerOrderERC20",
  "params": {
    "nonce": "1",
    "expiry": "1629117312",
    "signerWallet": "0x0...",
    "signerToken": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "signerAmount": "1000000000",
    "senderToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "senderAmount": "530000000000000000",
    "v": "28",
    "r": "0x0...",
    "s": "0x0..."
  }
}
```

With an OrderERC20 in hand, the server sends an Ethereum transaction to the [SwapERC20](./deployments.md) contract. The `swapLight` function is gas efficient, whereas the `swap` function provides protocol fee rebates to staked AST holders. Either function can settle a correctly signed OrderERC20. A successful swap emits a `SwapERC20` event.

The client may subscribe to a filter for a `SwapERC20` event with the `nonce` they provided to the server to track fills.

# Pricing Formats

Server pricing can be communicated either by levels or a formula. All input and output values for pricing are in base units rather than atomic units. When generating orders, all values must be converted to atomic units.

## Levels

A server may provide "levels" to determine its pricing for various tokens and amounts. Each level is a tuple of amount and price at that level. Amounts and minimums are all in `baseToken`. Each level indicates price "up to" the specified amount and therefore the last level is the maximum.

```javascript
;[
  {
    baseToken: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    quoteToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    bid: [
      ['100', '0.00053'],
      ['1000', '0.00061'],
      ['10000', '0.0007'],
    ],
    ask: [
      ['100', '0.00055'],
      ['1000', '0.00067'],
      ['10000', '0.0008'],
    ],
  },
  {
    baseToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    quoteToken: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    bid: [
      ['0.5', '2000'],
      ['1', '2010'],
      ['10', '2050'],
    ],
    ask: [
      ['0.5', '2001'],
      ['1', '2015'],
      ['10', '2060'],
    ],
  },
]
```

### Examples

**Client wants to swap `1000` USDT into WETH.** Client looks up baseToken USDT and quoteToken WETH and uses the `bid` levels above. The first `100` would be multiplied by `0.00053` and second `900` would be multiplied by `0.00061` for a total of `0.602` WETH.

**Client wants to swap `1` WETH into USDT.** Client looks up baseToken WETH and quoteToken USDT and uses the `bid` levels above. The first `0.5` would be multiplied by `2000` and second `0.5` would be multiplied by `2010` for a total of `2005` USDT.

**Client wants to swap WETH into `1000` USDT.** Client looks up baseToken USDT and quoteToken WETH and uses the `ask` levels above. The first `100` would be multiplied by `0.00055` and second `900` would be multiplied by `0.00067` for a total of `0.658` WETH.

**Client wants to swap USDT into `1` WETH.** Client looks up baseToken WETH and quoteToken USDT and uses the `ask` levels above. The first `0.5` would be multiplied by `2001` and second `0.5` would be multiplied by `2015` for a total WETH amount of `2008` USDT.

## Formula

The server can specify formulas to use for pricing. Each formula is an expression with operations including addition, subtraction, multiplication, and division, where `x` is provided by the client.

```javascript
;[
  {
    baseToken: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    quoteToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    bid: 'x*0.00053',
    ask: 'x*0.00055',
  },
  {
    baseToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    quoteToken: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    bid: 'x*2000',
    ask: 'x*2001',
  },
]
```

### Examples

**Client wants to swap `1000` USDT into WETH.** Client looks up baseToken USDT and quoteToken WETH and uses the `bid` levels above. `1000` is multiplied by `0.00053` for a total of `0.53` WETH.

**Client wants to swap `1` WETH into USDT.** Client looks up baseToken WETH and quoteToken USDT and uses the `bid` levels above. `1` is multiplied by `2000` for a total of `2000` WETH.

**Client wants to swap WETH into `1000` USDT.** Client looks up baseToken USDT and quoteToken WETH and uses the `ask` levels above. `1000` is multiplied by `0.00055` for a total of `0.55` WETH.

**Client wants to swap USDT into `1` WETH.** Client looks up baseToken WETH and quoteToken USDT and uses the `ask` levels above. `1` is multiplied by `2001` for a total of `2001` WETH.

# Signatures

AirSwap signatures are [EIP712](https://eips.ethereum.org/EIPS/eip-712), which includes a domain separator to avoid replays across chains.

**TypeScript**. Swap signatures in TypeScript can be created using the `@airswap/utils` package.

```typescript
import { UnsignedOrder, createOrderERC20, createOrderERC20Signature } from '@airswap/utils'

const order = createOrderERC20({
  nonce: string,
  expiry: string,
  signerWallet: string,
  signerToken: string,
  signerAmount: string,
  protocolFee: string,
  senderWallet: string,
  senderToken: string,
  senderAmount: string,
})

const { v, r, s } = createOrderERC20Signature(
  order: UnsignedOrder,
  privateKey: string,
  swapContract: string,
  chainId: string,
)
```

**Python**. Swap signatures in Python can be created using the [`py_eth_sig_utils`](https://pypi.org/project/py-eth-sig-utils/) package.

```python
from py_eth_sig_utils.signing import *

SIGNER_KEY = "0000000000000000000000000000000000000000000000000000000000000000"
SWAP_CONTRACT = "0x0000000000000000000000000000000000000000"

DOMAIN = "SWAP_ERC20"
VERSION = "4"
CHAIN_ID = 1

order = {
  "nonce": 0,
  "expiry": 0,
  "signerWallet": "0x0000000000000000000000000000000000000000",
  "signerToken": "0x0000000000000000000000000000000000000000",
  "signerAmount": 0,
  "protocolFee": 0,
  "senderWallet": "0x0000000000000000000000000000000000000000",
  "senderToken": "0x0000000000000000000000000000000000000000",
  "senderAmount": 0
}

data = {
  "types": {
    "EIP712Domain": [
      { "name": "name", "type": "string" },
      { "name": "version", "type": "string" },
      { "name": "chainId", "type": "uint256" },
      { "name": "verifyingContract", "type": "address" },
    ],
    "OrderERC20": [
      { "name": "nonce", "type": "uint256" },
      { "name": "expiry", "type": "uint256" },
      { "name": "signerWallet", "type": "address" },
      { "name": "signerToken", "type": "address" },
      { "name": "signerAmount", "type": "uint256" },
      { "name": "protocolFee", "type": "uint256" },
      { "name": "senderWallet", "type": "address" },
      { "name": "senderToken", "type": "address" },
      { "name": "senderAmount", "type": "uint256" },
    ]
  },
  "domain": {
    "name": DOMAIN,
    "version": VERSION,
    "chainId": CHAIN_ID,
    "verifyingContract": SWAP_CONTRACT,
  },
  "primaryType": "OrderERC20",
  "message": order,
}

v, r, s = sign_typed_data(data, bytes.fromhex(SIGNER_KEY))
```

## Authorized Signers

**Optional.** One account may authorize another account to sign orders on its behalf. For example, a server might sign using an account that has been authorized by a contract wallet. To manage signer authorizations, use the following functions on the [SwapERC20](./deployments.md) contract.

```text
function authorize(address signer) external
function revoke() external
```

## EIP712

The following values are used for the EIP712Domain.

| Param               | Type      | Value                                 |
| :------------------ | :-------- | :------------------------------------ |
| `name`              | `bytes32` | `SWAP_ERC20`                          |
| `version`           | `bytes32` | `4`                                   |
| `chainId`           | `uint256` | Ethereum Mainnet: `1`, Goerli: `5`    |
| `verifyingContract` | `address` | [SwapERC20](./deployments.md) address |
