const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const port = process.env.PORT || 5000;

//Middleware 
app.use(cors());
app.use(express.json());//req.body

//Routes
//1. Create a New record by POST method
app.post('/record', async(req,res)=> {
    try {
       const {first_name, last_name,  discipline, fees, status} = req.body;
       const newRecord = await pool.query("INSERT INTO record (first_name, last_name,  discipline, fees, status) VALUES($1, $2, $3, $4, $5) RETURNING *", [first_name, last_name,  discipline, fees, status]);
       res.json(newRecord.rows[0]);
    } catch(err){
        console.log(err);
    }
});

//2. Get a All record by GET method
app.get('/record', async(req,res)=> {
    try{
         const record = await pool.query("SELECT * FROM record");
         res.json(record.rows);
    }catch(err){
        console.log(err);
    }
});

//3. Get just one student record by GET method with params
app.get('/record/:id', async(req,res)=> {
    try{
      const {id}= req.params;
      const recordOne = await pool.query("SELECT * FROM record WHERE s_no = $1", [id]);
      res.json(recordOne.rows);
    }catch(err){
        console.log(err);
    }
})

//4. Edit Just one student record by PUT method with params
app.put('/record/:id', async(req,res)=> {
    try {
      const {id} = req.params;
      const {first_name, last_name,  discipline, fees, status} = req.body;
      const editRecord = await pool.query("UPDATE record SET (first_name, last_name,  discipline, fees, status) = ($1, $2, $3, $4, $5) WHERE s_no = $6", [first_name, last_name,  discipline, fees,status,id]);
      res.json("Edit Record Successfully");
    } catch(err) {
        console.log(err);
    }
})

//5. Delete just one student record by DELETE method with params
app.delete('/record/:id', async(req,res)=> {
    try{
       const {id} = req.params;
       const deleteRecord = await pool.query("DELETE FROM record WHERE s_no = $1",[id]);
       res.json("Delete Record Successfully");
    } catch(err){
        console.log(err);
    }
})
app.listen(port, ()=>{
    console.log(`Server is running on Port: ${port}`);
})
