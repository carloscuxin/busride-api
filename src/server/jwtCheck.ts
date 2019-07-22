import jwt from "express-jwt";

/**
 * Web token valido
 * [17/07/2019] / acuxin 
**/
const jwtCheck = jwt({
secret: "NEMzQkU3RUVGQ0NCMEQwRDA4OEZDMTkyMTkxMjA0MDFCRTJEMDU2Mw",
audience: 'http://busride',
issuer: 'https://busride.auth0.com/',
algorithms: ['RS256']
});

export default jwtCheck;