const express = require('express')
const app = express()
let users = []

app.use(express.json())
//get,post,delete,put

app.get('/',(req,res)=>{
    res.send(users)
})
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