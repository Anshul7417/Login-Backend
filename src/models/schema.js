// everything bw two components is middleware.


// tokens:[{
//     token:{
//         type:String,
//         required:true
//     }
// }]

// schema has a function called as pre
const bcrypt = require("bcryptjs")


// generating tokens
employeeSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString()}, "mynameisvinodbahadurthapayoutuber");
        console.log(token);
        this.tokens = this.tokens.concat({token:token})
        return token;
    }
    catch (error) {
        res.send("the error part" + error);
        console.log("the error part" + error);
    }
}

employeeSchema.pre("save", async function (next) {      // it is a function which runs before save and hashes the password
    if (this.isModified("password")) {
        console.log(` the current password is ${this.password}`);
        this.password = await bcrypt.hash(this.password, 10);
        console.log(` the current password is ${this.password}`);
    }
    this.confirmpassword = undefined;            //isey store hi mt kro
    next();
})


// statics are the methods defined on models
// methods are defined on the documents
// use .statics for static methods
// use .methods for instance methods