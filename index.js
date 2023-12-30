import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js" ///DAO stands for data access object BTW. basically a common pattern that with working with databases n stuff
import dotenv from 'dotenv';
dotenv.config();


const MongoClient = mongodb.MongoClient

const mongo_username = process.env.MONGO_USERNAME;
const mongo_password = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.gqsbvmg.mongodb.net/`
const port = 8000

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        serverSelectionTimeoutMS: 2500,
        useNewUrlParser: true
    })
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        await ReviewsDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`listening on port ${port} BOIIIIIIIII`)
        })
    })