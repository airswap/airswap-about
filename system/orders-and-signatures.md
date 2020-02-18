Each swap is between at least two parties, a `signer` and a `sender`. The `signer` is the party that creates and cryptographically signs an order, and `sender` is the party that sends the order to Ethereum for settlement.

**Authorizations** are for parties that trade on behalf of others. These parties are authorized by an individual to send or sign orders for them. Parties can be wallets (people or programs) or smart contracts.

**Affiliates** are third-parties compensated for their part in bringing together the two parties of a trade, and can be other traders or software applications that connect traders on the network.

# Creating Orders

An AirSwap `Order` has the following properties.

| Param     | Type        | Description                                             |
| :-------- | :---------- | :------------------------------------------------------ |
| nonce     | `uint256`   | Unique per signer and should be sequential              |
| expiry    | `uint256`   | Expiry in seconds since 1 January 1970                  |
| signer    | `Party`     | Party to the trade that sets and signs terms            |
| sender    | `Party`     | Party to the trade that accepts and sends terms         |
| affiliate | `Party`     | `optional` Party compensated for facilitating the trade |
| signature | `Signature` | Signature of the order, described below                 |

Each `Party` has the following properties.

| Param  | Type      | Description                                     |
| :----- | :-------- | :---------------------------------------------- |
| kind   | `bytes4`  | `0x36372b07` (ERC-20) or `0x80ac58cd` (ERC-721) |
| wallet | `address` | Wallet address of the party                     |
| token  | `address` | Contract address of the token                   |
| amount | `uint256` | Amount of the token (ERC-20)                    |
| id     | `uint256` | ID of the token (ERC-721)                       |

These values correlate to the structs in [Types](../contracts/types.md).

## Example

```json
{
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
```

The `@airswap/order-utils` package includes an `orders.getOrder` function that can be used to create new orders with correct default values.

# Generating Signatures

Ethereum uses [ECDSA](https://hackernoon.com/a-closer-look-at-ethereum-signatures-5784c14abecc) signatures. To generate a signature for an AirSwap order, the order must first be hashed according to [EIP-712](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-712.md), which can be seen in the [Solidity](https://github.com/airswap/airswap-protocols/blob/master/source/types/contracts/Types.sol) and [JavaScript](https://github.com/airswap/airswap-protocols/blob/master/utils/order-utils/src/hashes.js) implementations.

Once hashed, one of two signing methods may be used, either `personalSign` or `signTypedData`. AirSwap signatures include a byte `version` to indicate `personalSign` (`0x45`) or `signTypedData` (`0x01`). The primary distinction is that in the former, Ethereum wallets prefix the hash with byte `\x19` to stay out of range of valid RLP so that a signature cannot be executed as a transaction.

An AirSwap signature has the following properties.

| Param     | Type      | Description                                                                                                |
| :-------- | :-------- | :--------------------------------------------------------------------------------------------------------- |
| signatory | `address` | Wallet used to generate the signature                                                                      |
| validator | `address` | Swap contract address to be used for settlement                                                            |
| version   | `bytes1`  | [EIP-191](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-191.md) signature version `0x01` or `0x45` |
| v         | `uint8`   | `v` value of the ECDSA signature                                                                           |
| r         | `bytes32` | `r` value of the ECDSA signature                                                                           |
| s         | `bytes32` | `s` value of the ECDSA signature                                                                           |

Each signature should be included on its order, accessible as `order.signature`, to be settled by invoking `swap(order)` on the Swap contract.

## JavaScript

### Using `personalSign`

You can use `personalSign` with the hashing function in the `@airswap/order-utils` package.

```javascript
const ethUtil = require('ethereumjs-util')
const { hashes } = require('@airswap/order-utils')
const orderHashHex = hashes.getOrderHash(order)
const sig = await web3.eth.sign(orderHashHex, signer)
const { v, r, s } = ethUtil.fromRpcSig(sig)
return {
  version: '0x45',
  v,
  r,
  s,
}
```

### Using `signTypedData`

You can use `signTypedData` by calling it directly.

```javascript
const ethUtil = require('ethereumjs-util')
const sigUtil = require('eth-sig-util')
const DOMAIN_NAME = 'SWAP'
const DOMAIN_VERSION = '2'
const verifyingContract = '0x0...' // Address of the Swap Contract
const sig = sigUtil.signTypedData(privateKey, {
  data: {
    types, // See: @airswap/order-utils/src/constants.js
    domain: {
      name: DOMAIN_NAME,
      version: DOMAIN_VERSION,
      verifyingContract,
    },
    primaryType: 'Order',
    message: order, // See: @airswap/order-utils/src/orders.js
  },
})
const { r, s, v } = ethUtil.fromRpcSig(sig)
return {
  version: '0x01', // Version 0x01: signTypedData
  r,
  s,
  v,
}
```

## Python

### Using `ecdsa_raw_sign`

The python example uses the [eth-abi](https://github.com/ethereum/eth-abi) and [eth-utils](https://github.com/ethereum/eth-utils) packages.

To sign the order, you'll need to create hashes of the encoded types, as well as the domain separator (used at the final step). `SWAP_DOMAIN` and `SWAP_VERSION` should be set to `SWAP` and `2`, respectively.

```python
from eth_utils import keccak
from eth_abi import encode_abi
from bitcoin import ecdsa_raw_sign

SWAP_VERSION = "2"
SWAP_DOMAIN = "SWAP
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

Then you can create a hash of the order itself with the type information included, assuming that `order` represents your order in a dict.

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

## EIP712Domain

If you plan to use `signTypedData` or do the EIP-712 hashing manually, use the following values for the EIP712Domain. The typehash, name, and version must be hashed to bytes32 using keccak256.

| Param             | Type      | Value                                                              |
| :---------------- | :-------- | :----------------------------------------------------------------- |
| Typehash          | `bytes32` | EIP712Domain(string name,string version,address verifyingContract) |
| Name              | `bytes32` | SWAP                                                               |
| Version           | `bytes32` | 2                                                                  |
| verifyingContract | `address` | Swap contract address to be used for settlement                    |

# Quotes

Quotes indicate prices at which a peer is interested in trading. A Quote includes `token`, `amount`, `id`, and `kind` fields for `signer` and `sender`. The `kind` is a token interface identifier like `0x36372b07` (ERC-20) or `0x80ac58cd` (ERC-721). The `amount` is the number of ERC-20 tokens being transferred, and `id` is the ID of the ERC-721 being transferred. Interface identifier `0xd9b67a26` (ERC-1155) uses both `id` and `amount` fields.

**Example**

```json
{
  "signer": {
    "token": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
    "amount": "10000",
    "id": "0",
    "kind": "0x36372b07"
  },
  "sender": {
    "token": "0xc778417e063141139fce010982780140aa0cd5ab",
    "amount": "100000000",
    "id": "0",
    "kind": "0x36372b07"
  }
}
```

# Representation Formats

Throughout the network, messages passed between peers and smart contracts, including request parameters, order and quote responses, and contract events, are interchangeable between nested and flat formats.

## Nested Format

The nested format makes parameters available by dot syntax. For example, `signer.wallet` to access the signer wallet.

**Example**

```json
{
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
    "r": "0x589bb063fc85f49ad096ec9513c45b3e93f5a2da4efe0706db9a2b755121f4c2",
    "s": "0x73075fbae37e5a4954a6e57e0c056d130b582ce390b56fd69f0bb2e103d07e70",
    "v": "28"
  }
}
```

## Flat Format

The flat format of an order collapses the tree structure by concatenating each value as a path. For example, `signer.wallet` is represented as `signerWallet`.

**Example**

```json
{
  "nonce": "1566937684942",
  "expiry": "1566941284",
  "signerWallet": "0x6556b252b05ad2ff5435d04a812b77875fa2bdbe",
  "signerToken": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
  "signerAmount": "10000",
  "signerId": "0",
  "signerKind": "0x36372b07",
  "senderWallet": "0x1FF808E34E4DF60326a3fc4c2b0F80748A3D60c2",
  "senderToken": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
  "senderAmount": "100000000",
  "senderId": "0",
  "senderKind": "0x36372b07",
  "affiliateWallet": "0x0000000000000000000000000000000000000000",
  "affiliateToken": "0x0000000000000000000000000000000000000000",
  "affiliateAmount": "0",
  "affiliateId": "0",
  "affiliateKind": "0x36372b07",
  "signatureSignatory": "0x6556b252b05ad2ff5435d04a812b77875fa2bdbe",
  "signatureValidator": "0x3E0c31C3D4067Ed5d7d294F08B79B6003B7bf9c8",
  "signatureVersion": "0x45",
  "signatureR": "0x589bb063fc85f49ad096ec9513c45b3e93f5a2da4efe0706db9a2b755121f4c2",
  "signatureS": "0x73075fbae37e5a4954a6e57e0c056d130b582ce390b56fd69f0bb2e103d07e70",
  "signatureV": "28"
}
```
