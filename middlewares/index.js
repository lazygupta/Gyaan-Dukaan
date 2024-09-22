const jwt = require('jsonwebtoken');
const user = require('../routes/user');

const userAuth = (req,res,next) => {
    const tokenReceived = req.headers.token;

    if(!tokenReceived) {
        res.status(401).json({
            message: 'No token provided'
        })
    }

    jwt.verify(tokenReceived, process.env.JWT_USER_SECRET , (err,decoded) => {
        if(err) {
            res.status(401).json({
                message: 'Failed to authenticate token'
            })
        }
        req.userId = decoded.id;
        next();
    });
}

const adminAuth = (req,res,next) => {
    const tokenReceived = req.headers.token;

    if(!tokenReceived) {
        res.status(401).json({
            message: 'No token provided'
        })
    }

    jwt.verify(tokenReceived, process.env.JWT_ADMIN_SECRET , (err,decoded) => {
        if(err) {
            res.status(401).json({
                message: 'Failed to authenticate token'
            })
        }
        req.adminId = decoded.id;
        next();
    });
}

module.exports = {
    userAuth,
    adminAuth
};