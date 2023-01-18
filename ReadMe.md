# UATU Js Library for JavaScript

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

### Node.js

```js
const { UATU } = require('uatu-js');
const { ethers } = require('ethers');

const wallet = new ethers.Wallet('0x...');
const uatu = new UATU(wallet);

// Watch Events for the Wallet Address
const watcher = uatu.watch();
watcher.on('wallet', (wallet) => {
  console.log(wallet);
});
watcher.on('asset', (asset) => {
  console.log(asset);
});
watcher.on('transactions', (transactions) => {
  console.log(transactions);
});
watcher.on('nfts', (nft) => {
  console.log(nft);
});

// Get Wallets for the Wallet Address
const wallets = await uatu.ask('wallet');

// Get Assets(Coins and ERC20 Tokens) for the Wallet Address
const assets = await uatu.ask('assets');

// Get Transactions for the Wallet Address
const transactions = await uatu.ask('transactions');

// Get NFT Assets for the Wallet Address
const nftAssets = await uatu.ask('nfts');
```

#### Wallet

Wallet is an object that contains the wallet `address` and `Transactions`  .

```js
{
  
}
```