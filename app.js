const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const mysql = require("mysql");

const app = express()
let users = []

app.use(express.json())
//get,post,delete,put

app.get("/", async (req, res) => {
    res.json({ status: "makanan hallo"});
});


app.get('/:makanan', async(req, res) =>{
    const query = "SELECT * FROM makanan WHERE id = ?";
    pool.query(query, [ req.params.makanan ], (error, result) => {
        if (!result[0]){
            res.json({ status: "Not Found" });
        }else{
            res.json(result[0]);
        }
    });
});

const pool =mysql.createPool({
    user: process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
    socketPath: '/cloudsql/${process.env.INTANCE_CONNECTION_NAME}',
});


app.post('/',(req,res)=>{
   const data = req.body
   users = [...users,data]
   res.send('user created')
})
app.delete('/:name?',(req,res)=>{
   const params = req.params.name
   let deleteUser = users.filter(val => val.name!==params)
   users = deleteUser
   res.send(users)
 })
 app.put('/',(req,res)=>{
    const data = req.body
    users.map(val =>{
        if(val.vitamin===data.vitamin) val.name= data.name
    })
    res.send(users)
    
 })
app.listen(4000,()=>{
    console.log('server is running on port 4000')
})