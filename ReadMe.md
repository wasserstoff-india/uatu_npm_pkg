# UATU Library for JavaScript

## Introduction

This is a JavaScript library for UATU. It is a wrapper for the UATU API. It is written in TypeScript and can be used in both Node.js and the browser. It is also available as a [npm package](https://www.npmjs.com/package/uatu-js).

## Installation

### Node.js

```bash
npm install uatu-js
```

### Browser

```html
<script src="https://unpkg.com/uatu-js"></script>
```

## Usage

```js
const { UATU } = require('uatu-js');
const { ethers } = require('ethers');

const wallet = new ethers.Wallet('0x...');
const uatu = new UATU(wallet);

// Watch Events for the Wallet Address
const watcher = uatu.watch();
watcher.on('connected', () => {
  console.log("UATU connected");
});
watcher.on('wallet', (wallet) => {
  // Receives Wallet Object
  console.log(wallet); // <Wallet>
});
watcher.on('asset', (asset) => {
  // Receives Asset Object
  console.log(asset); // <Asset>
});
watcher.on('transaction', (transaction) => {
  // Receives Transaction Object
  console.log(transaction);  // <Transaction>
});
watcher.on('nft', (nft) => {
  // Receives NFT Object
  console.log(nft); // <NFT>
});

// Get Wallets for the Wallet Address
const wallets = uatu.ask('wallet').then((wallet) => {
  // Returns Wallet Object
  console.log(wallet); // <Wallet>
});

// Get Assets(Coins and ERC20 Tokens) for the Wallet Address
const assets = await uatu.ask('assets').then((assets) => {
  // Returns array of Assets
  console.log(assets);  // [<Asset>]
});

// Get Transactions for the Wallet Address
const transactions = await uatu.ask('transactions').then((transactions) => {
  // Returns array of Transactions
  console.log(transactions);  // [<Transaction>]
});

// Get NFT Assets for the Wallet Address
const nftAssets = await uatu.ask('nfts').then((nftAssets) => {
  // Returns array of NFT Assets
  console.log(nftAssets); // [<NFT>]
});
```

### Wallet Object `<Wallet>`

Wallet is an object that contains the wallet `address` and `Transactions`  .

```js
{
  "walletAddress": "0x8248734173c746ea29ae138117ef652266ae9f2b",
  "assets": [
    <Asset>
  ],
  "transactions": [
    <Transaction>
  ],
  "nftAssets": [
    <NFT>
  ]
}
```

### Asset Object `<Asset>`

Asset is an object that contains the `value` , `symbol` and `chain` of the asset.

```js
{
  "value": 300,
  "symbol": "<CoinSymbol>",
  "chain": "<ChainName>",
}
```

### Transaction Object `<Transaction>`

Transaction is an object that contains the `hash` , `fromAddress` , `toAddress` , `value` , `txnType` , `chainId` , `coin` , `blockNumber` , `txnStatus` and `timestamp` of the transaction.

```js
{
  "hash": "0xe12b7ac0cdcbcba0d42740539198ba52b503a914551002f6c45e21e9c923e416",
  "fromAddress": "0x0000000000000000000000000000000000000000",
  "toAddress": "0xf2f5c73fa04406b1995e397b55c24ab1f3ea726c",
  "value": 1,
  "txnType": "RECIEVE",
  "chainId": 1,
  "coin": "<CoinSymbol>",
  "blockNumber": 15586637,
  "txnStatus": true,
  "timestamp": 1629200000
}
```

### NFT Object `<NFT>`

NFT is an object that contains the `token_address` , `token_id` , `owner_of` , `block_number` , `block_number_minted` , `token_hash` , `amount` , `contract_type` , `name` , `symbol` , `token_uri` , `minter_address` , `chainId` and `timestamp` of the NFT.

```js
{
  "token_address": "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
  "token_id": "34812922231052332207600408151355793147729817622833157082448925652934526198815",
  "owner_of": "0xf2f5c73fa04406b1995e397b55c24ab1f3ea726c",
  "block_number": 15568803,
  "block_number_minted": 15568742,
  "token_hash": "a23198f8badee88f2650ea9f0dfcb175",
  "amount": 1,
  "contract_type": "ERC721",
  "name": "Ethereum Name Service",
  "symbol": "ENS",
  "token_uri": null,
  "minter_address": "0x26e850e94b0b7b672544a5b60ac3463957a817ba",
  "chainId": 1,
  "timestamp": 1629200000
}
```

### Coin Symbol `<CoinSymbol>`

Coin Symbol is a string that represents the symbol of the coin. e.g. `ETH` , `BTC` , `USDT` , `DAI` . See Full List of Coin Symbols [here]().

### Chain Name `<ChainName>`

Chain Name is a string that represents the name of the chain. e.g. `Ethereum` , `Binance Smart Chain` , `Polygon` , `Avalanche` . See Full List of Chain Names [here]().