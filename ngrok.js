require('dotenv').config()

const ngrok = require('ngrok')

ngrok.connect({
  proto: 'http',
  addr: process.env.PORT,
  region: 'us'
}, (err, url) => {
  if (err) {
    console.log(`Error creating ngrok ${err}`)
  } else {
    console.log(`
    1. Open https://developer.watsonwork.ibm.com/apps/${process.env.APP_ID}/info 
    2. Add the webhook ${url}/${process.env.APP_ID} to you App
    `)
  }
})
