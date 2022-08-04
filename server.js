const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");



const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.post("/", (req, res) =>{

  const email = req.body.email

  const msg = {
      to: email,
      from: 'cnagar403@gmail.com',
      //from: 'cnagar@deakin.edu.au',
      subject: 'Sending with Twilio SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };

  sgMail
  .send(msg)
  .then((response) => {
    console.log(response[0].statusCode)
    console.log(response[0].headers)
  })
  .catch((error) => {
    console.error(error)
  })

  res.send("I am posting now")

})

app.listen(3000, function (request, response){
    console.log("server is running on port 3000")
})