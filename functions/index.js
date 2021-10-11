//example endpoint
//http://localhost:5001/challenge-efd56/us-central1/api



const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51Ji3SnBUY2FILOIPKgtRISZBWLQskoy6rCYckzE3dsCa72zDO1I4tJJMeL3lbzfUvms7G0wrW9A76yDkJ6YYxDnT00ORyqpfrh");

//API Setup
//App config
const app = express();

//Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

//API routes
app.get('/chicken', (req, res)=> res.status(200).send("Here in Chicken world "));
app.post('/payments/create', async (req, res) => {
    const total = req.query.total;

    console.log("BACKEND:Payment request received... for this amount >>>", total)
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,  //currency subunit
        currency: "usd"
    });
    //Ok-creaed
    res.status(201).send({
        clientSecret: paymentIntent.client_secret
    })
})

//Listen command
exports.api = functions.https.onRequest(app)
















// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
