let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

app.use(function middleware(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next();
});

app.use('/public', express.static(process.cwd() + '/public'));

app.route('/_api/package.json')
  .get(function(req, res, next) {
    console.log('requested');
    fs.readFile(__dirname + '/package.json', function(err, data) {
      if(err) return next(err);
      res.type('txt').send(data.toString());
    });
  });
  
app.route('/')
    .get(function(req, res) {
		  res.sendFile(process.cwd() + '/views/index.html');
    })

const mySecret = process.env['MESSAGE_STYLE']

app.get("/json",(req,res)=>{
  var msg = "Hello json"
  if(process.env.MESSAGE_STYLE === "uppercase"){
     msg = msg.toUpperCase();
  }
  res.json({
    message: msg
  });
});

app.get("/now", (req, res, next)=>{
  req.time = new Date().toString();
  next();
}, (req, res)=>{
  res.send({
    time: req.time
  });
});

app.get("/:word/echo", (req, res) => {
  res.json({echo: req.params.word});
})

app.route("/name").get((req, res) => {
  let string = `${req.query.first} ${req.query.last}`;
  res.json({name: string});
}).post((req, res) => {
  let string = `${req.body.first} ${req.body.last}`;
  res.json({name: string});
})







































 module.exports = app;
