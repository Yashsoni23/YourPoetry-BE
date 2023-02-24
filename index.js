const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors =  require("cors");
const App = require("./src/app") 
const port = 5000;

app.use(express.json());
app.use(cors({origin: "*"}));

app.use(bodyParser.urlencoded({extended: false }));

app.listen(port,()=>{
    console.log(`Server listening on ${port}`);
})
app.use(App);

app.get("/",(req,res)=>{
    res.send("Welcome to API World")
})