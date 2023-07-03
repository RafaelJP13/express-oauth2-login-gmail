import express from 'express'
import 'dotenv/config'
import { OAuth2Client } from 'google-auth-library'

const app = express()

const PORT = process.env.PORT || 8000

app.use(express.json())

app.post('/request', async (req, res, next) => {

    res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
    res.header('Referrer-Policy', 'no-referrer-when-downgrade')

    const redirectUrl = 'http://127.0.0.1:3000/oauth'

    const oAuth2Client = new OAuth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        redirectUrl
    )

    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/userinfo.profile openid',
        prompt: 'consent'
    })

    res.json({url:authorizeUrl})

})

const getUserData = async access_token =>{

    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`)
    const data = await response.json()
    console.log(data)
}


app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`)

})