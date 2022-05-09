const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// user:dbuser1
// password:8nhcXqA2BgmOymay

const uri =
  "mongodb+srv://dbuser1:8nhcXqA2BgmOymay@cluster0.7yuth.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run(){
  try{
      await client.connect();
      const userCollection = client.db('foodExpress').collection('users');
      const user = {name: 'Somebody', email: 'Somebody@gamil.com'};
      const result = await userCollection.insertOne(user);
      console.log(`User inserted with id: ${result.insertedId}`)
  }
  finally{

  }
}
run().catch(console.dir);
const users = [
  { id: 1, name: "karim", email: "omuktomuk@gmail.com", age: 24 },
  { id: 2, name: "junayed", email: "omuktomuk@gmail.com", age: 24 },
  { id: 3, name: "junayed", email: "omuktomuk@gmail.com", age: 24 },
  { id: 4, name: "javed", email: "omuktomuk@gmail.com", age: 24 },
  { id: 5, name: "junayed", email: "omuktomuk@gmail.com", age: 24 },
  { id: 6, name: "junayed", email: "omuktomuk@gmail.com", age: 24 },
];

app.get("/", (req, res) => {
  res.send("okk broh it is working??...!");
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
