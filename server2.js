let express = require("express")
let {MongoClient,ObjectId} = require("mongodb")
/*Cross-origin resource sharing (CORS) allows AJAX requests to skip the Same-origin policy and access resources from remote hosts.*/
var cors = require('cors');

let bodyParser = require("body-parser")
let app = express()
app.use(bodyParser.json())
app.use(cors());

let dbUrl = "mongodb://localhost:27017/"
let dbName ="hackathon"
MongoClient.connect(dbUrl, { useNewUrlParser: true },(err,db)=>{
    if(err) console.log("errorrrrrrrrr : ",err)
    console.log("mongo connected")
    db = db.db(dbName)
/*******************GET ALL CONTACTS ********************/
    app.get("/challenges",(req,result)=>{
        db.collection("challenges").find().toArray((err,res)=>{
            console.log(res)
            result.json(res)
    
        })
    })
/*******************ADD CONTACT **************************/

    app.post("/challenges/add",(req,result)=>{
        console.log(req.body)
        let newContact = req.body;

        db.collection("challenges").insertOne({...newContact},(err,res)=>{
            if(err){
                console.log(err)
                result.json({added:false})    
            }
            console.log(res)
            result.json({_id:res.insertedId})
        })
    })
    
//*********************MODIFY CONTACT**************** */

app.put("/modify/:id",(req,result)=>{
    console.log("body",req.body.email);

    let newContact = req.body;
    db.collection("contacts").findOneAndUpdate({_id:ObjectId(req.params.id)},{$set:{...newContact}},
    (err,res)=>{
        if(err){
            console.log(err)
            result.json({updated:false})    
        }
        else{
        console.log("updated")
        result.json(res)}
    })
})

//**********************************DELETE CONTACT ******************************** */
app.delete("/delete/:id",(req,result)=>{

    db.collection("contacts").findOneAndDelete({_id:ObjectId(req.params.id)},(err,res)=>{
        if(err) result.json({deleted:false})
        else result.json(res)
    })



})




})

app.listen(8888,(err)=>{
    if(err) console.log(err)
    console.log("server is running 8888")
})