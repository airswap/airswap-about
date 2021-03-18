**The fully featured RFQ protocol.**

- Swaps ERC20, ERC721, ERC1155 tokens
- Supports multiple signer and sender authorization
- Supports affiliate fees in any token
- More costly to use than the [Light](./light.md) protocol

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

# Responses

{% hint style="info" %} Only respond with a full order if the `swapContract` parameter in the request matches the [Swap](../contract-deployments.md) contract address. Your client may otherwise be requesting a [Light Order](./light.md){% endhint %}

An `Order` has the following properties:

| Property  | Type        | Description                                              |
| :-------- | :---------- | :------------------------------------------------------- |
| nonce     | `uint256`   | Unique per signer and should be sequential.              |
| expiry    | `uint256`   | Expiry in seconds since 1 January 1970.                  |
| signer    | `Party`     | Party to the trade that sets and signs terms.            |
| sender    | `Party`     | Party to the trade that accepts and sends terms.         |
| affiliate | `Party`     | `optional` Party compensated for facilitating the trade. |
| signature | `Signature` | Signature of the order.                                  |

Each `Party` has the following properties.

| Property | Type      | Description                                                                |
| :------- | :-------- | :------------------------------------------------------------------------- |
| kind     | `bytes4`  | `0x36372b07` (ERC-20), `0x80ac58cd` (ERC-721), or `0xd9b67a26` (ERC-1155). |
| wallet   | `address` | Wallet address of the party.                                               |
| token    | `address` | Contract address of the token.                                             |
| amount   | `uint256` | Amount of the token (ERC-20).                                              |
| id       | `uint256` | ID of the token (ERC-721).                                                 |

These properties correlate to the structs in [Types](../contracts/types.md).

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
    "swapContract": "0x4572f2554421Bd64Bef1c22c8a81840E8D496BeA"
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
    "nonce": "100",
    "expiry": "1566941284",
    "signer": {
      "kind": "0x36372b07",
      "wallet": "0x6556b252b05ad2ff5435d04a812b77875fa2bdbe",
      "token": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
      "amount": "10000",
      "id": "0"
    },
    "sender": {
      "kind": "0x36372b07",
      "wallet": "0x1FF808E34E4DF60326a3fc4c2b0F80748A3D60c2",
      "token": "0xc778417e063141139fce010982780140aa0cd5ab",
      "amount": "100000000",
      "id": "0"
    },
    "affiliate": {
      "kind": "0x36372b07",
      "wallet": "0x0000000000000000000000000000000000000000",
      "token": "0x0000000000000000000000000000000000000000",
      "amount": "0",
      "id": "0"
    },
    "signature": {
      "signatory": "0x6556b252b05ad2ff5435d04a812b77875fa2bdbe",
      "validator": "0x3E0c31C3D4067Ed5d7d294F08B79B6003B7bf9c8",
      "version": "0x45",
      "v": "28",
      "r": "0x589bb063fc85f49ad096ec9513c45b3e93f5a2da4efe0706db9a2b755121f4c2",
      "s": "0x73075fbae37e5a4954a6e57e0c056d130b582ce390b56fd69f0bb2e103d07e70"
    }
  }
}
```

## Signatures

Full signatures use either `personalSign` or `signTypedData` but `signTypedData` is recommended. Signatures include a byte `version` to indicate `personalSign` (`0x45`) or `signTypedData` (`0x01`). Full signatures in TypeScript can be created using the `@airswap/utils` package.

```TypeScript
import { UnsignedOrder } from '@airswap/types'
import { createOrder, createTypedDataSignature } from '@airswap/utils'

const order = createOrder({
  nonce: string,
  expiry: string,
  signer: {
    wallet: string,
    token: string,
    amount: string,
  },
  sender: {
    wallet: string,
    token: string,
    amount: string,
  }
})

order.signature = createTypedDataSignature(
  unsignedOrder: UnsignedOrder,
  privateKey: string,
  swapContract: string
)
```

Light signatures in Python can be created using the [`py_eth_sig_utils`](https://pypi.org/project/py-eth-sig-utils/) package.

```python
from py_eth_sig_utils.signing import *

SIGNER_KEY = "0000000000000000000000000000000000000000000000000000000000000000"
SIGNER_ADDRESS = "0x0000000000000000000000000000000000000000"
SWAP_CONTRACT = "0x4572f2554421Bd64Bef1c22c8a81840E8D496BeA"

DOMAIN = "SWAP"
VERSION = "2"
CHAIN_ID = 1

order = {
  "nonce": 0,
  "expiry": 0,
  "signer": {
    "kind": bytes.fromhex("36372b07"),
    "wallet": "0x0000000000000000000000000000000000000000",
    "token": "0x0000000000000000000000000000000000000000",
    "amount": 0,
    "id": 0,
  },
  "sender": {
    "kind": bytes.fromhex("36372b07"),
    "wallet": "0x0000000000000000000000000000000000000000",
    "token": "0x0000000000000000000000000000000000000000",
    "amount": 0,
    "id": 0,
  },
    "affiliate": {
    "kind": bytes.fromhex("36372b07"),
    "wallet": "0x0000000000000000000000000000000000000000",
    "token": "0x0000000000000000000000000000000000000000",
    "amount": 0,
    "id": 0,
  }
}

data = {
  "types": {
    "EIP712Domain": [
      { "name": "name", "type": "string" },
      { "name": "version", "type": "string" },
      { "name": "chainId", "type": "uint256" },
      { "name": "verifyingContract", "type": "address" },
    ],
    "Order": [
      { "name": "nonce", "type": "uint256" },
      { "name": "expiry", "type": "uint256" },
      { "name": "signer", "type": "Party" },
      { "name": "sender", "type": "Party" },
      { "name": "affiliate", "type": "Party" },
    ],
    "Party": [
      { "name": "kind", "type": "bytes4" },
      { "name": "wallet", "type": "address" },
      { "name": "token", "type": "address" },
      { "name": "amount", "type": "uint256" },
      { "name": "id", "type": "uint256" },
    ],
  },
  "domain": {
    "name": DOMAIN,
    "version": VERSION,
    "chainId": CHAIN_ID,
    "verifyingContract": SWAP_CONTRACT,
  },
  "primaryType": "Order",
  "message": order,
}

v, r, s = sign_typed_data(data, bytes.fromhex(PRIVATE_KEY))
order['signature'] = {
  "version": "0x01",
  "signatory": SIGNER_ADDRESS,
  "validator": SWAP_CONTRACT,
  "v": v,
  "r": r,
  "s": s
}
```

# Signer and Sender Authorizations

One account may authorize another account to sign or send orders on its behalf. For example, a server might sign using an account that has been authorized by a contract wallet. To manage signer and sender authorizations, use the following functions on the [Swap](../contract-deployments.md) contract.

```
function authorizeSigner(address authorizedSigner) external
function revokeSigner(address authorizedSigner) external
```

```
function authorizeSender(address authorizedSender) external
function revokeSender(address authorizedSender) external
```

# EIP712

The following values are used for the EIP712Domain.

| Param               | Type      | Value                                               |
| :------------------ | :-------- | :-------------------------------------------------- |
| `name`              | `bytes32` | SWAP                                                |
| `version`           | `bytes32` | 2                                                   |
| `chainId`           | `uint256` | Ethereum Mainnet: `1`, Rinkeby: `4`                 |
| `verifyingContract` | `address` | [Swap](../contract-deployments.md) contract address |
