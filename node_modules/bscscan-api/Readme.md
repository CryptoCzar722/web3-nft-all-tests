# Etherscan API

## Development of a NEXTGEN Version has started - please stand by

A way to access the [bscscan.com api](https://bscscan.com/apis) using promises. Fetch a diverse set of information about the blockchain.

Mainnet

```javascript
var api = require("bscscan-api").init("YourApiKey");
var balance = api.account.balance("0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae");
balance.then(function (balanceData) {
  console.log(balanceData);
});
```

## For testnet usage

Supported:

Latest

```javascript
// apikey, network, timeout
var api = require('bscscan-api').init('YourApiKey','rinkeby'. '3000');
```

## Install

```bash
npm install bscscan-api --save
```

## API Documentation

## Development workflow

- npm test - runs tests
  - npm run posttest - starts the linter
- npm run lint - preconfigured linter
- npm run docs - generates the apidocs
- npm run bundle - builds a new bundle
- npm run preversion - Steps before we create a new Tag
  - lint
  - changelog
- npm run pages - pushes generated apidocs to the server
- postversion - after generating a new version, push the tag to the server
- npm run changelog - generates a changelog and pushes it
