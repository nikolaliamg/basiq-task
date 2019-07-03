import { getBearerToken } from './authorization/authorization';
import { createUser, createConnection } from './user/user'
import { getTransactions } from './transactions/transactions'

var userId = ''

function getAndProcessTransactions() {
    getTransactions(userId).then((res) => {
        console.log('TRANSACTIONS PROCESSED')
    }).catch((err) => {
        console.log('GETTING TRANSACTIONS FAILED ' + err)
        process.exit()
    })
}

function createUserConnection() {
    createConnection(userId).then((res) => {
        console.log('CONNECTIONS CREATED')
        getAndProcessTransactions()
    }).catch((err) => {
        console.log('CONNECTION CREATION FAILED ' + err)
        process.exit()
    })
}

function userCreation() {
    createUser().then((res) => {
        console.log('USER CREATED')
        userId = res.data.id
        console.log('USERID: '+userId)
        createUserConnection()
    }).catch((err) => {
        console.log('ERROR WHILE CREATING USER ' + err)
        console.log('SHUTTING DOWN')
        process.exit()
    })
}

// get bearer token
getBearerToken().then((res) => {
    console.log('BEARER TOKEN SUCCESSFULLY RECEIVED')
    userCreation()
}).catch((err) => {
    console.log('ERROR WHILE GETTING BEARER TOKEN')
    console.log('SHUTTING DOWN...')
    process.exit()
})

