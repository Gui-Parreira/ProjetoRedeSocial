// Powered by Gui Parreira

import express from 'express';


const indexRouter = express.Router()


indexRouter.get('/', (req, res) => {
  res.render('index/home', {css: "css/style.css"});
});

indexRouter.get('/login', (req, res) => {
  res.render('index/login',{title:'Login do Sistema', css: "css/style.css"});
});


export default indexRouter

