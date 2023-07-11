const express = require('express');
const path = require('path');

// const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const cors = require('cors');


const morgan = require('morgan');

const routerApi = require('./routes');
const app = express();
const port = process.env.PORT || 3000;

//settings

//motor de plantillas
app.set('view engine', 'ejs')

//carpeta public
// app.use(express.static(path.join(__dirname,'public')))


app.set('views', path.join(__dirname, 'views'));

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(cors())
app.use(morgan('dev'));

// //variables de entorno
// dotenv.config({ path: './env/.env'});

//para poder trabajar con las cookies
app.use(cookieParser())


// app.use(
//   myConnection(
//     mysql,
//     {
//       host: process.env.DB_HOST,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_DATABASE,
//     })
// );



//rutas
routerApi(app);
app.get('/', (req, res)=>{    
  res.render('index', {user:req.user})
})

app.use(express.static(path.join(__dirname,'../IS-3grupo4-2023/public')))

//Para eliminar la cache 
app.use(function(req, res, next) {
  if (!req.user)
      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  next();
});


app.listen(port, () => {
  console.log('Mi port ' + port);
});
