//const common = require('./common');
//const other = require('./other');

document.getElementById("adduser").addEventListener('click',(evt)=>{
  var uname = document.getElementById('Name').value;
  var usize = document.getElementById('Size').value;
  var uheight = document.getElementById('Height').value;
  var utype = document.getElementById('Type').value;
  var getUsersQuery = `insert into people values (uname,usize,uheight,utype);`
  pool.query(getUsersQuery,(error,result)=>{
    if(error)
      res.end(error)
    results = {'rows':result.rows}
    res.render('pages/db', results);
  })
  console.log("inserted");
});
