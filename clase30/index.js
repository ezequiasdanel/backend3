//Imports 
import express from "express"
import cookieParser from "cookie-parser"
import session from "express-session"
import 'dotenv/config'
import mongoose from "mongoose"
import rutas from './src/routes/routes.js'
import passport from "passport";
import { objStrategy, objStrategySignup } from "./src/middlewares/passportLocal.js"
//Imports del desafio clase 30
import cluster from 'cluster'
import os from 'os'
import minimist from 'minimist'
//constantes 
const numCPUs = os.cpus().length;
const app = express()
const args = minimist(process.argv.slice(2))
const PORT = args.puerto || 8080 
const modoServer = args.modo || 'FORK'
//Funciones server
passport.use('login', objStrategy);
passport.use('signup', objStrategySignup)
app.set('view engine', 'ejs')
app.set('views', './src/views')
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret: 'clave_secreta',
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: Number(process.env.TIME_SESSION_SECONDS) * 1000 // Tiempo de inactividad
    },
    rolling: true,
    resave: true,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/ecommerce', rutas)
mongoose.connect(process.env.MONGO);
//const PORT = process.env.PORT
//app.listen(PORT, () => console.log(`http://localhost:${PORT}/ecommerce/`))

if (modoServer == 'CLUSTER') {
    if(cluster.isPrimary){
        console.log(`Master ${process.pid} is running`)
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
    
        cluster.on('exit', (worker,code,signal)=>{
            console.log(`Worker ${worker.process.pid} died`)
        })
        
    } else {
        app.listen(PORT, () => console.log(`http://localhost:${PORT}/ecommerce/`))
       console.log(`Worker ${process.pid} started`)
    }
} else {
    app.listen(PORT, () => console.log(`http://localhost:${PORT}/ecommerce/`))
}