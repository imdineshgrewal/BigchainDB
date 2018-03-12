const BigchainDB = require('bigchaindb-driver')

var http = require('http');
const API_PATH = 'https://test.bigchaindb.com/api/v1/'
const conn = new BigchainDB.Connection(API_PATH, {
        app_id: '6c039f94',
        app_key: '4a8ae105596c4616b974393a3789e1bd'
    })
    
const alice = new BigchainDB.Ed25519Keypair()
alice.privateKey= 'FTYPpRhRxDDxHQ43ngvJaZJRK8PfBKLsHrgYmCvsDhXr',
alice.publicKey= '2Lb9FcjmGFraiT8oDacTFRY3Qw96x68SY7cpwQndTnrm'
//console.log(alice)
const newUser = new BigchainDB.Ed25519Keypair()
newUser.privateKey= 'BurnBurnBurnBurnBurnBurnBurnBurnBurnBurnBurn',
newUser.publicKey= 'BurnBurnBurnBurnBurnBurnBurnBurnBurnBurnBurn'


var server = http.createServer(function (req, resp) {
 // Get transaction payload by ID
conn.getTransaction('988dc8bc097aab8cd628a881e637bd562a6f3a460ee78eb70335704704a6be95')
        .then((txCreated) => {
			if(res.asset.data.canTransfer.includes(newUser2.publicKey) || res.asset.data.isAdmin.includes(alice.publicKey)) //user have the permissions to tranfer or user is an admin.
            {
            const createTranfer = BigchainDB.Transaction.makeTransferTransaction(
                // The output index 0 is the one that is being spent
                [{
                    tx: txCreated,
                    output_index: 0
                }],
                [BigchainDB.Transaction.makeOutput(BigchainDB.Transaction.makeEd25519Condition(newUser.publicKey))],
                {
                    datetime: new Date().toString(),
					value: {
                        value_eur: 'burn',
						value_Avialble: 'burn',
                    }
                }
            )
            console.log("abc0")
            // Sign with the key of the owner of the painting (Alice)
            const signedTransfer = BigchainDB.Transaction.signTransaction(createTranfer, alice.privateKey)
			console.log(signedTransfer.id)
            return conn.postTransaction(signedTransfer)
			}
        })
        /* .then((signedTransfer) => conn.pollStatusAndFetchTransaction(signedTransfer.id))
        .then(res => {
			console.log(res.id)
           resp.end(res.id)
        }) */
		
			}).listen(8080);