import axios from 'axios'

const HOST = 'https://au-api.basiq.io';

function getRequest(url, header) {
    return new Promise((resolve, reject) => {
        axios.get(url, { headers: header }).then(res => {
            resolve(res)
        }).catch(error => {
            console.log(error)
            reject(error)
        })
    })
}

function postRequest(url, header, body) {
    return new Promise((resolve, reject) => {
        axios.post(url, body, { headers: header }).then(res => {
            resolve(res)
        }).catch(error => {
            console.log(error)
            reject(error)
        })
    })
}

export { getRequest, postRequest, HOST }