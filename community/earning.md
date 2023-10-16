---
description: Learn how community members are rewarded by contributing to AirSwap
---

Protocol fees on AirSwap support development, growth, and upkeep of AirSwap protocols and apps. Protocol fees are routed to two destinations: a contributor tips pool and a voter rewards pool. This guide explains the system and how you can be rewarded for helping to operate it.

# Contributor Tips

Each month, a contributions thread is opened on [Discord](https://chat.airswap.io). Communicating your contributions is part of your responsibility as a contributor—help your fellow contributors by clearly stating what you have achieved for the month.

{% hint style="warning" %}
If you have not contributed for the month, always **opt-out** of receiving GIVE for that epoch. Anyone who did not describe their contributions or opt out will be removed from the circle and will have to be re-nominated for future rounds.
{% endhint %}

[Coordinape](https://coordinape.com) epochs are 1-6 of each month to allocate GIVE tokens among fellow contributors based on impact. Individual contributors are rewarded proportionally to GIVE received. In case of a shortfall in protocol fees against the monthly minimum ($30K) then AST is requested from `treasury.airswap.eth`.

{% hint style="warning" %}
The allocation system is fully transparent. Allocate fairly and honestly!
{% endhint %}

# Voter Rewards

At the end of each voting period, a number of points is awarded based on the number of staked AST used to vote on proposals. Points enable you to claim a percentage of the rewards pool based on the formula

$$
R = B * (P / (10^S +P )) * M/100
$$

where R is the rewards you can obtain, P is the number of points used to claim (multiplied by 10^4), B is the token balance in the rewards pool, S and M are community adjustable parameters (currently set to S = 10 and M = 100). The formula results in rewards being distributed on a smooth curve based on the number of points used to claim.

![Rewards are distributed on a curve based on the number of points](../.gitbook/assets/rewards.svg)

# Trustless Operations

Protocol fees transfer from Swap and SwapERC20 contracts to a [Split](https://docs.splits.org/core/split) contract, which distributes balances to the rewards pool and contributor tips [Swapper](https://docs.splits.org/core/swapper) contract, which converts various token balances into a single token.

{% hint style="warning" %}
Rewards and tips do not top up until a withdrawal is performed by a community member—so keep an eye on the split balances if you’d like to help out.
{% endhint %}

- **Earn a 1% reward** to perform distributions and withdrawals on the [Split](https://app.0xsplits.xyz/accounts/0xaD30f7EEBD9Bd5150a256F47DA41d4403033CdF0/) contract. Anyone can trigger these anytime by clicking "Distribute & withdraw for all" button.

- **Earn a 1% reward** to perform conversions on the [Swapper](https://app.splits.org/accounts/0x8a14D4a671fBe267844B08D9748eD946348aEbFD/) contract. Anyone can trigger these anytime by clicking the "Swap" button.

{% hint style="info" %}
In both cases, scripts or bots are often developed to perform these actions and earn rewards in an automated way while supporting the trustless operations of AirSwap.
{% endhint %}
