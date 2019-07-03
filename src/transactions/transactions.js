import { getRequest, HOST } from '../request/request'
import { prepareHeaderForGetTransactions } from '../authorization/authorization'

// get transactions data for user
function getTransactions(userId) {
    return new Promise((resolve, reject) => {
        getRequest(HOST + '/users/' + userId + '/transactions', prepareHeaderForGetTransactions())
            .then(res => {
                console.log('getTransactions success\n')
                processTransactions(res.data.data)
            })
            .catch((error) => {
                console.log('getTransactions error' + error)
                reject(error)
            })
    })
}

function createTransactionObj(transactionData) {
    var trans = {}
    trans.code = transactionData.subClass.code
    trans.title = transactionData.subClass.title
    trans.sum = parseFloat(transactionData.amount)
    trans.count = 1
    trans.avg = 0.0
    return trans
}

function updateTransactionValue(transactionDataObj, trans) {
    trans.count++
    trans.sum += parseFloat(transactionDataObj.amount)
    return trans
}

// analyze transactions data
function processTransactions(transactionData) {
    var transactionMap = {}

    transactionData.forEach(currentTransaction => {
        if (currentTransaction !== undefined && currentTransaction.subClass != null) {
            if (transactionMap[currentTransaction.subClass.code] !== undefined) {
                transactionMap[currentTransaction.subClass.code] = updateTransactionValue(currentTransaction, transactionMap[currentTransaction.subClass.code])
            } else {
                transactionMap[currentTransaction.subClass.code] = createTransactionObj(currentTransaction)
            }
        }
    })

    for (var i in transactionMap) {
        console.log("CODE: " + transactionMap[i].code)
        console.log("TITLE: " + transactionMap[i].title)
        console.log("SUM: " + transactionMap[i].sum)
        console.log("COUNT: " + transactionMap[i].count)
        console.log("AVG: " + transactionMap[i].sum / transactionMap[i].count + "\n")
    }
}

export { getTransactions }