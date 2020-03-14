
const middleware = {
  isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next()
    }
    return res.status(400).json({"statusCode" : 400, "message" : "not authenticated"})
},
  isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next()
    }
    return res.status(400).json({"statusCode" : 400, "message" : "not authenticated"})
}


}



module.exports = middleware;
