Full orders are fully featured.

- Swaps ERC20, ERC721, ERC1155 tokens
- Supports multiple signer and sender authorization
- Supports affiliate fees in any token

# Methods

In RFQ the client is the order sender.

### `getSignerSideOrder`

Given a `senderAmount`, `senderWallet`, and token pair, return a complete order with a `signerAmount`. The taker is **selling** to you.

```TypeScript
getSignerSideOrder(
  senderAmount: string, // Amount the sender would transfer
  signerToken: string,  // Token the signer would transfer
  senderToken: string,  // Token the sender would transfer
  senderWallet: string, // Wallet of the sender
  swapContract: string, // Swap contract intended for use (Light)
  proxyingFor: string,  // Ultimate counterparty of the swap (Optional)
): Order
```

### `getSenderSideOrder`

Given a `signerAmount`, `senderWallet`, and token pair, return a complete order with a `senderAmount`. The taker is **buying** from you.

```TypeScript
getSenderSideOrder(
  signerAmount: string, // Amount the signer would transfer
  signerToken: string,  // Token the signer would transfer
  senderToken: string,  // Token the sender would transfer
  senderWallet: string, // Wallet of the sender
  swapContract: string, // Swap contract intended for use (Light)
  proxyingFor: string,  // Ultimate counterparty of the swap (Optional)
): Order
```

# Responses

In RFQ the server is the order signer.

{% hint style="info" %} Only respond with a full order if the `swapContract` parameter in the request matches the [Swap](./contract-deployments.md) contract address. Your client may otherwise be requesting a [Light Order](./light.md){% endhint %}

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

Either `personalSign` or `signTypedData` may be used but `signTypedData` is recommended. Signatures include a byte `version` to indicate `personalSign` (`0x45`) or `signTypedData` (`0x01`).

### TypeScript

Full signatures in TypeScript can be created using the `@airswap/utils` package.

## Types

```typescript
export type Party = {
  kind: string
  token: string
  id?: string
  amount?: string
}

export type OrderParty = Party & {
  wallet: string
}

export type UnsignedOrder = {
  nonce: string
  expiry: string
  signer: OrderParty
  sender: OrderParty
  affiliate: OrderParty
}

export type Signature = {
  version: string
  signatory: string
  validator: string
  v: string
  r: string
  s: string
}

export type Order = UnsignedOrder & {
  signature: Signature
}
```

## Signatures

```typescript
import { UnsignedOrder } from '@airswap/types'
import { createTypedDataSignature } from '@airswap/utils'

const signature = createTypedDataSignature(
  unsignedOrder: UnsignedOrder,
  privateKey: string,
  swapContract: string
)
```

### Python

Full signatures in Python can be created using the [eth-abi](https://github.com/ethereum/eth-abi) and [eth-utils](https://github.com/ethereum/eth-utils) packages.

```python
from eth_utils import keccak
from eth_abi import encode_abi
from bitcoin import ecdsa_raw_sign

SWAP_VERSION = "2"
SWAP_DOMAIN = "SWAP"
ERC_20_INTERFACE_ID = bytes.fromhex("36372b07")

SWAP_TYPES = {
    "party": b"Party(bytes4 kind,address wallet,address token,uint256 amount,uint256 id)",
    "order": b"Order(uint256 nonce,uint256 expiry,Party signer,Party sender,Party affiliate)",
    "eip712": b"EIP712Domain(string name,string version,address verifyingContract)",
}

SWAP_TYPE_HASHES = {
    "party": keccak(SWAP_TYPES["party"]),
    "order": keccak(SWAP_TYPES["order"] + SWAP_TYPES["party"]),
    "eip712": keccak(SWAP_TYPES["eip712"]),
}

DOMAIN_SEPARATOR = keccak(
    encode_abi(
        ["bytes32", "bytes32", "bytes32", "address"],
        [
            SWAP_TYPE_HASHES["eip712"],
            keccak(SWAP_DOMAIN.encode()),
            keccak(SWAP_VERSION.encode()),
            SWAP_CONTRACT_ADDRESS,
        ],
    )
)
```

You can then create a hash of the order itself with the type information included, assuming that `order` represents your order in a dict.

```python
hashed_signer = keccak(
    encode_abi(
        ["bytes32", "bytes4", "address", "address", "uint256", "uint256"],
        [
            SWAP_TYPE_HASHES["party"],
            ERC_20_INTERFACE_ID,
            order["signerWallet"],
            order["signerToken"],
            int(order["signerAmount"]),
            int(order["signerId"]),
        ],
    )
)

hashed_sender = keccak(
    encode_abi(
        ["bytes32", "bytes4", "address", "address", "uint256", "uint256"],
        [
            SWAP_TYPE_HASHES["party"],
            ERC_20_INTERFACE_ID,
            order["senderWallet"],
            order["senderToken"],
            int(order["senderAmount"]),
            int(order["senderId"]),
        ],
    )
)

hashed_affiliate = keccak(
    encode_abi(
        ["bytes32",  "bytes4", "address", "address", "uint256", "uint256"],
        [
            SWAP_TYPE_HASHES["party"],
            ERC_20_INTERFACE_ID,
            "0x0000000000000000000000000000000000000000",
            "0x0000000000000000000000000000000000000000",
            0,
            0,
        ],
    )
)

hashed_order = keccak(
    encode_abi(
        ["bytes32", "uint256", "uint256", "bytes32", "bytes32", "bytes32"],
        [
            SWAP_TYPE_HASHES["order"],
            int(order["nonce"]),
            int(order["expiry"]),
            hashed_signer,
            hashed_sender,
            hashed_affiliate,
        ],
    )
)
```

Finally, package the hashed order with the `EIP-712` domain separator and prefixes, then sign it with your private key `PRIVATE_KEY`.

```python
encoded_order = keccak(b"\x19Ethereum Signed Message:\n32" + keccak(b"\x19\x01" + DOMAIN_SEPARATOR + hashed_order))

V, R, S = ecdsa_raw_sign(encoded_order, PRIVATE_KEY)

v = V
r = Web3.toHex(R)
s = Web3.toHex(S)

# The bitcoin.ecdsa_raw_sign method we are using may return r & s values that are under 66 bytes, so check for
# that and pad with '0' if necessary to align with bytes32 types
if len(s) < 66:
  diff = 66 - len(s)
  s = "0x" + "0" * diff + s[2:]

if len(r) < 66:
  diff = 66 - len(r)
  r = "0x" + "0" * diff + r[2:]

# version is 0x45 for personalSign
signed_order = {
  "version": "0x45",
  "signatory": WALLET_ADDRESS,
  "validator": SWAP_CONTRACT_ADDRESS,
  "v": v,
  "r": r,
  "s": s
}
```

# Signer and Sender Authorizations

One account may authorize another account to sign or send orders on its behalf. For example, running a server would use an account that has been authorized to sign on behalf of a contract wallet. To authorize a signer or sender, submit a transaction to execute one of the following functions on the [Swap](./contract-deployments.md) contract.

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

| Param               | Type      | Value                                              |
| :------------------ | :-------- | :------------------------------------------------- |
| `name`              | `bytes32` | SWAP                                               |
| `version`           | `bytes32` | 2                                                  |
| `chainId`           | `uint256` | Ethereum Mainnet: `1`, Rinkeby: `4`                |
| `verifyingContract` | `address` | [Swap](./contract-deployments.md) contract address |
