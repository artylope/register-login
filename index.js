// --------------------------------------------------------------------------
// Set Up -------------------------------------------------------------------
// --------------------------------------------------------------------------

const express = require('express');
const app = express();

// Allow use of postgres db
const pg = require('pg');

// Initialise postgres client
const config = {
  user: 'yixin',
  host: '127.0.0.1',
  database: 'registerdb',
  port: 5432,
};

// Allow use of SHA265 hashing library
var sha256 = require('js-sha256');

const SALT = "my very special mushroom sauce with pepper";

// Allow use of cookie parser
const cookieParser = require('cookie-parser')
app.use(cookieParser());

// Set up method-override for PUT and DELETE forms
const methodOverride = require('method-override')
app.use(methodOverride('_method'));

// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

// this line allow static files e.g. css and other images to be read from public folder
app.use(express.static(__dirname+'/public/'));


// use files, to get hold of the data in the request.body.
// without this request.body will be undefined

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

// --------------------------------------------------------------------------
// Helper Functions ---------------------------------------------------------
// --------------------------------------------------------------------------


// --------------------------------------------------------------------------
// Pages Functions -------------------------------------------------------------
// --------------------------------------------------------------------------

var redirectApp = function(request, response){
  response.redirect('/app');
}

var appPage = function(request, response){
  response.render('app');
}

var registerPage = function(request, response){
  response.render('register');
}

var loginPage = function(request, response){
  response.render('login');
}


// --------------------------------------------------------------------------
// Routes -------------------------------------------------------------
// --------------------------------------------------------------------------

app.get('/', redirectApp);

app.get('/app', appPage);

app.get('/register', registerPage);

app.get('/login', loginPage);







// --------------------------------------------------------------------------
// PORT ---------------------------------------------------------------------
// --------------------------------------------------------------------------

const PORT = 80;
app.listen(PORT, ()=>{console.log("NOW LISTENING PORT 80");});
