const http = require('http');
const EventEmitter = require('events');
const emitter = new EventEmitter();

const options = {
    host: 'localhost',//'collpay-dev.dev03.squaredbyte.com',
    path: '/api/v1/countries',
    port: '8000',
    method: 'get',
    headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiNjdjOGExN2Y5YzkzNWRiY2UyMTE3MmRlYzNlZjFjODc0OTFmZmU0NTE0MDdjOTU2Y2YyZjlhN2IwNDdlZTY0MTBkOWMxYzg2NzM1NTI4NTAiLCJpYXQiOjE2MDY0MDAwODYsIm5iZiI6MTYwNjQwMDA4NiwiZXhwIjoxNjA3Njk2MDgxLCJzdWIiOiI0Iiwic2NvcGVzIjpbXX0.Ve6m2BOcsuq9lvOyRa8gfagykUuGGprHI5H2oDClkU1wzauAM2F0Dnnat8t2deTa87fJHQXgZ9S52rblrFmn18CmPloo8zhxMAOrhUQ2RXN9Ysu0FbemSlSHMIqjVO-N4XNGTUE4HAii5PhUvW8VoUWn9mRihzIJAHz_1ThqM7ocpp901KxjRqgoM_29xBw1SMiUnegV6sRuae0gfQ7ADWXMgRKWA8IboTeZreNM2xA_V2mDi4ErJRYFFVmtGaIIkFHjSrkXkVlFCAB_TA65ChjW_MKn7FiU6cqrUXOyppza19J93IXrLBySIyA_QIvdTr8fHEONI5d200cGuqR9QkJzvOwoU3qPhab3SI5ZOSs7MXtBQE_t24YpDc6fc0TderP8me-3QzrFXLNnI2-hjF_t1t_pkhI7V05ke9BjFvXRVo-U1XdU5X7_ccausGYYVqLgZcgy-Yx0LAvUhLQag9kdjzSx9mgRF6xTy42ZSWL0GqccgLHcMN4JqZtJzY2WCMFq7GywH4Jz9CN-WhQEUfA2ZePd84V8pqypr3uuSkA6pWrpgQqqMPbD8CvRWL5_es_7rlADZnyx6iX_U_HM_8UZZPqCXveHsMRrQ5grz7KgcVj9FqK_4I2Le_ogqI1M7ZjVQ8k4Scmvf_Y2fgNEoFEAVUDU_rp-f-zxkgOoFQY'
    }
};

function getCountriesPromiseBased() {
    let str = '';
    let countries = [];
    return new Promise(function(resolve, reject) {
        http.request(options)
            .on('error', err => {
                reject(err);
            })
            .on('response', response => {
                response.on('data', chunk => {
                    str += chunk;
                })
                response.on('end', function () {
                    countries = JSON.parse(str);
                    resolve(countries);
                });
            })
            .end();
    })
}

function getCountriesEventBased() {
    let str = '';
    let countries = [];
        http.request(options)
            .on('error', err => {
                emitter.emit('error', err);
            })
            .on('response', response => {
                response.on('data', chunk => {
                    str += chunk;
                })
                response.on('end', function () {
                    countries = JSON.parse(str);
                    emitter.emit('success', countries);
                });
            })
            .end();
        return emitter;
}



module.exports = {getCountriesPromiseBased, getCountriesEventBased};