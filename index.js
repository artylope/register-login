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

const pool = new pg.Pool(config);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});


// Allow use of SHA265 hashing library
// var sha256 = require('js-sha256');

// const SALT = "my very special mushroom sauce with pepper";

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

  let user = request.cookies.user_id;
  let loggedIn = request.cookies.loggedin;

  console.log(request.cookies.user_id);
  console.log(request.cookies.loggedin);

  const queryString = `SELECT * FROM users WHERE id = $1`;
  const values = [user];

    pool.query(queryString, values, (err, result) => {

        // let requestSessionCookie = sha256(cookie.user_id + 'loggedin' + special);


        if (err) {
            console.log('query error:', err.stack);
            response.send( 'query error' );
        } else {

            console.log("inside query");
            console.log(request.cookies.loggedin);
            console.log("type of cookies.loggedin");
            console.log(typeof request.cookies.loggedin);
            console.log("type of true");
            console.log(typeof 'true');
            console.log("inside query results");
            console.log(result.rows[0]);

            // response.send(result.rows[0]);
            if (request.cookies.loggedin === 'true'){

                response.send(result.rows[0]);

            } else {
                response.send('WRONGGGGG USERRRR!!!')
            }
        }

    })
}

var registerPage = function(request, response){
  response.render('register');
}

var createUser = function(request, response){

  const input = request.body;
  const queryString = "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *";
  const values = [input.username, input.password];

  pool.query(queryString, values, (err, result) => {

    console.log("YAY");
    console.log(result.rows[0]);

    // check to see if err is null
    if(err){
      console.log("error");
      console.log(err);
    } else {
      response.cookie('loggedin', true);
      response.cookie('user_id', result.rows[0].id);
      response.send('worked');
    }

  });

}

var loginPage = function(request, response){
  response.render('login');
}


var verifyLogin = function(request, response){

  let input = request.body;

  const queryString = `SELECT * FROM users WHERE username = $1`;
  const values = [input.username];

  pool.query(queryString, values, (err, result) => {
      // let hashedPass = sha256(newUser.password);

      if (err) {
          console.log('query error:', err.stack);
          response.send( 'query error' );
      } else {
          let user = result.rows[0];
          console.log(user);

          if (user === undefined){
              response.send('PLEASE KEY IN CORRECT NAME / PASSWORD!!!!!!!!!!!');

          } else if (input.password === user.password){
              // let hashedCookie = sha256(user.id + 'loggedin' + special);
              console.log('login successful')
              response.cookie('loggedin', 'true')
              response.cookie('user_id', user.id)
              response.redirect(`/app`);
          } else {
              response.send('wrong password');
          }
      }
  });

}


// --------------------------------------------------------------------------
// Routes -------------------------------------------------------------
// --------------------------------------------------------------------------

app.get('/', redirectApp);

app.get('/app', appPage);

app.get('/register', registerPage);

app.post('/users', createUser);

app.get('/login', loginPage);

app.post('/login', verifyLogin);






// --------------------------------------------------------------------------
// PORT ---------------------------------------------------------------------
// --------------------------------------------------------------------------

const PORT = 80;
app.listen(PORT, ()=>{console.log("NOW LISTENING PORT 80");});
