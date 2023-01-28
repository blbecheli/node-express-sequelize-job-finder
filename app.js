const express = require('express'); //comando usado para "chamar" o pacote express
const exphbs = require('express-handlebars');
const app = express();
const path = require('path');
const db = require('./db/connection');
const bodyParser = require('body-parser');
const Job = require('./models/Job');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const PORT = 3000;

app.listen(PORT, function () { //comando para criar um servidor
    console.log(`O Express está rodando na porta ${PORT}`);
});

//body parser
// app.use(urlencoded({extended:false}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//handle bars - Configurações abaixo para o handlebars funcionar
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' })); //indica qual é a página inicial
app.set('view engine', 'handlebars');//indica para o express qual framework irá renderizar as páginas, que no caso será o handlebar

//static folder
app.use(express.static(path.join(__dirname, "public")))

//db connection 
db
    .authenticate() //conexão com o banco de dados
    .then(() => {//then é quando se tem sucesso com a conexão
        console.log("Conectou com o banco com o sucesso");
    })
    .catch(err => { //catch é quando se tem erro na conexão
        console.log("Ocorreu um erro ao conectar");
    })

//routes
app.get('/', (req, res) => { //comando que indica o local inicial

    let search = req.query.job;
    let query = '%' + search + '%';

    if (!search) {
        Job.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        })
            .then(jobs => {
                res.render('index', {
                    jobs
                });
            })
            .catch(err => console.log(err))
    } else {
        Job.findAll({
            where: { title: { [Op.like]: query } },
            order: [
                ['createdAt', 'DESC']
            ]
        })
            .then(jobs => {

                res.render('index', {
                    jobs, search
                });
            })
            .catch(err => console.log(err))
    }
});

//jobs routes
app.use('/jobs', require('./routes/jobs'))



