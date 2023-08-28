const {MongoClient} =require("mongodb");

const client = new MongoClient(`mongodb+srv://cherry_25:${process.env.MONGO_PASS}@cluster0.ehbfxox.mongodb.net/primenode`,

{useUnifiedTopology:true},
{useNewUrlPasrer:true},
{connectTimeoutMs:30000},
{keepAlive:1}

);
const db =client.db();


const user=db.collection("user");
const token= db.collection("token");

const Movies = db.collection("Movies");
const tvShows = db.collection("tvShows");
const top10 = db.collection("top10");
const upComing = db.collection("upComing");
const Aoriginals = db.collection("Aoriginals");
const kDrama= db.collection("kDrama");

const wishList = db.collection("wishList")



module.exports={user,Movies,tvShows,top10,upComing,Aoriginals,kDrama, token,  wishList}


