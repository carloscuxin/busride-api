import jwt from "express-jwt";
import jwks from "jwks-rsa";

/**
 * Web token valido
 * [17/07/2019] / acuxin 
**/
const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://busride.auth0.com/.well-known/jwks.json'
}),
audience: 'http://busride',
issuer: 'https://busride.auth0.com/',
algorithms: ['RS256']
});

export default jwtCheck;