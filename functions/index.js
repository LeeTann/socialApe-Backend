const functions = require('firebase-functions');
const app = require('express')()

const FBAuth = require('./utils/fbAuth')

const cors = require('cors')
app.use(cors())

const { getAllScreams, postOneScream } = require('./handlers/screams')
const { signup, login, uploadImage, addUserDetails} = require('./handlers/users')


// Get all screams
app.get('/screams', getAllScreams)
// Post a scream
app.post('/scream', FBAuth, postOneScream)
// Signup Route
app.post('/signup', signup)
// Login Route
app.post('/login', login)
// Upload Image Route
app.post('/user/image', FBAuth, uploadImage)

app.post('/user', FBAuth, addUserDetails)

exports.api = functions.region('us-central1').https.onRequest(app)