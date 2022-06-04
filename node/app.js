'use strict';

const createError = require('http-errors');
const express = require('express');
require('express-async-errors');
require('./global/index');

const helmet = require('helmet');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require(`fs`);

global.BASE_PATH = __dirname + '/files/';

const app = express();

const options = { etag: false };
app.set("etag", false);

app.use(helmet());
app.use(helmet.contentSecurityPolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'DELETE, GET, POST, PATCH');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, x-token, Content-Type');

  next();
});

const title = '스켈레톤';
const description = '노드, mysql 백엔드와 리엑트 프론트 기반의 스켈레톤입니다.';

let show_html = async (req, res) => {
  return await new Promise(async (resolve) => {
    fs.readFile(path.resolve(__dirname, 'public/index.html'), 'utf8', function (err, html) {
      html = html.replace(/\$OG_TITLE/g, title);
      html = html.replace(/\$OG_DESCRIPTION/g, description);
      html = html.replace(/\$OG_IMAGE/g, '/imgs/main/logo.png');

      html = html.replace(/\$SITE_TITLE/g, title);
      html = html.replace(/\$SITE_DESCRIPTION/g, description);

      resolve(html);
    });
  });
};

app.get('/', async (req, res) => {
  let html = await show_html(req, res);

  res.send(html);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static("./public", options));
app.use(express.static("./files", options));

app.use('/api', require('./src/controller'));


app.get(['/', '/*'], async (req, res) => {
  let html = await show_html(req, res);

  res.send(html);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
