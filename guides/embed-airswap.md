[AirSwap](https://instant.airswap.io/) can be dropped into any webpage and be used to automatically buy or sell Ethereum ERC20 tokens. The widget is designed to provide instant access to liquidity for aggregators, utility token-based dApps, and more.

![](../.gitbook/assets/instant-widget.png)

{% hint style="success" %} Check out the [CodePen](https://codepen.io/grahamperich/pen/xxKqBQy) to explore configuration options. {% endhint %}

## Setup

Add the following `script` tag to the `head` element in your web application.

```html
<script src="https://cdn.airswap.io/airswap-instant-widget.js"></script>
```

{% hint style="warning" %} Pop-up blockers can prevent the widget from loading properly. {% endhint %}

## Display the default widget

The simplest way to use the `AirSwapInstant` widget is by rendering it without any custom configuration options. This will open the widget and allow the user to buy or sell any amount of any token.

```java
window.AirSwapInstant.render(
  {
    onClose: function() {
      console.info('Widget closed.')
    },
  },
  'body'
)
```

## Display a specific token

```java
AirSwapInstant.render(
  {
    env: 'production',
    mode: 'buy',
    token: '0x27054b13b1b798b345b591a4d22e6562d47ea75a',
    amount: '250',
    onClose: function() {
      console.info('Widget closed.')
    },
    onComplete: function(transactionId) {
      console.info('Trade complete.', transactionId)
    },
  },
  'body'
)
```

## Options

| Key          | Type       | Field    | Description                                                                                                                                                                                                                                                                                                                |
| ------------ | ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `env`        | `string`   | optional | Either `development` or `production`. If not specified, this option will default to `production`. Using `production` will request orders for the main Ethereum network, whereas using `development` will request orders for the Rinkeby test network.                                                                      |
| `mode`       | `string`   | optional | Either `buy` or `sell`. If specified, the user will not be able to change the mode.                                                                                                                                                                                                                                        |
| `token`      | `string`   | optional | The hex address of the token to swap in exchange for ETH. You can find a full list of indexed token metadata for: [Mainnet](https://token-metadata.airswap.io/tokens) or [Rinkeby](https://token-metadata.airswap.io/rinkebyTokens). If specified, the user will not be able to search for any other tokens in the widget. |
| `baseToken`  | `string`   | optional | Either `ETH`, `WETH`, `DAI`, or `USDC`. Defaults to `ETH` when not specified.                                                                                                                                                                                                                                              |
| `amount`     | `string`   | optional | A default amount of tokens to request orders for. If specified, the user will not be able to change the token amount in the widget.                                                                                                                                                                                        |
| `onComplete` | `function` | optional | Called when the user submits the trade transaction to the blockchain. The `transactionId` is passed as an argument.                                                                                                                                                                                                        |
| `onClose`    | `function` | required | This is the only mandatory parameter. A function called when the user clicks the "X" to dismiss the widget. No arguments are passed.                                                                                                                                                                                       |

{% hint style="info" %} If you specify a token not found in the AirSwap token metadata, the widget will not work. {% endhint %}

# Embed AirSwap OTC

[AirSwap Trader](https://trader.airswap.io/) can be added to any webpage for over-the-counter trading with no counterparty risk, no deposits, and no fees.

![](../.gitbook/assets/trader-widget.png)

{% hint style="success" %}
Check out the [CodePen](https://codepen.io/syjk129/pen/PoYpgmW) to explore configuration options.
{% endhint %}

## Setup

Add the following `script` tag to the `head` element in your web application.

```html
<script src="https://cdn.airswap.io/airswap-trader.js"></script>
```

{% hint style="info" %}
Pop-up blockers can prevent the widget from loading properly.
{% endhint %}

## Display an new order builder

Embedding the widget is simple. Simply add the following code to where you want to open the widget. The optional `onCreate` callback function will be triggered once the user successfully creates an order. The order details and cid \(ipfs hash\) are passed as arguments.

```javascript
window.AirSwapTrader.render(
  {
    onCreate: (order, cid) => {
      console.log('Order created!')
    },
    onClose: transactionHash => {
      console.log('Widget closed')
    },
  },
  'body',
)
```

![](../.gitbook/assets/build-order.png)

## Pre-fill values in the order builder

In many cases, you would want to set a desired token and amount. To do so, you can add an Order object to the widget options. Passing a value in the object will lock the corresponding field in the widget, preventing the user from changing the value.

```javascript
window.AirSwapTrader.render(
  {
    order: {
      expiry: 1707026510, // Expiration date in seconds
      maker: {
        token: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359', // DAI
        amount: '10000000000000000000', // Atomic value for 10 DAI
      },
      taker: {
        token: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // WETH
        amount: '10000000000000000', // Atomic value for 0.01 WETH
      },
    },
    onCreate: (order, cid) => {
      console.log('Order created!')
    },
    onClose: transactionHash => {
      console.log('Widget closed')
    },
  },
  'body',
)
```

![](../.gitbook/assets/filled-build-order.png)

## Display an existing signed order

To initiate the Taker flow you would need to pass the full order object. The `onSwap` callback function will be triggered when the taker fills the order and passes the hash of the transaction as an argument.

```javascript
window.AirSwapTrader.render(
  {
    order: {
      expiry: 1707026510,
      nonce: 1567014475983
      maker: {
        wallet: '0xd68bb3350887ed3ee128b5ac4b7d852e24c5d366',
        token: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
        amount: '1000000000000000000',
        id: '0',
        kind: '0x36372b07'
      },
      taker: {
        wallet: '0x0000000000000000000000000000000000000000',
        token: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        amount: '10000000000000000',
        id: '0',
        kind: '0x36372b07'
      },
      affiliate: {
        wallet: '0x0000000000000000000000000000000000000000',
        token: '0x0000000000000000000000000000000000000000',
        amount: '0',
        id: '0',
        kind: '0x36372b07'
      },
      signature: {
        version: '0x01',
        signer: '0xd68bb3350887ed3ee128b5ac4b7d852e24c5d366',
        r: '0xf28352ca1252b77771d55293f0fd49f97e544ccdf34c88a4821502495aa5dfa8',
        s: '0x42e653d2a8b09adc6a547ae581a09162cb82d0e456d45fae662956b68de1a394',
        v: 28,
      },
    },
    onSwap: (transactionHash) => {
      console.log('Trade complete!')
    },
    onClose: (transactionHash) => {
      console.log('Widget closed')
    },
  },
  'body',
)
```

If you have the full signed order details stored in [IPFS](https://ipfs.io), you can use the IPFS hash instead.

```javascript
window.AirSwapTrader.render(
  {
    cid: 'QmRi5hnoBJPKJ54FnyqyRnzsigpEYLq75pyjuNeMjoEsNf',
    onSwap: transactionHash => {
      console.log('Trade complete!')
    },
    onClose: transactionHash => {
      console.log('Widget closed')
    },
  },
  'body',
)
```

![](../.gitbook/assets/taker-view.png)

## Options

| Key                   | Type                                              | Field          | Description                                                                                                                                                                                         |
| :-------------------- | :------------------------------------------------ | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `env`                 | string                                            | `optional`     | Defaults to `production`. Using `production` connects to mainnet and `development` connects to the Rinkeby testnet.                                                                                 |
| `widgetConfig`        | [WidgetConfig](embed-airswap.md#WidgetConfig)   | `optional`     | Config to customize the appearance of the widget                                                                                                                                                    |
| `customTokenSections` | [TokenSection](embed-airswap.md#TokenSection)[] | `optional`     | Config to add custom token sections in the token selector. Defaults to the standard AirSwap token selector sections                                                                                 |
| `order`               | [Order](../reference/types.md#order)              | `optional`     | Optionally provide values to pre-populate the order builder. If any parameters are specified, it will lock that value in the builder. If a full order is provided, it will be presented for taking. |
| `orderGasLimit`       | number                                            | `optional`     | Custom gas limit for the order. |
| `canDismiss`          | boolean                                           | `optional`     | Whether the user can dismiss the widget. Defaults to true. |
| `customShareURL`          | string                                           | `optional`     | Custom share URL for the order. If provided, the order cid is passed as a query param. Defaults to trader.airswap.io/[cid]. |
| `preTransferCheckErrors`          | Map<string, [PreTransferCheck](embed-airswap.md#PreTransferCheck)>                                           | `optional`     | Custom pre-transfer check error message map. The key is the error code and value is the custom message configuration. |
| `cid`                 | string                                            | `optional`     | [IPFS](https://ipfs.io) hash for the order. If provided, the widget will fetch the order details from IPFS and display a take order screen.                                                         |
| `onCreate`            | Function                                          | `optional`     | [Callback function](embed-airswap.md#oncreate) triggered on creation of a trade.                                                                                                                  |
| `onSubmit`            | Function                                          | `optional`     | [Callback function](embed-airswap.md#onsubmit) triggered on submission of a trade.                                                                                                                |
| `onSwap`              | Function                                          | `optional`     | [Callback function](embed-airswap.md#onswap) triggered on a successful trade.                                                                                                                     |
| `onCancel`            | Function                                          | `optional`     | [Callback function](embed-airswap.md#oncancel) triggered on a successful cancel.                                                                                                                  |
| `onError`             | Function                                          | `optional`     | [Callback function](embed-airswap.md#onerror) triggered when an error occurs on a trade submission.                                                                                               |
| `onClose`             | Function                                          | **`required`** | [Callback function](embed-airswap.md#onclose) triggered on widget close.                                                                                                                          |

## Objects

### WidgetConfig

Config to customize the appearance of the widget.

| Type               | Parameter | Field      | Description                                                                                                         |
| :----------------- | :-------- | :--------- | :------------------------------------------------------------------------------------------------------------------ |
| `primaryColor`     | string    | `optional` | Hex code of custom primary color. Defaults to #2b71ff                                                               |
| `secondaryColor`   | string    | `optional` | Hex code of custom secondary color. Defaults to #2b71ff                                                             |
| `logoUrl`          | string    | `optional` | Logo image URL. Defaults to the AirSwap logo. Preferred image dimensions are 150px x 30px.                          |
| `condensedLogoUrl` | string    | `optional` | Logo image URL for mobile view. Defaults to the condensed AirSwap logo. Preferred logo dimensions are 150px x 30px. |

### TokenSection

Config to customize token sections in the token selector.

| Type     | Parameter | Field      | Description                                            |
| :------- | :-------- | :--------- | :----------------------------------------------------- |
| `label`  | string    | `required` | The token section label                                |
| `tokens` | string[]  | `required` | List of token addresses to show in the token selector. |

Example of a widget with customized appearance

```javascript
window.AirSwapTrader.render(
  {
    widgetConfig: {
      primaryColor: '#151212',
      secondaryColor: '#2B71FF',
      logoUrl: 'https://www.example.com/path/to/image',
    },
    orderGasLimit: 9000000,
    customTokenSections: [
      {
        label: 'Custom Tokens',
        tokens: ['0x97d1fe62edd176db61aaaa395e61fda3f1832747', '0xcc1cbd4f67cceb7c001bd4adf98451237a193ff8'],
      },
      {
        label: 'Custom Stablecoins',
        tokens: ['0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea'],
      },
    ],
    onSwap: transactionHash => {
      console.log('Trade complete!')
    },
    onClose: transactionHash => {
      console.log('Widget closed')
    },
  },
  'body',
)
```

### PreTransferCheck

Config to set custom Pre-Transfer Check messages

| Type    | Parameter               | Field      | Description                              |
| :------ | :---------------------- | :--------- | :--------------------------------------- |
| `maker` | [PreTransferCheckMessage](embed-airswap.md#PreTransferCheckMessage) | `optional` | Pre-Transfer Check Message for the maker |
| `taker` | [PreTransferCheckMessage](embed-airswap.md#PreTransferCheckMessage) | `optional` | Pre-Transfer Check Message for the maker |

### PreTransferCheckMessage

Pre-Transfer Check Message Details

| Type          | Parameter | Field      | Description                                            |
| :------------ | :-------- | :--------- | :----------------------------------------------------- |
| `message`     | string    | `required` | Message to display for the pre-transfer check error code |
| `buttonText`  | string    | `optional` | Action Button Text. Defaults to "Redirect" if redirectURL is provided and "Done" if not. |
| `redirectURL` | string    | `optional` | If provided, the action button will open a new tab with this url. The order details will be passed as query params. |

## Callbacks

### onCreate

Callback function triggered on creation of a trade. Passes the order and cid to the function as arguments.

```javascript
function onCreate(order, cid) {
    console.log('Order Created!');
    ...
}
```

| Type    | Parameter                            | Description                 |
| :------ | :----------------------------------- | :-------------------------- |
| `order` | [Order](../reference/types.md#order) | The order details.          |
| `cid`   | string                               | The IPFS Hash of the order. |

### onSubmit

Callback function triggered on submission of a trade. This does not necessarily mean that the trade was completed. No arguments.

```javascript
function onSubmit() {
    console.log('Order submitted!');
    ...
}
```

### onSwap

Callback function triggered on a successful trade. Passes the transaction hash of the fill event as an argument.

```javascript
function onSwap(transactionHash) {
    console.log('Trade Completed!');
    ...
}
```

| Type              | Parameter | Description                                                                                                                            |
| :---------------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `transactionHash` | `string`  | Hash of the swap transaction. Can be used on blockchain explorers like [Etherscan](https://etherscan.io/) to view transaction details. |

### onError

Callback function triggered when an error occurs on a trade submission. The user can resolve the issue and try completing the trade again. Passes the error message as an argument.

```javascript
function onError(error) {
    console.log('There was an error on trade submission');
    console.log(error);
    ...
}
```

| Type    | Parameter | Description                            |
| :------ | :-------- | :------------------------------------- |
| `error` | `string`  | Description of the error that occured. |

### onCancel

Callback function triggered when a trade is canceled. Passes the transaction hash of the cancellation event as an argument.

```javascript
function onCancel(transactionHash) {
    console.log('Trade Cancelled!');
    ...
}
```

| Type              | Parameter | Description                                                                                                                                   |
| :---------------- | :-------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| `transactionHash` | `string`  | Hash of the cancelation transaction. Can be used on blockchain explorers like [Etherscan](https://etherscan.io/) to view transaction details. |

### onClose

Callback function triggered when the user closes the widget. No arguments.

```javascript
function onClose() {
  console.log('Widget closed')
}
```
