const uuid = require('node-uuid');

// manageSession and parseCookies
let sessionStore ={};

function parseCookies(req, res, next) {
    /*
    for the incoming request, it checks if it has a header
    called "Cookie". if it has, it should parse the name value
    pairs from the value into a property on the req object called hwCookies
     */
    req.hwCookies = {};
    if (req.get('Cookie')) {
        let cookieData = req.get('Cookie').split(';');
        cookieData.forEach(function (ele) {
            nameValue = ele.trim().split('=');
            req.hwCookies[nameValue[0]] = nameValue[1];
        });
    }
    next();
}

function manageSession(req, res, next) {
    if(req.hwCookies.hasOwnProperty('sessionId') && sessionStore.hasOwnProperty(req.hwCookies['sessionId'])) {
        /*
        the session id exists. then we have to fetch the data from the 'in-memory'
        data structure. then use the data
         */
        const sessionId = req.hwCookies['sessionId'];
        const data = sessionStore[sessionId];
        req.hwSession = data;
        req.hwSession['sessionId'] = sessionId;
        console.log('session already exists:', sessionId);
    } else {
        /*
        the session id does not exist in the cookie which means we have to generate a
        new session id and set the cookie header with the session id with the property
        name "sessionId" and also HttpOnly
         */
        const sesId = uuid.v4();
        sessionStore[sesId] = {};
        const stringCookie = 'sessionId=' + sesId + '; HttpOnly';
        res.append('Set-Cookie', stringCookie);
        req.hwSession = sessionStore[sesId];
        req.hwSession['sessionId'] = sesId;
        console.log('session generated:', sesId);
    }
    next();
}

module.exports = {
    parseCookies:parseCookies,
    manageSession: manageSession,
};
