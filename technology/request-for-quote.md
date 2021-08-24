In RFQ, servers are **signers** and clients are **senders**.

1. Client sends the server a JSON-RPC over HTTP request.
2. Server responds with a signed order.
3. Client may send the signed order to Ethereum for settlement.

# Discovery

RFQ is available over **HTTP or WebSocket**. For information in finding counterparties, see [Discovery](./discovery.md).

# Methods

## `getSignerSideOrder`

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

## `getSenderSideOrder`

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

# Protocol

For information on finding counterparties, see the (Discovery)[./discovery.md] protocol. With server URLs in hand, clients call `getSignerSideOrder` or `getSenderSideOrder` as JSON-RPC over HTTP requests.

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

A response looks like the [example](#example) above. Requests can be made using curl for testing.

```sh
curl -H 'Content-Type: application/json' \
     -d '{"jsonrpc":"2.0","id":"123","method":"getSignerSideOrder","params":{"signerToken":"0xdac17f958d2ee523a2206206994597c13d831ec7","senderWallet":"0x1FF808E34E4DF60326a3fc4c2b0F80748A3D60c2","senderToken":"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2","senderAmount":"1000000000000000000","swapContract":"0xc549a5c701cb6e6cbc091007a80c089c49595468"}}' \
     http://localhost:3000/
```

After requesting an order, parameters are submitted as an Ethereum transaction to the `swap` function on the [Light](https://docs.airswap.io/contract-deployments) contract, which emits a `Swap` event on success.

```JavaScript
  function swap(
    uint256 nonce,
    uint256 expiry,
    address signerWallet,
    IERC20 signerToken,
    uint256 signerAmount,
    IERC20 senderToken,
    uint256 senderAmount,
    uint8 v,
    bytes32 r,
    bytes32 s
  ) external;
```

```JavaScript
  event Swap(
    uint256 indexed nonce,
    uint256 timestamp,
    address indexed signerWallet,
    IERC20 signerToken,
    uint256 signerAmount,
    uint256 signerFee,
    address indexed senderWallet,
    IERC20 senderToken,
    uint256 senderAmount
  );
```

The server may subscribe to a filter for a `Swap` event with the nonce they provided to the client.
