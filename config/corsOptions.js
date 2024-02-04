//this fetches the allowedOrigins array from the allowedOrigins.js file
// and checks if the origin is in the array or not. If it is, it allows the request,
// otherwise it throws an error.
// This is then used in the cors middleware(data passer from frontent to backend) in the app.js file.

const allowedOrigins= require('./allowedOrigins');

const corsOptions = {
    origin:(origin,callback)=>{
        if(allowedOrigins.indexOf(origin) !== -1 || !origin){
            callback(null,true)
        }else{
            callback(new Error('Not allowed by CORS'))
        }
    },
    Credentials:true,
    optionsSuccessStatus:200
}

module.exports = corsOptions;