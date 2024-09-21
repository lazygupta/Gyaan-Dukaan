const jwt = require('jsonwebtoken')

const userAuth = (req,res,next) => {
    const tokenReceived = req.headers.token;

    if(!tokenReceived) {
        res.status(401).json({
            message: 'No token provided'
        })
    }

    jwt.verify(tokenReceived, process.env.JWT_SECRET , (err,decoded) => {
        if(err) {
            res.status(401).json({
                message: 'Failed to authenticate token'
            })
        }
        req.user = decoded;
        next();
    });
}

