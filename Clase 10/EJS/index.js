const express = require ('express');
const app = express();
const PORT = 8080;


app.use('/static', express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.set('views', './views')
app.set('view engine', 'ejs')

const datos = []
app.get ('/',(req, res) => {
    res.render('form', {datos})
})

app.get('/productos',(req, res) => {
    res.render('./partials/tabla',{datos})
})

app.post('/productos', (req, res) => {
    datos.push(req.body)
    res.render('./partials/tabla', {datos})
})

app.listen(PORT,()=> console.log('Ready'))