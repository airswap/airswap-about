**The gas efficient RFQ protocol.**

- Supports ERC20 tokens
- Supports single signer authorization
- No affiliate fees feature
- Cheaper to use than the [Full](./full.md) protocol

# Methods

### `getSignerSideOrder`

Given a `senderAmount`, `senderWallet`, and token pair, server returns a complete order with a `signerAmount`. The client is **selling** to the server.

```TypeScript
getSignerSideOrder(
  senderAmount: string, // Amount the sender would transfer
  signerToken: string,  // Token the signer would transfer
  senderToken: string,  // Token the sender would transfer
  senderWallet: string, // Wallet of the sender
  swapContract: string, // Swap contract intended for use (Light)
  proxyingFor: string,  // Ultimate counterparty of the swap (Optional)
): LightOrder
```

### `getSenderSideOrder`

Given a `signerAmount`, `senderWallet`, and token pair, server returns a complete order with a `senderAmount`. The client is **buying** from the server.

```TypeScript
getSenderSideOrder(
  signerAmount: string, // Amount the signer would transfer
  signerToken: string,  // Token the signer would transfer
  senderToken: string,  // Token the sender would transfer
  senderWallet: string, // Wallet of the sender
  swapContract: string, // Swap contract intended for use (Light)
  proxyingFor: string,  // Ultimate counterparty of the swap (Optional)
): LightOrder
```

# Responses

{% hint style="info" %} Only respond with a light order if the `swapContract` parameter in the request matches the [Light](./contract-deployments.md) contract address. Your client may otherwise be requesting a [Full](./full.md) order.{% endhint %}

A `LightOrder` has the following properties:

| Property     | Type      | Description                                 |
| :----------- | :-------- | :------------------------------------------ |
| nonce        | `uint256` | Unique per signer and should be sequential. |
| expiry       | `uint256` | Expiry in seconds since 1 January 1970.     |
| signerWallet | `address` | Wallet that sets and signs terms.           |
| signerToken  | `address` | Token that the signer will transfer.        |
| signerAmount | `uint256` | Amount that the signer will transfer.       |
| senderToken  | `address` | Token that the sender will transfer.        |
| senderAmount | `uint256` | Amount that the sender will transfer.       |
| v            | `uint8`   | `v` value of the ECDSA signature.           |
| r            | `bytes32` | `r` value of the ECDSA signature.           |
| s            | `bytes32` | `s` value of the ECDSA signature.           |

## Example

```json
POST / HTTP/1.1
Content-Length: ...
Content-Type: application/json

{
  "jsonrpc": "2.0",
  "id": 123,
  "method": "getSignerSideOrder",
  "params": {
    "senderToken": "0xc778417e063141139fce010982780140aa0cd5ab",
    "signerToken": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
    "senderWallet": "0x1FF808E34E4DF60326a3fc4c2b0F80748A3D60c2",
    "senderAmount": "100000000",
    "swapContract": "0xc549a5c701cb6e6cbc091007a80c089c49595468"
  }
}
```

```json
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
    "signerWallet": "0x5E6bfd15c85C62e96f5888FCFbe88b74e298862d",
    "signerToken": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
    "signerAmount": "10000",
    "senderToken": "0xc778417e063141139fce010982780140aa0cd5ab",
    "senderAmount": "100000000",
    "v": "28",
    "r": "0x67e0723b0afd357d4f28523bf633dfee16e0eab2f3cbcf8ce1afd32a035d2764",
    "s": "0x1b71e6e633b3334fc88faf4ec0ca1b7611883bc0de4df7024abec07af78b97c3"
  }
}
```

## Signatures

Light signatures use `signTypedData` which implements EIP712.

### TypeScript

Light signatures in TypeScript can be created using the `@airswap/utils` package.

```typescript
import { UnsignedLightOrder } from '@airswap/types'
import { createLightOrder, createLightSignature } from '@airswap/utils'

const order = createLightOrder({
  nonce: string,
  expiry: string,
  signerWallet: string,
  signerToken: string,
  signerAmount: string,
  signerFee: string,
  senderWallet: string,
  senderToken: string,
  senderAmount: string,
})

const { v, r, s } = createLightSignature(
  order: UnsignedLightOrder,
  privateKey: string,
  swapContract: string,
  chainId: string,
)
```

### Python

Light signatures in Python can be created using the `py_eth_sig_utils` package.

```python
from py_eth_sig_utils.signing import *

PRIVATE_KEY = "0000000000000000000000000000000000000000000000000000000000000000"
SWAP_DOMAIN = "SWAP_LIGHT"
SWAP_VERSION = "3"
CHAIN_ID = 1
SWAP_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"

order = {
  "nonce": 0,
  "expiry": 0,
  "signerToken": "0x0000000000000000000000000000000000000000",
  "signerAmount": 0,
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
    "LightOrder": [
      { "name": "nonce", "type": "uint256" },
      { "name": "expiry", "type": "uint256" },
      { "name": "senderWallet", "type": "address" },
      { "name": "signerToken", "type": "address" },
      { "name": "signerAmount", "type": "uint256" },
      { "name": "senderToken", "type": "address" },
      { "name": "senderAmount", "type": "uint256" },
    ]
  },
  "domain": {
    "name": SWAP_DOMAIN,
    "version": SWAP_VERSION,
    "chainId": CHAIN_ID,
    "verifyingContract": SWAP_CONTRACT_ADDRESS,
  },
  "primaryType": "LightOrder",
  "message": order,
}

signature = v_r_s_to_signature(*sign_typed_data(data, bytes.fromhex(PRIVATE_KEY))).hex()
```

# Authorized Signers

One account may authorize another account to sign on its behalf. For example, running a server would use an account that has been authorized to sign on behalf of a contract wallet. To authorize a signer, submit a transaction to execute the following function on the [Light](./contract-deployments.md) contract.

```
function authorize(address signer) external
function revoke() external
```

# EIP712

The following values are used for the EIP712Domain.

| Param               | Type      | Value                                               |
| :------------------ | :-------- | :-------------------------------------------------- |
| `name`              | `bytes32` | SWAP_LIGHT                                          |
| `version`           | `bytes32` | 3                                                   |
| `chainId`           | `uint256` | Ethereum Mainnet: `1`, Rinkeby: `4`                 |
| `verifyingContract` | `address` | [Light](./contract-deployments.md) contract address |
