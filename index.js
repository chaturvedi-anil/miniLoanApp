import express from 'express';
import routes from './routes/index.js'
import expressLayout from 'express-ejs-layouts';
import db from './config/mongoose.js';
// import passport from 'passport';
// import passportJWT from './config/passport-jwt-strategy.js';
import flash from 'connect-flash';
import { setFlash } from './config/middleware.js';

const PORT = 8000;
const app = express();

app.use(express.json());
// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

app.use(express.static('./assets'));
app.use(expressLayout);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');

// Initialize Passport
// app.use(passport.initialize());

// noty js and connect-flash for notification
app.use(flash());
app.use(setFlash);
// Redirected to folder routes
app.use('/', routes);

app.listen(PORT, (err)=>
{
    if(err)
    {
        console.log('Error in running server ', err);
        return;
    }
    console.log(`express server is running on ${PORT} port !`);
});