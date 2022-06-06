// everything bw two components is middleware.

// schema has a function called as pre
const bcrypt=require("bcryptjs")


employeeSchema.pre ( "save" , async function (next) {      // it is a function which runs before save and hashes the password
    if ( this.isModified ( "password" ) ) {
    console.log ( ` the current password is ${this.password}`) ;
    this.password = await bcrypt.hash ( this.password , 10 ) ;
    console.log ( ` the current password is ${this.password}` ) ;
    }
    this.confirmpassword=undefined;            //isey store hi mt kro
    next() ;
    } )