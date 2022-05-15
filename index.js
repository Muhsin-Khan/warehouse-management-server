const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7yuth.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});


async function run(){
  try{
      await client.connect();
      const productCollection = client.db('DBofTechBhandar').collection('TechBhandar');
      
      app.get('/product', async(req, res)=>{
          const query = {};
          const cursor = productCollection.find(query)
          const products = await cursor.toArray();
          res.send(products);
      });
      
  }
  finally{

  }
}
run().catch(console.dir);


app.get("/", (req, res) => {
  res.send("broh is it..... working??...  yes it is.. ");
});

app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);
  res.send(user);
});

app.post("/users", (req, res) => {
  console.log("requ", req.body);
  const user = req.body;
  user.id = users.length + 1;
  users.push(user);
  res.send(user);
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.listen(port, () => {
  console.log("liten is working...", port);
});
