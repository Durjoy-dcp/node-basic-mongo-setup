const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion } = require('mongodb');
const { ObjectID } = require('bson');
const { query } = require('express');

// middlewares 
app.use(cors())
app.use(express.json())

require('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.9sysdmk.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const serviceCollection = client.db("geniusCar").collection("services")
        app.get('/services', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })
        app.get(`/services/:id`, async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectID(id) }
            const service = await serviceCollection.findOne(query)
            res.send(service)
        })



    }
    finally {

    }

}


run().catch(error => console.error(error))


app.get('/', (req, res) => {
    res.send('genius car server is running ')
})
app.listen(port, () => {
    console.log(`server is running in ${port}`)
})