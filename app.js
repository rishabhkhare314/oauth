const express = require("express");
const multer = require("multer");
const ejs = require("ejs");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const camelcaseKeys = require("camelcase-keys");
const router = express.Router();
const  logger = require('./middleware/logger');
const omitEmpty = require('omit-empty');
const fs = require('fs')
//Intit app
// console.log("logerrr",logger)
const app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: true });

app.use(function(req, res, next) {  
  console.log(' hii %s %s', req.method, req.url);  
  next();  
});  

app.use( (req,res,next) => {
  let method  = req.method;
  let url = req.url;

  console.log(`you've accessed ${url} via a ${method} Method`)
  next()
})

app.use( (req,res,next) => {
  const now =new Date().toString();
  const log = `${now} : ${req.method} ${req.url} `
  console.log(log)
  fs.appendFile("server_log.txt",log + "\n",(err) =>{
      if(err) {
        console.log(err)
      }
  })
  next()
})

router.use(function (req, res, next) {
  console.log("Time:", Date.now());
  next();
});

storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 200000 },
}).single("myImage");

app.set("view engine", "ejs");

app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.render("index");
});
//   Logging

app.use((req, res, next) => {
  console.log("IP address ::", req.ip);
  next();
});

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.render("index", {
        msg: err,
      });
    } else {
      console.log(req.file);
      res.send("test");
    }
  });
});

app.post("/data", urlencodedParser, (req, res) => {
  console.log("form2", JSON.stringify(req.body));
  res.end(JSON.stringify(req.body));
});
app.use(morgan("dev"));

//Error Handler
app.use((req, res, next) => {
  const error = new Error("not Found");
  error.status = 404;
  next(error);
});

app.use("/", (req, res) => {
  res.send("");
});

// every request to the router

//camescase keys
const camelcase1 = camelcaseKeys({ "foo-bar": true });
const camelcase2 = camelcaseKeys(
  { "foo-bar": true, nested: { unicorn_rainbow: true } },
  {  pascalCase: true }
);
console.log(camelcase1)
console.log(camelcase2)

console.log("before middleware",{ a: 'a', b: { c: 'c', d: '' } })
console.log(omitEmpty({ a: 'a', b: { c: 'c', d: '' } }));

console.log("before middleware",{ a: ['a'], b: [] })
console.log(omitEmpty({ a: ['a'], b: [] }));
 
// reject "0" as falsey
console.log("before middleware",{ a: 0, b: 1 }, { omitZero: true })
console.log(omitEmpty({ a: 0, b: 1 }, { omitZero: true }));

app.listen(3000, () => {
  logger.log('info',"Port Running on 3000");
});
