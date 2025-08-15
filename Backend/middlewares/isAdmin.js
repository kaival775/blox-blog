const isAdmin = (req, res, next) => {
    try {
        if(req.user && (req.user.role === 1 || req.user.role === 2)){
            next();
        }
        else{
           res.code = 403;
           throw new Error("Permission denied: Admin access required");
        }
    } catch (error) {
        next(error)
    }
}

module.exports = isAdmin;