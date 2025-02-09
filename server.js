const express = require("express");
const app = express();
const port = 3000;
const budgetData = require("./budget-data.json");

app.use("/",express.static('public'));

const budget = {
    myBudget: [
    {
        title: "Rent",
        budget: 350
    },
    {
        title: "Groceries",
        budget: 90
    },
    {
        title: "Food",
        budget: 30
    },
]};

app.get("/hello",(req,res)=>{
    res.send("HELLO WORLD! THIS IS SAIDEEPTHI");
})

app.get("/budget",(req,res)=>{
    res.json(budgetData);
})

app.listen(port,()=>{
    console.log(`This personal-budget app is listening at http://localhost:${port}`);
})