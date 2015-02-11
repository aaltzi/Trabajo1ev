var express = require('express');
var app = express();

var exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080 || 5000; 
var ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
app.listen(port,ip);
console.log('Servidor Express escuchando en el puerto 8080');
// CONEXION BASE DE DATOS //
var Sequelize = require('sequelize');
var mysql =  require('mysql');
var bd=null;

var mysqlport = process.env.OPENSHIFT_MYSQL_DB_PORT || 3306;

if (process.env.OPENSHIFT_MYSQL_DB_URL) {
  // the application is executed on Heroku ... use the postgres database
console.log("openshift mysql db OK!");
     db = new Sequelize('kelo', process.env.OPENSHIFT_MYSQL_DB_USERNAME, process.env.OPENSHIFT_MYSQL_DB_PASSWORD,{
      dialect: 'mysql',
      port: process.env.OPENSHIFT_MYSQL_DB_PORT,
      host: process.env.OPENSHIFT_MYSQL_DB_HOST
    });
} else {
    // the application is executed on the local machine ... use mysql
    // var db = new sqlze('databasename', 'username', 'password',{
      console.log("local mysql bd OK!");
    db = new Sequelize('kelo', 'root', 'zubiri',{
      dialect: 'mysql',
      port: 3306
    });
}

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/hello.html');
});

app.get('/users', function(req, res) {
	db.query("SELECT name,pass FROM  `usuario`").success(function(rows){
		// no errors
		 res.json(rows);
	});
});
app.post('/user', function(req, res) {
	db.query("SELECT name,pass FROM  `usuario`").success(function(rows){
		if(req.body.nombre==rows[0].name){
	      // Nombres coinciden
	      if(req.body.pass==rows[0].pass){
	          console.log("La contraseña y el nombre coinciden");
	          console.log(req.body.nombre+" == "+rows[0].name);
	          console.log(rows[0].pass+" == "+req.body.pass);
	          res.redirect("/usuario.html");
	      }else{
	        console.log("La contraseña no coincide");
	      }
	    }else{
	      console.log("El nombre no coincide");
	    }
		// no errors
		 res.json(rows);
	});
});
// ************************************************


