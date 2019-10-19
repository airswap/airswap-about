Running makers for AirSwap Instant involves three key activities.

- Running an HTTP web server that parses JSON-RPC requests
- Pricing and cryptographically signing orders
- Interacting with indexers to signal your intent to trade

# Getting Started

1. Create an Ethereum key pair. You can use Metamask to create a new wallet and export the private key.
2. Use the [ETH Faucet](https://faucet.rinkeby.io/) to obtain Rinkeby ETH.
3. Use the [AST Faucet](https://ast-faucet-ui.development.airswap.io/) to obtain Rinkeby AST.

# Using Node.js

Create a new project and add [AirSwap.js](https://gitub.com/airswap/AirSwap.js) and other dependencies.

```
yarn add express body-parser jayson ethers airswap.js
```

## Running a Server

```javascript
const express = require('express')
const bodyParser = require('body-parser')
const jayson = require('jayson')
const ethers = require('ethers')
const tokenMetadata = require('airswap.js/src/tokens')

const wallet = new ethers.Wallet(PK)

const handlers = {
  getSignerSideQuote: function(args, callback) {
    // Determine signer side param and return a quote.
    callback(null, quote)
  },
  getSenderSideQuote: function(args, callback) {
    // Determine sender side param and return a quote.
    callback(null, quote)
  },
  getMaxQuote: function(args, callback) {
    // Determine maximum amount for both sides and return a quote.
    callback(null, maxQuote)
  },
  getSignerSideOrder: function(args, callback) {
    // Determine signer side param and return a signed order.
    callback(null, order)
  },
  getSenderSideOrder: function(args, callback) {
    // Determine sender side param and return a signed order.
    callback(null, order)
  },
}

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.post('/', jayson.server(handlers).middleware())
app.listen(5000)
```

## Pricing and Signing Orders

## Interacting with Indexers
