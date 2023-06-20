const express = require('express');
const path = require('path');

const routerApi = require('./routes');
const app = express();
const port = process.env.PORT || 3000;

//settings
dotenv.config({ path: './env/.env'});
app.set('views', path.join(__dirname, 'views'));

//middlewares
app.use(express.json());
app.use(cors())

//rutas
routerApi(app);
app.get('/', (req, res) => {
  res.render('home');
});

app.use(express.static(path.join(__dirname,'public')))

app.listen(port, () => {
  console.log('Mi port ' + port);
});
