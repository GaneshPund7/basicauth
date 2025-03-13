const {MongoClient } = require('mongodb');

const url = process.env.MONOGOURL

const client = new MongoClient(url);

async function connectToDatabase() {

   try{
    await client.connect();
    console.log("Database Connected Successfully...");
   }catch(error){
    console.log(error.message);
   }
    
}
module.exports = { connectToDatabase };