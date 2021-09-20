---
description: For members who have stakes left on the deprecated staking contract
---

# Manual Unstaking

### Navigate to the deprecated staking contract

Navigate to the deprecated staking contract in [etherscan](https://etherscan.io/address/0x704c5818b574358dfb5225563852639151a943ec#readContract) -&gt; contract -&gt; read contract

![](../../../.gitbook/assets/image%20%286%29.png)

### Check the AST balance in the contract

Under `balanceOf`, input your `address` and click query \(querying the chain does not require gas\)

Check to ensure that the amount tallies with the amount of AST you have staked 

{% hint style="info" %}
The amount displayed is multiplied by 10,000 to account for the decimal places
{% endhint %}

![](../../../.gitbook/assets/image%20%284%29.png)

### Check the balance available to unstake

Under `available`, input your `address` and under `index`, input `0`

This number represents the amount of AST available to be unstaked currently. Make sure that this number tallies with the number of AST in `balanceOf` if you want to withdraw the full amount.

![](../../../.gitbook/assets/image%20%282%29.png)

{% hint style="info" %}
If you have made multiple stakes into this contract, you can check the balance available for each staking event by changing `index`.
{% endhint %}

If the number does not tally, either, you have to wait longer to unstake the full amount \(20 weeks\), or you had staked in multiple batches. Check your historical interactions with this contract in [etherscan ](https://etherscan.io/token/0x704c5818b574358dfb5225563852639151a943ec#balances)to find out when you staked, and how many stakes you had made.

### Unstake

Finally, to unstake, head to `write contract` and scroll to the `unstake` function.

Input the amount you wish to unstake \(it has to be less than the `available` balance from above\). If you had staked multiple times, you can batch unstake by providing the input in an array format `[unstake1, unstake2, unstake3...]`.

Sign the transaction with your web3 wallet and pay the gas fee to unstake!

{% hint style="info" %}
Remember to multiply the AST you wish to unstake by 10,000 to account for decimals!
{% endhint %}

![](../../../.gitbook/assets/image%20%288%29.png)



![](../../../.gitbook/assets/image%20%287%29.png)

