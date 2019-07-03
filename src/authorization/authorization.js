import { getRequest, postRequest } from '../request/request'

const HOST = 'https://au-api.basiq.io';
var API_KEY = 'NjE2ZTU5ZGUtMzM1Ni00NDIzLWEzZTItYmVjZWMyMTMxOGZiOjk2YmJmNTU0LTU3NTMtNDgwOC1hODQ2LTczYmFhNGI5NGIwZg==';
var BASIC_API_KEY = 'Basic ' + API_KEY;

const BEARER_TOKEN_URL = HOST + '/token'

var bearerToken = ''

function prepareHeaderForBearerToken() {
    let header = {
        "Authorization": BASIC_API_KEY,
        "Content-Type": "application/x-www-form-urlencoded",
        "basiq-version": "2.0"
    }
    return header
}

function prepareBodyForBearerToken() {
    let body = {
        "grant_type": "client_credentials",
        "scope": "SERVER_ACCESS"
    }
    return body
}

function prepareHeaderForUserOrConnection() {
    let header = {
        "Authorization": bearerToken,
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
    return header
}

function prepareHeaderForGetTransactions() {
    let header = {
        "Authorization": bearerToken,
        "Accept": "application/json"
    }
    return header
}

// get bearer token
function getBearerToken() {
    return new Promise((resolve, reject) => {
        postRequest(BEARER_TOKEN_URL, prepareHeaderForBearerToken(), prepareBodyForBearerToken())
            .then(res => {
                console.log('getBearerToken success ')
                bearerToken = 'Bearer ' + res.data.access_token
                resolve(res)
            })
            .catch((error) => {
                console.log('getBearerToken error ' + error)
                reject(error)
            })
    })
}

export { getBearerToken, prepareHeaderForUserOrConnection, HOST, prepareHeaderForGetTransactions }