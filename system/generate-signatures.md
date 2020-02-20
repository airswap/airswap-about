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
