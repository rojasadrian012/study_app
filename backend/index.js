const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser());

app.use(cors({
    origin: '*'
}));

const userRoute = require("./src/route/users/users.route");
const topicsRoute = require("./src/route/topics/topics.route"); // Asegúrate de que esta ruta es correcta

//Ruta raiz
app.get('/', function (req, res) {
    //Logica.
    res.send('Hello World');
});

app.get('/pagina2', function (req, res) {
    //Logica de negocios
    //esta aqui -Controller

    res.json({ application: 'Study APP', version: '1.0.0' });
});

//Llamadas a los routes de los UCs
userRoute(app);
topicsRoute(app); // Aquí añadimos las rutas de topics

app.listen(3000);
