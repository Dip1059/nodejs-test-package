const https = require('https');
const querystring = require('querystring');

const v1 = "v1";
const envProduction = 1;
const envSandBox = 2;
const productionBaseUrl = "localhost";
const sandBoxBaseUrl = "collpay-dev.dev.squaredbyte.com";

let reqOptions = {
    version: v1
};

class Collpay {

    constructor(publicKey, env, version = v1) {
        if (version) {
            reqOptions.version = version;
        }
        if (env === envSandBox) {
            reqOptions.host = sandBoxBaseUrl;
        } else {
            reqOptions.host = productionBaseUrl;
        }
        reqOptions.headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json",
            "x-auth": publicKey
        };
    }

    //payment transaction statuses
    TRANSACTION_PROCESSING = "Processing"
    TRANSACTION_NOTIFIED = "Notified"
    TRANSACTION_EXPIRED = "Expired"
    TRANSACTION_CONFIRMED = "Confirmed"
    /*TRANSACTION_COMPLETED = "Completed"
    TRANSACTION_FAILED = "Failed"
    TRANSACTION_REJECTED = "Rejected"
    TRANSACTION_BLOCKED = "Blocked"
    TRANSACTION_REFUNDED = "Refunded"
    TRANSACTION_VOIDED = "Voided"*/

    //ipn or webhook events
    PAYMENT_EVENT = "payment"

    getExchangeRate(fromAmount, toAmount) {
        let body = querystring.stringify({
            "from": fromAmount,
            "to": toAmount
        });
        return  makeRequest("/exchange-rate", "POST", body);
    }

    createTransaction(transaction) {
        transaction.type = "collpay";
        let body = querystring.stringify(transaction);
        return  makeRequest("/transactions", "POST", body);
    }

    getTransaction(id) {
        if(!id) {
            return new Promise(function(resolve, reject) {
                resolve({"success":false, "message":"Invalid transaction id."});
            });
        }
        return  makeRequest("/transactions/"+id, "GET");
    }

}

function makeRequest(endpoint, method, body = null) {
    reqOptions.path = '/api/' + reqOptions.version + endpoint;
    reqOptions.method = method;
    let str = '';
    return new Promise(function(resolve, reject) {
        https.request(reqOptions)
            .on('error', err => {
                reject(err);
            })
            .on('response', response => {
                response.on('data', chunk => {
                    str += chunk;
                })
                response.on('end', function () {
                    try {
                        if(response.statusCode !== 200) {
                            reject(new Error(method+" "+reqOptions.host+reqOptions.path+': '+response.statusCode+', '+response.statusMessage));
                            return;
                        }
                        resolve(JSON.parse(str));
                    } catch (e) {
                        reject(e);
                    }
                });
            })
            .end(body);
    })
}


module.exports = Collpay;
module.exports.ENV_PRODUCTION = envProduction;
module.exports.ENV_SANDBOX = envSandBox;
module.exports.V1 = v1;