const {jwtsecret} = require('../configs/keys');
const jwt = require('jsonwebtoken');
const isAuth = (req, res, next) => {
    try {
        console.log(req.header)
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            res.code = 401;
            throw new Error("Unauthorized");
        }
        const decoded = jwt.verify(token, jwtsecret);
        if(decoded){
            req.user = {
                _id: decoded._id,
                email: decoded.email,
                name: decoded.name,
                role: decoded.role,
            };
            next();
           
        }
        else{
            res.code = 401;
            throw new Error("Unauthorized");
        }
    } catch (error) {
        next(error)
    }
}

module.exports =  isAuth; 