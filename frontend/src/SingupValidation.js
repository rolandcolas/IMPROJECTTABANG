function Validation (values){
    alert("")
    let error = {}
    const email_patteren = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
   
 
    
     if (!email_patteren.test(values.email)){
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

    if (values.ID ==="") {
        error.ID = "ID should not be empty"
    }
    else   {
        error.ID = ""
    }


    if (values.firstName ==="") {
        error.firstName = "First Name should not be empty"
    }
    else   {
        error.firstName = ""
    }

    if (values.lastName ==="") {
        error.lastName = "Last Name should not be empty"
    }
    else   {
        error.lastName = ""
    }

    if (values.yearLevel ==="") {
        error.yearLevel = "Year Level should not be empty"
    }
    else   {
        error.yearLevel = ""
    }

    
    return error;
    
    
    }
    
    export default Validation;