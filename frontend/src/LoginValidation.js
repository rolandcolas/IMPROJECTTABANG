function Validation (values){
alert("")
let error = {}
const email_patteren = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

if (values.email.length === 0){
    error.email = "Email should not be empty"
}
else if (!email_patteren.test(values.email)){
    error.email  = "Email didn't match"
}
else {
    error.email = ""
}

if(values.password === ""){
    error.password = "Password should not be empty"
}

else{
    error.password = ""
}

return error;


}

export default Validation;