// @desc Logs request to console
const logger=(req, res, next)=>{
    console.log("Middleware is run");
    next();
}

module.exports=logger;