const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const { Pool } = require('pg');
const common = require('./common');
const other = require('./other');

var pool = new Pool({
  //connectionString: 'postgres://postgres:wndrspttnrd@localhost.people'
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }

});

var app = express()
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.get('/', (req, res) => res.render('pages/index'))
app.get('/times', (req, res) => res.send(showTimes()))

app.get('/Database', (req,res) => {
  var getUsersQuery = `SELECT * FROM people`;
  var results;
  pool.query(getUsersQuery,(error,result)=>{
    if(error)
      res.end(error)
    results = {'rows':result.rows}
    res.render('pages/db', results);
  })

})

app.get('/users/:id', (req,res)=>{
  var uid = req.params.id;
  console.log(req.params.id);
  //search the database using the uid
  res.send("got it!");
})

  app.get('/db', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  app.post('/adduser', (req,res)=>{
    console.log("post request for /adduser");
    var uname = req.body.Name;
    var usize = req.body.Size;
    var uheight = req.body.Height;
    var utype = req.body.Type;
    //res.send(`insert into people values (uname,usize,uheight,utype)`)
    //`insert into people values ('John',150,20,'a')`;
  })
  app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

  showTimes = () => {
    let result = '';
    const times = process.env.TIMES || 5;
    for (i = 0; i < times; i++) {
      result += i + ' ';
    }
    return result;
  }
