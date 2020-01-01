const functions = require('firebase-functions');
const admin = require('firebase-admin')
const app = require('express')()

admin.initializeApp()

const firebaseConfig = {
    apiKey: "AIzaSyCT5fIl1KoO9YRrMGW5O8kFxSlN20GDI1g",
    authDomain: "socialape-3e674.firebaseapp.com",
    databaseURL: "https://socialape-3e674.firebaseio.com",
    projectId: "socialape-3e674",
    storageBucket: "socialape-3e674.appspot.com",
    messagingSenderId: "19995462488",
    appId: "1:19995462488:web:789822fb995ecf3ede732d",
    measurementId: "G-YRPS21S0V9"
}

const firebase = require('firebase')
firebase.initializeApp(firebaseConfig)

const db = admin.firestore()

// Get all screams
app.get('/screams', (req, res) => {
    db.firestore().collection('screams')
        .orderBy('createdAt', 'desc')        
        .get()
        .then(data => {
            let screams = []
            data.forEach(doc => {
                screams.push({
                    screamId: doc.id,
                    // body: doc.data().body,
                    // userHandle: doc.data().userHandle,
                    // createdAt: doc.data().createdAt,
                    ...doc.data()
                })
            })
            return res.json(screams)
        })
        .catch(err => console.error(err))
})

// Post a scream
app.post('/scream', (req, res) => {

    const newScream = {
        body: req.body.body,
        userHandle: req.body.userHandle,
        createdAt: new Date().toISOString()
    }

    db.firestore().collection('screams')
        .add(newScream)
        .then((doc) => {
            res.json({ message: `document ${doc.id} created successfully` })
        })
        .catch(err => {
            res.status(500).json({ error: 'server error - something went wrong' })
            console.log(err)
        })
})

// Signup route
app.post('/signup', (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword,
        handle: req.body.handle
    }

    // TODO validate data
    let token, userId
    db.doc(`/users/${newUser.handle}`).get()
        .then(doc => {
            if(doc.exists) {
                return res.status(400).json({ handle: 'This handle is already taken' })
            } else {
                return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
            }
        })
        .then(data => {
            userId = data.user.uid
            return data.user.getIdToken()
        })
        .then(tokenId => {
            token = tokenId
            const userCredentials = {
                handle: newUser.handle,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                userId: userId
            }
            return db.doc(`/users/${newUser.handle}`).set(userCredentials)
        })
        .then(() => {
            return res.status(201).json({ token })
        })
        .catch(err => {
            console.log(err)
            if(err.code === 'auth/email-already-in-use') {
                return res.status(400).json({ email: 'Email is already in use'})
            } else {
                return res.status(500).json({ error: err.code })  
            }      
        })
})

exports.api = functions.https.onRequest(app)