const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
require("./db/conn");
const bcrypt = require("bcryptjs");


const staticpath = path.join(__dirname, "../public")

// app.use(express.static(staticpath))

app.set("view engine", "hbs")


app.get("/", (req, res) => {
    res.render("index")
});


 
app.post("/login", async (req, res) => {                                        // for login
    try {
        const email = req.body.email;
        const password = req.body.password;
        const useremail = await Register.findOne({ email: email });
        if (useremail.password = password) {
            res.status(201).render("index");
        } else {
            res.send("password are not matching")
        }
    } catch (error) {

        res.status(400).send("invalid Email")
    }
});



const securepassword = async (password) => {
    const passwordhash = await bcrypt.hash(password, 10);
    console.log(passwordhash);

    const passwordcompare = await bcrypt.compare(password, passwordhash);         // used for signing in
    console.log(passwordcompare);

}

securepassword("anshul");



app.listen(port, () => {
    console.log(`server is running at ${port}`);
})