const jwt = require('jsonwebtoken');
const JWT_SECRET = "MehulBansalHello&Yellow";

const fetchUser = (req, res, next) =>{
    // Get the User from the JWT token and add ID to to the request.
    const token = req.header('token');
    if(!token){
        res.status(401).send({error: "Access Denied"});
    }
    try{
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    }
    catch(error){
        res.status(401).send({error: "Access Denied"});
    }
    
}

module.exports = fetchUser;