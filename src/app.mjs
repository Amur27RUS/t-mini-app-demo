import express from 'express';
import session from 'express-session';
import openid from 'openid';

const app = express();


app.use(session({
    secret: process.env.STEAM_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Включите `secure: true` в продакшене, если используете HTTPS
}));

const relyingParty = new openid.RelyingParty(
    'http://localhost:3000/auth/steam/callback', // Redirect URL
    'http://localhost:3000',                     // Realm (site URL)
    true,                                        // Use stateless verification
    true,                                        // Strict mode
    []                                           // List of extensions
);

// Маршрут для инициации авторизации через Steam
app.get('/auth/steam', (req, res, next) => {
    relyingParty.authenticate('https://steamcommunity.com/openid', false, (error, authUrl) => {
        if (error) {
            next(error);
        } else if (!authUrl) {
            res.send('Authentication failed');
        } else {
            res.redirect(authUrl);
        }
    });
});

// Маршрут для обработки callback от Steam
app.get('/auth/steam/callback', (req, res, next) => {
    relyingParty.verifyAssertion(req, (error, result) => {
        if (error) {
            next(error);
        } else {
            req.session.steamID = result.claimedIdentifier;
            res.redirect('/');
        }
    });
});

// Маршрут главной страницы
app.get('/', (req, res) => {
    if (req.session.steamID) {
        res.send(`Hello, Steam user with ID: ${req.session.steamID}`);
    } else {
        res.send(`<a href="/auth/steam">Login with Steam</a>`);
    }
});

// Запуск сервера
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});