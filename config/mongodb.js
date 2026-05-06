import { MongoClient } from "mongodb";

// const url =
// "mongodb://sagrawal3446_db_user:Pk5MWzX81ytBM6N5@ac-gmogvlo-shard-00-00.7zh7u1l.mongodb.net:27017,ac-gmogvlo-shard-00-01.7zh7u1l.mongodb.net:27017,ac-gmogvlo-shard-00-02.7zh7u1l.mongodb.net:27017/?ssl=true&replicaSet=atlas-vg03uc-shard-0&authSource=admin&appName=Cluster0"
let client;
export const connectToMongoDB = async () => {
  try {
    await MongoClient.connect(process.env.MONGO_URL) //.env url
    .then(clientInstance => {
        client = clientInstance
        // using this client we can access there database
        client
    console.log("Connected to MongoDB");

    })
  } catch (err) {
    console.log(err);

  }
};

//perform opertaion in db use thi getDB function
export const getDB= ()=> {
    return client.db();

}
// export default connectToMongoDB;