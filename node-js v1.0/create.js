const BigchainDB = require('bigchaindb-driver')
var http = require('http')

const API_PATH = 'https://test.bigchaindb.com/api/v1/'
const conn = new BigchainDB.Connection(API_PATH, {
        app_id: '6c039f94',
        app_key: '4a8ae105596c4616b974393a3789e1bd'
    })
	
	
//User creation 
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


//Asset creation
const book = {
    name: 'Lolita',
    author: 'Vladimir Nabokov',
    place: 'New York',
    year: '1996',
	pages: '554'
}


//Roles creation
const isAdmin = [alice.publicKey] //Admin
const canLink = [newUser1.publicKey] //user1 and user2 can see.
const canTransfer = [newUser1.publicKey, newUser2.publicKey] //user2 can tranfer.
const canBurn = [] //user who can burn

var server = http.createServer(function (req, resp) {
const txCreatePaint = BigchainDB.Transaction.makeCreateTransaction(
        // Asset field
        {
           book, // Main Asset
		   isAdmin, //admin public key
		   canLink, //user can see with there public key
		   canTransfer, //User with public key who can transfer 
		   canBurn, //User who can burn the asset.
        },
        // Metadata field, contains information about the transaction itself
        // (can be `null` if not needed)
        {
            datetime: new Date().toString(),
            value: {
                value_eur: '250€',
                value_Avialble: '70',
            }
        },
        // Output. For this case we create a simple Ed25519 condition
        [BigchainDB.Transaction.makeOutput(
            BigchainDB.Transaction.makeEd25519Condition(alice.publicKey))],
        // Issuers
        alice.publicKey
    )
    // The owner of the Book signs the transaction
    const txSigned = BigchainDB.Transaction.signTransaction(txCreatePaint,
        alice.privateKey)

    // Send the transaction off to BigchainDB
    conn.postTransaction(txSigned)
        // Check the status of the transaction
        .then(() => conn.pollStatusAndFetchTransaction(txSigned.id))
        .then(res => {
          // console.log(txSigned)
           console.log(res.id);
		   res.end(res.id);
            // txSigned.id corresponds to the asset id of the Book
        })
        }).listen(8080);
        