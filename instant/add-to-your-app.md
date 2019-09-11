# Add Instant to Your App

[AirSwap Instant](https://instant.airswap.io/) can be dropped into any webpage and be used to automatically buy or sell Ethereum ERC20 tokens. The widget is designed to provide instant access to liquidity for aggregators, utility token-based dApps, and more.

![](../.gitbook/assets/instant-widget.png)

{% hint style="success" %} Check out the [CodePen](https://codepen.io/grahamperich/pen/xxKqBQy) to explore configuration options. {% endhint %}

# Setup

Add the following `script` tag to the `head` element in your web application.

```html
<script src="https://cdn.airswap.io/airswap-instant-widget.js"></script>
```

{% hint style="working" %} Pop-up blockers can prevent the widget from loading properly. {% endhint %}

# Display the default widget

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

# Display a specific token

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

# Options

| Key          | Type       | Field    | Description                                                                                                                                                                                                                                                                                                                |
| ------------ | ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `env`        | `string`   | optional | Either `development` or `production`. If not specified, this option will default to `production`. Using `production` will request orders for the main Ethereum network, whereas using `development` will request orders for the Rinkeby test network.                                                                      |
| `mode`       | `string`   | optional | Either `buy` or `sell`. If specified, the user will not be able to change the mode.                                                                                                                                                                                                                                        |
| `token`      | `string`   | optional | The hex address of the token to swap in exchange for ETH. You can find a full list of indexed token metadata for: [Mainnet](https://token-metadata.airswap.io/tokens) or [Rinkeby](https://token-metadata.airswap.io/rinkebyTokens). If specified, the user will not be able to search for any other tokens in the widget. |
| `amount`     | `string`   | optional | A default amount of tokens to request orders for. If specified, the user will not be able to change the token amount in the widget.                                                                                                                                                                                        |
| `onComplete` | `function` | optional | Called when the user submits the trade transaction to the blockchain. The `transactionId` is passed as an argument.                                                                                                                                                                                                        |
| `onClose`    | `function` | required | This is the only mandatory parameter. A function called when the user clicks the "X" to dismiss the widget. No arguments are passed.                                                                                                                                                                                       |

{% hint style="info" %} If you specify a token not found in the AirSwap token metadata, the widget will not work. {% endhint %}
