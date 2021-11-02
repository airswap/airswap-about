# Tutoriels

## Staking

### Connectez votre wallet MetaMask au [portail de gouvernance](https://activate.codefi.network/staking/airswap/governance)

![](../.gitbook/assets/95263fbc76788410a762860763cc3aa47abab6d1.png)

### Cliquez sur Stake pour commencer le processus de staking

![](../.gitbook/assets/86accfee5ce0af6ac6310ba1a80b39e9cc104947.png)

{% hint style="info" %}
Notez qu'il y aura deux transactions : l'une pour l'autorisation et la seconde pour le transfert de vos tokens vers le contrat de staking.
{% endhint %}

### Staking terminé

Le tableau de bord devrait ressembler à celui ci-dessous.

![](../.gitbook/assets/e480f2e7f8795306a0a39bd49a772ff7e6b894df.png)

## Voter avec MetaMask Mobile

* Vous devez télécharger et installer MetaMask sur votre téléphone portable \([https://play.google.com/store/apps/details?id=io.metamask&hl=en&gl=US](https://play.google.com/store/apps/details?id=io.metamask&hl=en&gl=US)\)
* Une fois que votre wallet mobile MetaMask est configuré, cliquez sur le lien de la page de vote et ouvrez-la avec MetaMask. 

![](../.gitbook/assets/813697c84bf291b11e7acaf30db3b71041109dd5.png)

* Lisez l'AIP et assurez-vous de bien comprendre ce pour quoi vous votez. 

![](../.gitbook/assets/999955bd725bd8203dbb5eb35d797a393965ad11.png)

* Sélectionnez votre choix pour voter pour

![](../.gitbook/assets/55dff0dc8db6ec075fb0da374730564635ceb55f.png)

* Une invitation à connecter votre wallet s'ouvrira. Sélectionnez Metamask et confirmez votre choix.

![](../.gitbook/assets/8fffc2217b50d29e250e2529b2e93d556a99c740.png)

![](../.gitbook/assets/5aedf9bba1a86b5435a52a9b5b855e17927322f2.png)

* Signez le message pour confirmer votre vote ! \(la signature ne nécessite pas de frais de gaz\)

![](../.gitbook/assets/5d34fc3567ad0f4b52aae738075c526a18ae4103.png)

* Félicitations ! Votre vote a été enregistré ! Attendez que la phase de vote soit terminée pour réclamer vos points !

## Unstaking manuel d'un contrat déprécié

### Unstaking manuel

Naviguez jusqu'au contrat de staking déprécié sur [etherscan](https://etherscan.io/address/0x704c5818b574358dfb5225563852639151a943ec#readContract) -&gt; contract -&gt; read contract

### Vérifiez le solde AST dans le contrat

Sous `balanceOf`, Saisissez votre adresse et cliquez sur "Query" \("l'interrogation" de la chaîne ne nécessite pas de gaz\)

Vérifiez que le montant correspond au montant d'AST que vous avez staké.

{% hint style="info" %}
Le montant affiché est multiplié par 10 000 pour tenir compte des décimales.
{% endhint %}

![](../.gitbook/assets/manual_unstake_1.png)

### Vérifier le solde disponible pour le unstake

Sous "disponible", entrez votre "adresse" et sous "index", entrez "0".

Ce nombre représente le montant d'AST disponible pour être unstaké actuellement. Assurez-vous que ce nombre corresponde au nombre d'AST dans `balanceOf` si vous voulez retirer le montant total.

![](../.gitbook/assets/manual_unstake_2.png)

{% hint style="info" %}
Si vous avez effectué plusieurs stakes sur ce contrat, vous pouvez vérifier le solde disponible pour chaque mise en changeant `index`.
{% endhint %}

Si le nombre ne correspond pas non plus, vous devez attendre plus longtemps pour retirer la totalité du montant. \(20 semaines\), ou vous aviez misé sur plusieurs lots. Vérifiez l'historique de vos interactions avec ce contrat dans [etherscan ](https://etherscan.io/token/0x704c5818b574358dfb5225563852639151a943ec#balances)pour savoir quand vous avez staké, et combien de mises vous avez fait.

### Unstake

Enfin, pour unstaker, allez dans "Rédiger le contrat" et faites défiler jusqu'à la fonction "unstake".

Entrez le montant que vous souhaitez unstaker \(il doit être inférieur au solde `disponible` d'en haut\). Si vous avez staké plusieurs fois, vous pouvez unstaker en fournissant l'entrée dans un format de tableau. `[unstake1, unstake2, unstake3...]`.

Signez la transaction avec votre porte-monnaie web3 et payez les frais de gaz pour vous libérer !

{% hint style="info" %}
N'oubliez pas de multiplier l'AST que vous souhaitez unstaker par 10 000 pour tenir compte des décimales.
{% endhint %}

![](../.gitbook/assets/manual_unstake_3.png)

![](../.gitbook/assets/manual_unstake_4.png)

