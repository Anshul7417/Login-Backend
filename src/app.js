const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
require("./db/conn");
const bcrypt = require("bcryptjs");



const staticpath = path.join(__dirname, "../public")

// app.use(express.static(staticpath))

app.set("view engine", "hbs")


app.get("/", (req, res)=>{
    res.render("index")
});




// create a new user in our database
// app.post(" / register ", async (req, res) => {
//     try {
//         const password = req.body.password;
//         const cpassword = req.body.confirmpassword;
//         if (password == cpassword) {
//             const registerEmployee = new Register({
//                 firstname: req.body.firstname,
//                 lastname: req.body.Lastname,
//                 email: req.body.email,
//                 gender: req.body.gender,
//                 phone: req.body.phone,
//                 age: req.body.age,
//                 password: password,
//                 confirmpassword: cpassword
//             })

                // const token = await registerEmployee.generateAuthToken();
//             const registered = await registerEmployee.save();
//             res.status(201).render(" index ");
//         } else {
//             res.send(" password are not matching ")
//         }
//     }
//     catch (error) {
//         res.status(400).send(error);
//     }
// })



app.post("/login", async (req, res) => {                                        // for login
    try {
        const email = req.body.email;
        const password = req.body.password;
        const useremail = await Register.findOne({ email: email });
        if (useremail.password == password) {
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


//first

const jwt = require("jsonwebtoken");
const { registerPartial } = require("hbs");
const createToken = async () => {
    const token = await jwt.sign({ _id: "dbkey" }, "secretkey",{expiresIn:"2 seconds"});  //token generation
    console.log(token);
    const userver = await jwt.verify(token, "secretkey");
    console.log(userver);    //it returns id and issued at
}
createToken();


//the res.cookie() function is used to set the cookie name to value.the value parameter may be a string or object converted to json

// res.cookie("jwt",token)        //token stored in cookie
// console.log(cookie);

//three parametrs of res.cookie httpOnly-true-client side scripting lang cookies ko cheed nhi skta.Expiration bhi kra skte h

//cookie parser is used to fetch data from cookies
//req.cookies.jwt  //jwt is cookie name


app.get("/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((currElement) => {
            return currElement.token = req.token
        })
        res.clearCookie("jwt");
        await req.user.save();
        res.render("login");
    } catch (error) {
        res.status(500).send(error);
    }
})


app.listen(port, () => {
    console.log(`server is running at ${port}`);
})