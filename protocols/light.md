**The gas efficient RFQ protocol.**

- Supports ERC20 tokens
- Supports single signer authorization
- No affiliate fees feature
- Cheaper to use than the [Full](./full.md) protocol

# Methods

### `getSignerSideOrder`

Given a `senderAmount` the server returns a signed order with a `signerAmount`. The client is **selling** to the server.

```TypeScript
getSignerSideOrder(
  senderAmount: string, // Amount the sender would transfer
  signerToken: string,  // Token the signer would transfer
  senderToken: string,  // Token the sender would transfer
  senderWallet: string, // Wallet of the sender
  swapContract: string, // Swap contract intended for use (Light)
  proxyingFor: string,  // Ultimate counterparty of the swap (Optional)
)
```

### `getSenderSideOrder`

Given a `signerAmount` the server returns a signed order with a `senderAmount`. The client is **buying** from the server.

```TypeScript
getSenderSideOrder(
  signerAmount: string, // Amount the signer would transfer
  signerToken: string,  // Token the signer would transfer
  senderToken: string,  // Token the sender would transfer
  senderWallet: string, // Wallet of the sender
  swapContract: string, // Swap contract intended for use (Light)
  proxyingFor: string,  // Ultimate counterparty of the swap (Optional)
)
```

# Client

Clients invoke the above methods as JSON-RPC over HTTP requests.

```json
POST / HTTP/1.1
Content-Length: ...
Content-Type: application/json

{
  "jsonrpc": "2.0",
  "id": 123,
  "method": "getSignerSideOrder",
  "params": {
    "signerToken": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "senderWallet": "0x1FF808E34E4DF60326a3fc4c2b0F80748A3D60c2",
    "senderToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "senderAmount": "1000000000000000000",
    "swapContract": "0xc549a5c701cb6e6cbc091007a80c089c49595468"
  }
}
```

The above request can be made using curl for testing.

```sh
curl -H 'Content-Type: application/json' \
     -d '{"jsonrpc":"2.0","id":"123","method":"getSignerSideOrder","params":{"signerToken":"0xdac17f958d2ee523a2206206994597c13d831ec7","senderWallet":"0x1FF808E34E4DF60326a3fc4c2b0F80748A3D60c2","senderToken":"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2","senderAmount":"1000000000000000000","swapContract":"0xc549a5c701cb6e6cbc091007a80c089c49595468"}}' \
     https://localhost:3000/
```

# Server

{% hint style="info" %} Only respond with a light order if the `swapContract` parameter in the request matches the [Light](../contract-deployments.md) contract address. Your client may otherwise be requesting a [Full](./full.md) order.{% endhint %}

A successful result containing a `LightOrder` has the following properties:

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

# Signatures

**TypeScript**. Light signatures in TypeScript can be created using the `@airswap/utils` package.

```TypeScript
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

**Python**. Light signatures in Python can be created using the [`py_eth_sig_utils`](https://pypi.org/project/py-eth-sig-utils/) package.

```python
from py_eth_sig_utils.signing import *

SIGNER_KEY = "0000000000000000000000000000000000000000000000000000000000000000"
SIGNER_ADDRESS = "0x0000000000000000000000000000000000000000"
SWAP_CONTRACT = "0x0000000000000000000000000000000000000000"

DOMAIN = "SWAP_LIGHT"
VERSION = "3"
CHAIN_ID = 1

order = {
  "nonce": 0,
  "expiry": 0,
  "signerWallet": "0x0000000000000000000000000000000000000000",
  "signerToken": "0x0000000000000000000000000000000000000000",
  "signerAmount": 0,
  "signerFee": 0,
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
      { "name": "signerWallet", "type": "address" },
      { "name": "signerToken", "type": "address" },
      { "name": "signerAmount", "type": "uint256" },
      { "name": "signerFee", "type": "uint256" },
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
  "primaryType": "LightOrder",
  "message": order,
}

v, r, s = sign_typed_data(data, bytes.fromhex(SIGNER_KEY))
```

# Protocol Fees

**Required.** A protocol fee (in basis points) is hashed into the signature and verified during settlement. The value of this parameter must match its current value of `signerFee` on the [Light](../contract-deployments.md) contract. The amount is transferred from the `signerWallet` address upon settlement.

# Authorized Signers

**Optional.** One account may authorize another account to sign orders on its behalf. For example, a server might sign using an account that has been authorized by a contract wallet. To manage signer authorizations, use the following functions on the [Light](../contract-deployments.md) contract.

```
function authorize(address signer) external
function revoke() external
```

# EIP712

The following values are used for the EIP712Domain.

| Param               | Type      | Value                                                |
| :------------------ | :-------- | :--------------------------------------------------- |
| `name`              | `bytes32` | `SWAP_LIGHT`                                         |
| `version`           | `bytes32` | `3`                                                  |
| `chainId`           | `uint256` | Ethereum Mainnet: `1`, Rinkeby: `4`                  |
| `verifyingContract` | `address` | [Light](../contract-deployments.md) contract address |
