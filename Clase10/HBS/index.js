const express = require ('express');
const app = express();
const PORT = 8080;
const handlebars = require('express-handlebars')


app.engine(
    "hbs",
    handlebars({
        extname: 'hbs',
        defaultLayout:"form.hbs",
        layoutsDir: __dirname + "/views",
        partialsDir: __dirname + "/views/partials/"
    })
)

app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.static("public"))

const datos = [];


app.get("/", (req, res) => {
    res.render("form", {datos})
})

app.get("/productos",(req, res)=>{
    res.render('./partials/tabla', {datos})
})
app.post("/productos/", (req, res) => {
    datos.push(req.body)
    res.render('./partials/tabla', {datos})
})
app.listen(PORT,()=> console.log('ready'))