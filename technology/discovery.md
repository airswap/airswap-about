To find servers that support a token pair, clients call the `getURLsForToken` function on the [Registry](https://docs.airswap.io/contract-deployments) contract for each token and then intersect the results. For example, if the resulting URLs for token A are `[maker1.com, maker2.com]` and for token B are `[maker2.com, maker3.com]` then the only server supporting swapping token A for B is `maker2.com`.

```JavaScript
  function getURLsForToken(address token)
    external
    view
    returns (string[] memory urls);
```

When connecting to a server, clients send an initial request to determine the connection type. If the server responds with HTTP status code 426 (Upgrade Required) then the client should connect using WebSocket.
