const BigchainDB = require('bigchaindb-driver')

var http = require('http');
const API_PATH = 'https://test.bigchaindb.com/api/v1/'
const conn = new BigchainDB.Connection(API_PATH, {
        app_id: '6c039f94',
        app_key: '4a8ae105596c4616b974393a3789e1bd'
    })
    
//admin
const alice = new BigchainDB.Ed25519Keypair()
alice.privateKey = "CMBVEg6YtUeFfMtDUwi7v5j6mim8mkmhjyJKZxs9wZLW"
alice.publicKey =  "9KvgML3LAbFji51YBnyJgixy7R4dipnPXXyphMvfwxeU"

//user's to be associated:
//User with read only
const newUser1 = new BigchainDB.Ed25519Keypair()
newUser1.privateKey = "GGMHyb52Hu6CJbnwq6zYenQCExy5FysUCss7APSd7DQP"
newUser1.publicKey =  "J3WWRrVrPpREbYsk4XhtPmR5C4jqGWiA4z8Aa3SS4crB"

//user with Read and transfer permission 
const newUser2 = new BigchainDB.Ed25519Keypair()
newUser2.privateKey = "4JPvqfcKuqhqsocxkixAb3hnQzr9n1mBBEZFzN7GTUAe"
newUser2.publicKey = "CqCxrNKjpLsEJboiqFZG8wF3Aeh2vYosyDDyA4T96Yoi"

/* const newUser3 = new BigchainDB.Ed25519Keypair()
newUser3.privateKey = "CfHkVMRCMRerX4cEMtbYirsTjJ9Xpo63orKgZ5HDC7N5"
newUser3.publicKey = "2q1s91eaymcxNbP1B64FKjy3AhoXiGWw5rXDxyqPrkg8" */



var server = http.createServer(function (req, resp) {
 // Get transaction payload by ID
conn.getTransaction('b31d1bf8067fdcdbc9a81404d99b01f73e6e1c37de3370d89acce8fe451aac95')
   .then((txCreated) => {
        if(txCreated.asset.data.canLink.includes(newUser1.publicKey) || txCreated.asset.data.canTransfer.includes(newUser1.publicKey) || txCreated.asset.data.isAdmin.includes(newUser1.publicKey))
        //user have the permissions to tranfer or user is an admin.
            {
				console.log('id :'+ txCreated.id +', Book Author :'+ txCreated.asset.data.book.name +', Book Author :' + txCreated.asset.data.book.author)
                res.end('id :'+ txCreated.id +', Book Author :'+ txCreated.asset.data.book.name +', Book Author :' + txCreated.asset.data.book.author);
            }
        else res.end("Access Denied");
		     console.log("Access Denied")
        })
}).listen(8000);