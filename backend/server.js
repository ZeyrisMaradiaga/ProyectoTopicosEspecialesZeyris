const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./subtracker.db");

db.run(`CREATE TABLE IF NOT EXISTS subscriptions(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 name TEXT,
 price REAL,
 currency TEXT,
 frequency TEXT,
 pay_date TEXT
)`);

app.get("/subscriptions", (req,res)=>{
 db.all("SELECT * FROM subscriptions",[],(e,rows)=>{
   res.json(rows);
 });
});

app.post("/subscriptions",(req,res)=>{
 const {name,price,currency,frequency,pay_date}=req.body;
 db.run(`INSERT INTO subscriptions(name,price,currency,frequency,pay_date) VALUES(?,?,?,?,?)`,
 [name,price,currency,frequency,pay_date],
 function(err){ res.json({id:this.lastID}); });
});

app.put("/subscriptions/:id",(req,res)=>{
 const {name,price,currency,frequency,pay_date}=req.body;
 db.run(`UPDATE subscriptions SET name=?,price=?,currency=?,frequency=?,pay_date=? WHERE id=?`,
 [name,price,currency,frequency,pay_date,req.params.id],
 ()=>res.json({ok:true}));
});

app.delete("/subscriptions/:id",(req,res)=>{
 db.run(`DELETE FROM subscriptions WHERE id=?`, [req.params.id], ()=>res.json({ok:true}));
});

app.listen(3000,()=>console.log("API corriendo en http://localhost:3000"));
