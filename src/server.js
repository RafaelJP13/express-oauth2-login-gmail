import express from 'express'
import 'dotenv/config'
import { OAuth2Client } from 'google-auth-library'

const app = express()

const PORT = process.env.PORT || 8000

app.use(express.json())

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`)

})