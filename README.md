[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) ![react](https://badges.aleen42.com/src/node.svg) ![redux](https://badges.aleen42.com/src/messenger.svg)


# Crypto Messenger Bot
A simple messenger bot that tells you prices of thousands of cyptocurrencies instantly.

## Features

- Show value of your favorite cryptocurrency, just chat the symbol you want (btc, xrp, eth)
- Set up your cryptocurrency portfolio 
- Subscribes to daily cryptocurrency updates

## Setup

Install the dependencies

```
npm install
```

Add .env file. Add your messenger page access token. Username and password for sqlite db.

```
PAGE_ACCESS_TOKEN=
DB_USER=
DB_PASS=
```

Create .data/cryptos.db file

```
mkdir .data && touch .data/cryptos.db
```

Setup your Messenger App [Messenger App](https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start/)

The Permissions and Features you need are

- public_profile
- email
- pages_messaging
