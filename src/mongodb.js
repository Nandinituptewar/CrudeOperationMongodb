const { response } = require('express')
const express = require('express')
const MongoClient=require('mongodb').MongoClient

const app = express()
app.use(express.json())
let database

app.get('/', (req, res) => {
    res.send("You can do any operation")
})

app.get('/read_data', (req, res) => {
    database.collection('products_data').find({}).toArray((err,result)=>{
        if(err) throw err
        res.send(result)
    })
})

app.post('/insert_data', (req, res) => {
    let result= database.collection('products_data').find({}).sort({id:-1}).limit(1)
    result.forEach(obj => {
        if(obj){
            let device = {
                product: req.body.product,
                price : req.body.price
            }
            database.collection('products_data').insertOne(device, (err,result) =>{
                if(err)res.status(500).send(err)
                res.send("added successfully")
            })
    }
    });
})

app.put('/update_data/:product', (req, res) => {
        let querry = {product: req.params.product}
        let device1 = {
            product: req.body.product,
            price : req.body.price
        }
        let dataset ={
            $set: device1
        }
        database.collection('products_data').updateOne(querry,dataset,(err,result)=>{
            if(err) throw err 
            res.send(device1)
        })
})

app.delete('/delete_data/:product', (req,res) =>{
    database.collection('products_data').deleteOne({product:req.params.product},(err,result) =>{
            if(err) throw err 
            res.send("deleted record")
    })

})

app.listen(8000, () => {
        MongoClient.connect("mongodb://localhost:27017",{useNewUrlParser:true},(error,result) =>{
            if(error) {throw error}
            database=result.db('products')
            console.log("connection succesfull")
        })
})
