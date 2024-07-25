const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    console.log('Authorization header:', authHeader); // Added log
    const token = authHeader ; 
    console.log('Token:', token); // Added log

    if (!token ) {
        return res.status(401).json({ success: 401, message: "Unauthorized user" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error("Token verification error:", err);
            return res.status(403).json({ success: 403, message: "Session expired, try again later" });
        }
        req.userId = user.userId;
       
        next();
    });
}

module.exports = {
    authenticateToken,
};
