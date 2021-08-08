const { AuthenticationError } = require('apollo-server');

const jwt = require('jsonwebtoken');
//TODO: check how to use this: import jwksClient from 'jwks-rsa';

module.exports = (context) => {
    const authHeader = context.req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split('Bearer ')[1];
        if (token) {
            try {
                return jwt.verify(token, process.env.JWT_SECRET);
            } catch (err) {
                throw new AuthenticationError('Invalid/Expired token');
            }
        }
        throw new Error("Authentication token must be 'Bearer [token]");
    }
    throw new Error('Authorization header must be provided');
};
