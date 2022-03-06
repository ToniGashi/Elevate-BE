const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2

const oauth2Client = new OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  'https://developers.google.com/oauthplayground'
)

oauth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN
})

const accessToken = new Promise((resolve, reject) => {
  oauth2Client.getAccessToken((err, token) => {
    if (err) {
      console.log(err);
      reject('Failed to create access token :(')
    }
    resolve(token)
  })
})

accessToken.then((accessToken) => {console.log('[DEBUG]: Gmail access token issued!')}).catch((err) => {console.log('[ERROR]: Can not issue gmail access token: ', err)})

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { // TODO: google uses this to override sender email
    type: 'OAuth2',
    user: process.env.GMAIL,
    accessToken,
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN
  },
})

module.exports = transporter
