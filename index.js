const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { query } = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7yuth.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const productCollection = client
      .db("DBofTechBhandar")
      .collection("TechBhandar");

    app.get("/product", async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query);
      const products = await cursor.toArray();
      res.send(products);
    });
    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const product = await productCollection.findOne(query);
      res.send(product);
    });
    
    //Post (Adding New product)
    app.post("/product", async (req, res) => {
      const newProduct = req.body;
      const result = await productCollection.insertOne(newProduct);
      res.send(result);
    });

    // Deleting the product
    app.delete('/product/:id', async (req, res) =>{
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
      const result = await productCollection.deleteOne(query);
      res.send(result);
    })
    // Updating a product or item
    app.put('/product/:id',async(req,res)=>{
      const id=req.params.id;
      const updateditem=req.body;
      const query = {_id:ObjectId(id)};
      const options = {upsert:true};
      const newitem={
        $set: {
         quantity:updateditem.quaNtity
        }
      };
      const update=await productCollection.updateOne(query,newitem,options);
      res.send(update);
    });
    
    
  } 
  finally {
  }
}
run().catch(console.dir);




app.get("/", (req, res) => {
  res.send("broh is it.... working??...  yes it is.. ");
});


app.listen(port, () => {
  console.log("liten is working...", port);
});
