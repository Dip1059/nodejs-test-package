# Collpay NodeJs Sdk
This is the official nodejs sdk for Collpay Payment Gateway

[![Version](https://img.shields.io/npm/v/collpay.svg)](https://www.npmjs.org/package/collpay)

# Installation
```sh
  npm install collpay
````

# Usage

```js

    const  Collpay = require('collpay');
    collpay = new Collpay("xxxxxxxxxxxxx", Collpay.ENV_SANDBOX);
    
    collpay.getExchangeRate("USD", "BTC")
        .then(function (resp) {
            console.log(resp);
        }).catch(function (err) {
            console.log(err.message);
    });

    collpay.createTransaction({
            "payment_currency": "BTC",
            "order_currency": "USD",
            "order_amount": "10",
            "payer_name":"xxxxxx",
            "payer_email":"xxx@xxx.com",
            "payer_phone":"xxxxxx",
            "payer_address":"xxxxxx",
            "ipn_url":"xxxxxxx",
            "ipn_secret":"xxxxxxx",   //Any random secret string of your's, It can be empty.
            "success_url":"xxxxxxx",
            "cancel_url":"xxxxxxx",
            "cart":"{\"item_name\":\"t-shirt\",\"item_number\":\"23\",\"invoice:\"SDF-453672-PMT\"}",   //Send any data format like json
            "webhook_data":"{\"order_id\":\"ABC12345-12\"}"   //Send any data format like json
        })
        .then(function (resp) {
            console.log(resp);
        }).catch(function (err) {
            console.log(err.message);
        });
    
    collpay.getTransaction("xxxxxxxxxx")
        .then(function (resp) {
            console.log(resp);
        }).catch(function (err) {
        console.log(err.message);
    });

```