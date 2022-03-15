const express = require('express');
const crypto = require('crypto');
const cookieParser = require('cookie-parser')


const app = express();
const port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.use(cookieParser())

app.get('/', function(req, res) {
  const newCookie = req.cookies["cool-cookie"];
  const oldCookie = req.cookies["prev-cookie"];

  res.status(Number(req.query.code) > 200 ? Number(req.query.code) : 200);

  res.render('index.html.ejs', { oldCookie, newCookie });
});

app.get('/redirect', function(req, res) {
  const uuid = crypto.randomUUID();
  const oldCookie = req.cookies["cool-cookie"];
  const code = req.query["code"];


  res.cookie('prev-cookie', oldCookie, {
    path: '/',
    secure: false,
    httpOnly: false
  })


  res.cookie('cool-cookie', uuid, {
    path: '/',
    secure: false,
    httpOnly: false
  })

  res.redirect(`/?code=${code}`)
});













app.listen(port, () => {
})
