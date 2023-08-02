// Powered by Gui Parreira

import express from 'express';
import Like from '../models/Like.js';

const likeRouter = express.Router()


likeRouter.get('/novo/:id', async (req, res) => {
  if (req.session.usuarioLogado || req.session.usuarioLogado != null) {

    req.session.idPostagem = req.params.id;
    res.render('like/novo', { tituloPagina: "Like / Deslike", css: "../../css/style.css" });

  } else {
    res.render('index/login', { layout: 'painel', erroLogin: "Página restrita aos usuários do sistema!", tituloPagina: "Login", css: "../css/style.css" });
  }

});

likeRouter.get('/exibir/:id', async (req, res) => {

  if (req.session.usuarioLogado || req.session.usuarioLogado != null) {

    const like = await Like.findOne({ where: { id: req.params.id } });
    if (like != null) {
      if (req.session.usuarioLogado.nivelAcesso == 'Admin') {
        res.render('like/editar', { layout: 'painel', id: like.id, usuario: like.usuario, postagem: like.postagem, like: like.like, tituloPagina: "Alterar Like/Deslike", css: "../../css/style.css" });
      } else {
        const likes = await Like.findAll();
        res.render('like/listar', { layout: 'painel', likes: likes, erroLogin: "Página restrita aos Administradores do sistema!", tituloPagina: "Listagem de usuários", css: "../../css/style.css" });
      }
    }
    else {
      res.send("Like/Deslike não encontrado!", { tituloPagina: "Erro", css: "../../css/style.css" });
    }
  }
  else {
    res.render('index/login', { erroLogin: "Página restrita aos usuários do sistema!", tituloPagina: "Login" });
  }

});

likeRouter.get('/excluir/:id', async (req, res) => {

  if (req.session.usuarioLogado || req.session.usuarioLogado != null) {
    if (req.session.usuarioLogado.nivelAcesso == 'Admin') {
      const like = await Like.destroy({ where: { id: req.params.id } }).then(function () {
        res.redirect("/like/listar")
      }).catch(function (erro) {
        res.send('Erro ao excluir o Like: ' + erro);
      });
    } else {
      const likes = await Like.findAll();
      res.render('like/listar', { layout: 'painel', likes: likes, erroLogin: "Função restrita aos Administradores do sistema!", tituloPagina: "Listagem de Likes/Deslike", css: "../../css/style.css" });

    }
  }
  else {
    res.render('index/login', { erroLogin: "Página restrita aos usuários do sistema!", tituloPagina: "Login", css: "../css/style.css" });
  }

});

likeRouter.get('/listar', async (req, res) => {

  if (req.session.usuarioLogado || req.session.usuarioLogado != null) {
    const likes = await Like.findAll();
    if (likes != null) {
      res.render('like/listar', { layout: 'painel', likes: likes, tituloPagina: "Listagem de Likes", tituloPagina: "Listagem de Likes/Deslike", css: "../css/style.css" });
    }
    else {
      res.send("Like/Deslike não encontrado!");
    }
  }
  else {
    res.render('index/login', { erroLogin: "Página restrita aos usuários do sistema!", tituloPagina: "Login", css: "../css/style.css" });
  }
});

likeRouter.post('/criar', (req, res) => {

  const like = Like.create({
    usuario: req.session.usuarioLogado.id,
    postagem: req.session.idPostagem,
    like: req.body.like,
  }).then(function () {
    res.redirect("/like/listar");
  }).catch(function (erro) {
    res.send('Erro ao inserir o Like/Deslike: ' + erro);
  });


});

likeRouter.post('/editar', (req, res) => {

  let like = Like.update({
    like: req.body.like,
 
  }, { where: { id: req.body.id } }).then(function () {
      res.redirect("/like/listar");
  }).catch(function (erro) {
    res.send('Erro ao atualizar o Like/Deslike: ' + erro);
  });

});

export default likeRouter