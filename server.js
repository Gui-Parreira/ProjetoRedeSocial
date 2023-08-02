//Powered by Gui Parreira

import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import userRouter from './routes/userRoutes.js';
import indexRouter from './routes/indexRoutes.js';
import postagemRouter from './routes/postagemRoutes.js';
import commentRouter from './routes/commentRoutes.js';
import likeRouter from './routes/likeRoutes.js';
import session from 'express-session';

const app = express();

//Configuração Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

//Configuração BodyParser
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());

// Use the session middleware
app.use(session({ secret: 'DSW secret', resave: false, saveUninitialized: true}))

// Configuração de pasta public para arquivos estáticos
app.use(express.static('public'));

//Rotas
app.use('/', indexRouter);

app.use('/usuario', userRouter);

app.use('/postagem', postagemRouter);

app.use('/comment', commentRouter);

app.use('/like', likeRouter);

app.use(function(req, res, next) {
    res.status(404).render("error/error404");
});


app.listen(3000, () => 
{ 
	console.log('Aplicação rodando em http://localhost:3000/'); 
});