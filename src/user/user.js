import { postRequest, HOST } from '../request/request'
import { prepareHeaderForUserOrConnection } from '../authorization/authorization'

const USER_URL = 'users'

function prepareBodyForCreateUser() {
    let body = {
        "email": "gavin@hooli.com",
        "mobile": "+61410888666"
    }
    return body
}

function prepareBodyForCreateConnection() {
    let body = {
        "loginId": "gavinBelson",
        "password": "hooli2016",
        "institution": {
            "id": "AU00000"
        }
    }
    return body
}

// request for user creation to get userId
function createUser() {
    return new Promise((resolve, reject) => {
        postRequest(HOST + '/' + USER_URL, prepareHeaderForUserOrConnection(), prepareBodyForCreateUser())
            .then(res => {
                console.log('createUser success')
                resolve(res)
            })
            .catch((error) => {
                console.log('createUser error' + error)
                reject(error)
            })
    })
}

// create connection
function createConnection(userId) {
    return new Promise((resolve, reject) => {
        postRequest(HOST + '/' + USER_URL + '/' + userId + '/connections', prepareHeaderForUserOrConnection(), prepareBodyForCreateConnection())
            .then((res) => {
                console.log('createConnection success. \nWait 1min to create transactions...')
                setTimeout(() => {
                    resolve(res)
                }, 60000)
            })
            .catch((error) => {
                console.log('createConnection error' + error)
                reject(res)
            })
    })
}

export { createUser, createConnection }