// Powered by Gui Parreira

import express from 'express';
import Comentario from "../models/Comentario.js";

const commentRouter = express.Router()


commentRouter.get('/novo/:id', async (req, res) => {
  if (req.session.usuarioLogado || req.session.usuarioLogado != null) {

    req.session.idPostagem = req.params.id;

      res.render('comment/novo', { tituloPagina: "Novo Comentário", css: "../../css/style.css" });

  } else {
    res.render('index/login', { layout: 'painel', erroLogin: "Página restrita aos usuários do sistema!", tituloPagina: "Login", css: "../css/style.css" });
  }

});

commentRouter.get('/exibir/:id', async (req, res) => {

  if (req.session.usuarioLogado || req.session.usuarioLogado != null) {

    const comentario = await Comentario.findOne({ where: { id: req.params.id } });
    if (comentario != null) {
      if (req.session.usuarioLogado.nivelAcesso == 'Admin') {
        res.render('comment/editar', { layout: 'painel', id: comentario.id, usuario: comentario.usuario, postagem: comentario.postagem, comentario: comentario.comentario, tituloPagina: "Editar Comentário", css: "../../css/style.css" });
      } else {
        const comentarios = await Comentario.findAll();
        res.render('comment/listar', { layout: 'painel', comentarios: comentarios, erroLogin: "Página restrita aos Administradores do sistema!", tituloPagina: "Listagem de usuários", css: "../../css/style.css" });
      }
    }
    else {
      res.send("Comentário não encontrado!", { tituloPagina: "Erro", css: "../../css/style.css" });
    }
  }
  else {
    res.render('index/login', { erroLogin: "Página restrita aos usuários do sistema!", tituloPagina: "Login" });
  }

});

commentRouter.get('/excluir/:id', async (req, res) => {

  if (req.session.usuarioLogado || req.session.usuarioLogado != null) {
    if (req.session.usuarioLogado.nivelAcesso == 'Admin') {
      const comentario = await Comentario.destroy({ where: { id: req.params.id } }).then(function () {
        res.redirect("/comment/listar")
      }).catch(function (erro) {
        res.send('Erro ao excluir o comentário: ' + erro);
      });
    } else {
      const comentarios = await Comentario.findAll();
      res.render('comment/listar', { layout: 'painel', comentarios: comentarios, erroLogin: "Função restrita aos Administradores do sistema!", tituloPagina: "Listagem de comentários", css: "../../css/style.css" });

    }
  }
  else {
    res.render('index/login', { erroLogin: "Página restrita aos usuários do sistema!", tituloPagina: "Login", css: "../css/style.css" });
  }

});

commentRouter.get('/listar', async (req, res) => {

  if (req.session.usuarioLogado || req.session.usuarioLogado != null) {
    const comentarios = await Comentario.findAll();
    if (comentarios != null) {
      res.render('comment/listar', { layout: 'painel', comentarios: comentarios, tituloPagina: "Listagem de comentários", tituloPagina: "Listagem de comentários", css: "../css/style.css" });
    }
    else {
      res.send("Comentário não encontrado!");
    }
  }
  else {
    res.render('index/login', { erroLogin: "Página restrita aos usuários do sistema!", tituloPagina: "Login", css: "../css/style.css" });
  }
});


commentRouter.post('/criar', (req, res) => {

  const comment = Comentario.create({
    usuario: req.session.usuarioLogado.id,
    postagem: req.session.idPostagem,
    comentario: req.body.comentario,
  }).then(function () {
    res.redirect("/comment/listar");
  }).catch(function (erro) {
    res.send('Erro ao inserir o Comentário: ' + erro);
  });


});

commentRouter.post('/editar', (req, res) => {


  const comment = Comentario.update({
    comentario: req.body.comentario,
 
  }, { where: { id: req.body.id } }).then(function () {
    res.redirect("/comment/listar");
  }).catch(function (erro) {
    res.send('Erro ao atualizar o Comentário: ' + erro);
  });


});

export default commentRouter

