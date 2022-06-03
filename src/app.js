const express=require("express");
const path=require("path");
const app=express();
const port=process.env.PORT || 3000;
require("./db/conn");


const staticpath=path.join(__dirname,"../public")

app.use(express.static(staticpath))

app.set("view engine" ,"hbs")


app.get("/",(req,res)=>{
    res.render("index")
});



app.listen(port,()=>{
    console.log(`server is running at ${port}`);
})