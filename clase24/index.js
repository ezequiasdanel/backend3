import express from 'express';
import session from 'express-session'
import MongoStore from 'connect-mongo'
import 'dotenv/config'
import fakeProductos from './class/faker.js'
const app = express();


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO
    }),
    secret: String(process.env.SECRET),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
}))
app.set('view engine', 'ejs');
app.set('views','./public/views');

app.get('/products', (req, res) => {
    if (req.session.user){
        const listado = fakeProductos()
        res.render('products', {listado})
    }else{
        res.redirect('/login')
    }
})
app.get('/login', (req, res) => {
    res.render('login');
})
app.post('/login', (req, res) => {
    const {username} = req.body;
    req.session.user = username;
    res.redirect('/products')
})
app.get('/logout', (req, res) => {
    const username = req.session.user
    req.session.destroy()
    res.render('logout',{
        username
    })
})
app.listen(8080)