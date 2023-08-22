---
description: Learn how community members get rewarded by contributing to AirSwap
---

Protocol fees on AirSwap support development, growth, and upkeep of AirSwap protocols and apps. Protocol fees are routed to two destinations: a contributor tips pool and a voter rewards pool. This guide explains the system and how you can be rewarded for helping to operate it.

## Protocol fees

With the onchain payments system [0xSplits](https://www.0xsplits.xyz/), protocol fees are automatically transferred from our swap contracts to a [Split](https://docs.0xsplits.xyz/core-concepts#split) contract, which splits the balances it receives according to configured percentages and withdraws those balances to their destinations.

## Distributions

Community members (like you!) trigger token distributions and withdrawals from the Split contract to their final destinations earning a 1% reward for doing so. Anyone can trigger these at any time by clicking the "Distribute & withdraw for all" on the [0xSplits web app](https://app.0xsplits.xyz/accounts/0xaD30f7EEBD9Bd5150a256F47DA41d4403033CdF0/).

Our current split percentages are 86% to voter rewards and 14% to contributor tips according to [AIP 46](https://snapshot.org/#/vote.airswap.eth/proposal/QmRes6C3ZqLK4Mk3pygH62wkU2XJWBm3hXo54qZ9Z3FkVz). What this means is that rewards and tips do not top up until a withdrawal is triggered by a community member—so keep an eye on the split balances if you’d like to help out.

Our current split contract is configurable by the Ops multisig, which means split percentages can be updated by AIP community vote. [AIP 79](https://vote.airswap.io/#/proposal/0x4257c648d9c2e8a4a1f38e3cd4c3c901d89b27c48460b734c94c38b2f1a20e59) was recently accepted, so our split percentages will be updated to 70% to voter rewards and 30% to contributor tips if conditions are met.

## Base amounts

In case of a shortfall in protocol fees against the monthly base amount (below), $30K in AST is withdrawn from `treasury.airswap.eth` to ensure the monthly base amount is met.

## Be descriptive

Each month, a Contributions thread will be opened on [Discord](https://chat.airswap.io). Anyone who has contributed to AirSwap in that month should summarize their contributions for the month in that thread.

{% hint style="info" %}
Communicating your contributions to AirSwap is part of your responsibility as a Contributor. Help your fellow contributors by clearly stating what you have achieved for the month.
{% endhint %}

{% hint style="warning" %}
If you have not contributed for the month, remember to **Opt-out** of receiving GIVE for that epoch. Anyone who did not describe their contributions or opt out will be removed from the circle and will have to be re-nominated for future rounds.
{% endhint %}

## Allocate accurately

[Coordinape](https://coordinape.com) circles will open 1st - 6th of each month for all contributors to reward their co-workers with GIVE tokens. Contributors will start with 100 GIVE tokens. These GIVE tokens are used to reward team members according to their impact in the circle during the current cycle.

After the allocation period is complete, any GIVE tokens not distributed will be burnt (there is no use holding GIVE tokens for yourself!). Individual contributors will be rewarded from the circle funds proportionally to their GIVE allocations received.

{% hint style="info" %}
The GIVE allocation system is open and transparent, so GIVE fairly and honestly!
{% endhint %}

# Voter Rewards

At the end of each voting period, a number of points is awarded based on the number of AST used to vote. Points enable you to claim a certain percentage of the rewards pool based on the formula

$$
R = B * (P / (10^S +P )) * M/100
$$

where R is the rewards you can obtain, P is the number of points used to claim (multiplied by 10^4), B is the token balance in the rewards pool, S and M are community adjustable parameters (currently set to S = 10 and M = 100).

The formula results in rewards being distributed on a smooth curve based on the number of points used to claim.

![Current rewards are distributed on a curve based on the number of points](../.gitbook/assets/rewards.svg)

⚠ Note that fees are continuously streaming into the community pool and participants are continuously claiming tokens. Due to the dynamic nature of this process, slippage on claims is possible.
