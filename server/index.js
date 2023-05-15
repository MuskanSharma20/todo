const express = require('express')
const app = express();
const mongoose = require("mongoose")
const cors = require('cors');
const port = process.env.PORT||5001
const bodyParser = require('body-parser');
require("dotenv").config();


const todoRouter =require('./routes/todoItemRoutes')



app.use(express.json());
app.use(cors());  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true } ));
app.use('/api',todoRouter)   

app.get("/",(req,res)=>{
    res.send("hi");
    
    });
    


    mongoose.connect(
       `mongodb+srv://${process.env.dbusername}:${process.env.dbpassword}@cluster.6etl97r.mongodb.net/mernStack?retryWrites=true&w=majority`
        ).then(()=>{
          app.listen(port, () => {
            console.log(`conecting to mongodb ${port}`);
          });
          
      }).catch((error)=>{
        console.log(error) 
      }) 
      