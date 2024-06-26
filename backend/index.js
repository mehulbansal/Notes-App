const express = require("express")
const connectToMongo = require("./db");
var cors = require('cors')
connectToMongo();

const app = express()
app.use(express.json());
app.use(cors())
const port = 5000

//Available Routes
app.use("/api/auth", require('./routes/auth'));
app.use("/api/notes", require('./routes/notes'));

app.listen(port, () => {
  console.log(`Note Networks listening on port http://localhost:${port}`)
})