
const login = {
    tags:["Authentication"],
    description:"authentication message",
    responses:{
        201:{
            description: "OK",
        },
        404:{
            description: "NOTFOUND",
        }
    }
}

const register = {
    tags:["Authentication"],
    description:"authentication message",
    responses:{
        201:{
            description: "OK",
        },
        404:{
            description: "NOTFOUND",
        }
    }
}
        
const authenticationRouteDocs= {
    "/authentication/login":{
        post:login,
     },
    "/authentication/register":{
        post:register,
     },
}

export default authenticationRouteDocs