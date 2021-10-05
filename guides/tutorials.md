# Tutorials

## Staking

### Connect your MetaMask wallet to the [Governance portal](https://activate.codefi.network/staking/airswap/governance)

![](../.gitbook/assets/95263fbc76788410a762860763cc3aa47abab6d1.png)

### Click on Stake to begin the staking process.

![](../.gitbook/assets/86accfee5ce0af6ac6310ba1a80b39e9cc104947.png)

{% hint style="info" %}
Note there will be two transactions: one is for permission & the second one transfers your tokens to the staking contract.
{% endhint %}

### Staking complete

The dashboard should look like this one below.

![](../.gitbook/assets/e480f2e7f8795306a0a39bd49a772ff7e6b894df.png)



## Voting with MetaMask Mobile

* You will need to download and install MetaMask on your mobile \([https://play.google.com/store/apps/details?id=io.metamask&hl=en&gl=US](https://play.google.com/store/apps/details?id=io.metamask&hl=en&gl=US)\)
* Once your MetaMask mobile wallet is set up, click the voting page link and open it with MetaMask 

![](../.gitbook/assets/813697c84bf291b11e7acaf30db3b71041109dd5.png)

* Read through the AIP and make sure you understand what you are voting for 

![](../.gitbook/assets/999955bd725bd8203dbb5eb35d797a393965ad11.png)

* Select your choice to vote for

![](../.gitbook/assets/55dff0dc8db6ec075fb0da374730564635ceb55f.png)

* A prompt to connect your wallet will open up. Select Metamask and confirm your choice.

![](../.gitbook/assets/8fffc2217b50d29e250e2529b2e93d556a99c740.png)

![](../.gitbook/assets/5aedf9bba1a86b5435a52a9b5b855e17927322f2.png)

* Sign the message to confirm your vote! \(signing does not require any gas fees\)

![](../.gitbook/assets/5d34fc3567ad0f4b52aae738075c526a18ae4103.png)

* Congratulations! Your vote has now been cast! Wait for the voting phase to complete to claim your points!



## Manual Unstaking from Deprecated contract

### Manual Unstaking

Navigate to the deprecated staking contract in [etherscan](https://etherscan.io/address/0x704c5818b574358dfb5225563852639151a943ec#readContract) -&gt; contract -&gt; read contract

### Check the AST balance in the contract

Under `balanceOf`, input your `address` and click query \(querying the chain does not require gas\)

Check to ensure that the amount tallies with the amount of AST you have staked 

{% hint style="info" %}
The amount displayed is multiplied by 10,000 to account for the decimal places
{% endhint %}

![](../.gitbook/assets/manual_unstake_1.png)

### Check the balance available to unstake

Under `available`, input your `address` and under `index`, input `0`

This number represents the amount of AST available to be unstaked currently. Make sure that this number tallies with the number of AST in `balanceOf` if you want to withdraw the full amount.

![](../.gitbook/assets/manual_unstake_2.png)

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

![](../.gitbook/assets/manual_unstake_3.png)

![](../.gitbook/assets/manual_unstake_4.png)
