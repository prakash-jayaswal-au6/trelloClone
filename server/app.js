const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const http = require('http')
var cors = require('cors')
const app = express();
dotenv.config();
require("./config/db")

app.use(cors())

const port = process.env.PORT || 4400
const server = http.createServer(app)


const userRoutes = require('./routes/user')
const taskRoutes = require('./routes/task')

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));



app.use(userRoutes)
app.use(taskRoutes);


if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}


server.listen(port,()=>
    console.log(`server is running on port no : ${port}`)
)
