// if something goes wrong, this middleware will catch the error 
//and log it to a file

const {logEvents} = require('./logger')
const errorHandler = (err,req,res,next) => {
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}${req.headers.orgin}`,'errLog.log')
    console.log(err.stack)
    const status = res.statuscode ? res.statuscode : 500 //server error
    res.status(status)
    res.json({message:err.message})
}

module.exports = errorHandler