const BigchainDB = require('bigchaindb-driver')

var http = require('http');
const API_PATH = 'https://test.bigchaindb.com/api/v1/'
const conn = new BigchainDB.Connection(API_PATH, {
        app_id: '6c039f94',
        app_key: '4a8ae105596c4616b974393a3789e1bd'
    })
    
const alice = new BigchainDB.Ed25519Keypair()
alice.privateKey = "CMBVEg6YtUeFfMtDUwi7v5j6mim8mkmhjyJKZxs9wZLW"
alice.publicKey =  "9KvgML3LAbFji51YBnyJgixy7R4dipnPXXyphMvfwxeU" 

const newUser1 = new BigchainDB.Ed25519Keypair()
newUser1.privateKey = "GGMHyb52Hu6CJbnwq6zYenQCExy5FysUCss7APSd7DQP"
newUser1.publicKey =  "J3WWRrVrPpREbYsk4XhtPmR5C4jqGWiA4z8Aa3SS4crB" 

//new key for new user
const newUser4 = new BigchainDB.Ed25519Keypair()
newUser4.privateKey = "FTYPpRhRxDDxHQ43ngvJaZJRK8PfBKLsHrgYmCvsDhXr"
newUser4.publicKey  = "2Lb9FcjmGFraiT8oDacTFRY3Qw96x68SY7cpwQndTnrm"

var server = http.createServer(function (req, resp) {
 // Get transaction payload by ID
conn.getTransaction('ce3f6131ea331da784c7efbc78c37b20ae6132c1fbc339f6079d9c19794dd77d')
 
        .then((txCreated) => {
			if(res.asset.data.canTransfer.includes(newUser2.publicKey) || res.asset.data.isAdmin.includes(alice.publicKey)) //user have the permissions to tranfer or user is an admin.
            {
            if(res.outputs.public_keys == newUser2.publicKey) //is user is the admin to the asset?
            {
            const createTranfer = BigchainDB.Transaction.makeTransferTransaction(
                // The output index 0 is the one that is being spent
                [{
                    tx: txCreated,
                    output_index: 0
                }],
                [BigchainDB.Transaction.makeOutput(BigchainDB.Transaction.makeEd25519Condition(newUser1.publicKey))],
                {
                    datetime: new Date().toString(),
                    value: {
                        value_eur: '270€',
						value_Avialble: '70',
                    }
                }
            )
            // Sign with the key of the owner of the painting (Alice)
            const signedTransfer = BigchainDB.Transaction.signTransaction(createTranfer, alice.privateKey)
			console.log(signedTransfer.id)
            return conn.postTransaction(signedTransfer)
			console.log("Done!!")
            }
            console.log("You are not the owner!!!")
            }
            else {
            console.log("Access denied")
            }
        })
		
			}).listen(7000);