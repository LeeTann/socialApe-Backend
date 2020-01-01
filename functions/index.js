const functions = require('firebase-functions');

const app = require('express')()

const FBAuth = require('./utils/fbAuth')

const { getAllScreams, postOneScream } = require('./handlers/screams')
const { signup, login } = require('./handlers/users')

// Get all screams
app.get('/screams', getAllScreams)
// Post a scream
app.post('/scream', FBAuth, postOneScream)
// Signup Route
app.post('/signup', signup)
// Login Route
app.post('/login', login)

exports.api = functions.https.onRequest(app)