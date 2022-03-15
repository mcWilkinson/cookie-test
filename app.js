const express = require('express');
const crypto = require('crypto');
const cookieParser = require('cookie-parser')


const app = express();
const port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.use(cookieParser())

app.get('/', function(req, res) {
  const uuid = crypto.randomUUID();

  const oldCookie = req.cookies["cool-cookie"];
  const newCookie = res.cookie('cool-cookie', uuid, {
    path: '/',
    secure: false,
    httpOnly: false
  })

  res.render('index.html.ejs', { oldCookie, uuid });
});

app.listen(port, () => {
})
