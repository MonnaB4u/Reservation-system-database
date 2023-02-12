const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_Password}@cluster0.doolq.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`;

const app = express()
app.use(bodyParser.json());
app.use(cors())
const port = process.env.PORT || 5000

console.log(process.env.DB_user + process.env.DB_Password + process.env.DB_Name)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("ReservationSystem");
        const CruisesCollection = database.collection("Cruises");
        const HotelCollection = database.collection("Hotel");
        const AllHotelCollection = database.collection("AllHotel");
        const OrderCollection = database.collection("cursomersOrder");

        // create a document to insert


        /// Add New Cruises

        app.post('/addCruisesr', async (req, res) => {
            const newData = req.body
            const result = await CruisesCollection.insertOne(newData);
            console.log('New user found', req.body)
            console.log('New user added', result)
            res.json(result)
        })


        //////// Get All Cruises and Display

        app.get('/CruisesCollection', async (req, res) => {
            const cruises = CruisesCollection.find({});
            const user = await cruises.toArray();
            const result= user.reverse()
            res.send(result);
        })


        ///// Delete One Cruises
        app.delete('/CruisesCollection/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await CruisesCollection.deleteOne(query);
            console.log('delete user', result)
            res.json(result)
        })

        //////get Spacific Cruises by ID

        app.get('/CruisesCollection/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            users = await CruisesCollection.findOne(query);
            res.send(users)
        })

        /// Add New Hotel
        app.post('/addHotel', async (req, res) => {
            const newData = req.body
            const result = await HotelCollection.insertOne(newData);
            console.log('New user found', req.body)
            console.log('New user added', result)
            res.json(result)
        })

        app.post('/addAllHotel', async (req, res) => {
            const newData = req.body
            const result = await AllHotelCollection.insertOne(newData);
            console.log('New user found', req.body)
            console.log('New user added', result)
            res.json(result)
        })

         app.get('/AllHotelCollection', async (req, res) => {
            const cruises = AllHotelCollection.find({});
            const user = await cruises.toArray();
            const result = user.reverse()
            res.send(result);
        })
        app.get('/AllHotelCollection/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            users = await AllHotelCollection.findOne(query);
            res.send(users)
        })

        //////// Get All Hotel and Display

        app.get('/HotelCollection', async (req, res) => {
            const cruises = HotelCollection.find({});
            const user = await cruises.toArray();
            const result = user.reverse()
            res.send(result);
        })


        ///// Delete One Hotel
        app.delete('/HotelCollection/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await HotelCollection.deleteOne(query);
            console.log('delete user', result)
            res.json(result)
        })

        //////get Spacific Hotel by ID

        app.get('/HotelCollection/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            users = await HotelCollection.findOne(query);
            res.send(users)
        })

        ////Add Order

        app.post('/addOrder', async (req, res) => {
            const newData = req.body
            const result = await OrderCollection.insertOne(newData);
            console.log('New Order found', req.body)
            console.log('New Order added', result)
            res.json(result)
        })
        //// get all order data
        app.get('/OrderCollection', async (req, res) => {
            const cruises = OrderCollection.find({});
            const user = await cruises.toArray();
            const result = user.reverse()
            res.send(result);
        })

        //// get order by email
        app.get("/OrderCollectionbyEmail", async (req, res) => {
            const cursor = OrderCollection.find({
                email: req.query.email,
            });
            res.json(await cursor.toArray());
        });

        ///// Delete One order
        app.delete('/OrderCollection/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await OrderCollection.deleteOne(query);
            console.log('delete user', result)
            res.json(result)
        })
        //// update order

        app.put('/OrderCollection/:id', async (req, res) => {
            const id = req.params.id;
            const UpdateUser = req.body
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    status: UpdateUser.status
                }
            };
            const result = await OrderCollection.updateOne(filter, updateDoc, options);
            res.json(result)
        })




    } finally {
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running Reservation-System Database')
})


app.listen(port, () => {
    console.log("Local Host", port)
})
