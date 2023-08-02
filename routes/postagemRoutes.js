// Powered by Gui Parreira

import express from 'express';
import Postagem from "../models/Postagem.js";

const postagemRouter = express.Router()

postagemRouter.get('/nova', (req, res) => {
  if (req.session.usuarioLogado || req.session.usuarioLogado != null) {
    res.render('postagem/nova', { tituloPagina: "Nova postagem", css: "../css/style.css" });
  }
  else {
    res.render('index/login', { erroLogin: "Página restrita aos usuários do sistema!", tituloPagina: "Login", css: "../css/style.css" });
  }

});

postagemRouter.get('/exibir/:id', async (req, res) => {
  if (req.session.usuarioLogado || req.session.usuarioLogado != null) {
    const postagem = await Postagem.findOne({ where: { id: req.params.id } });
    if (postagem != null) {
      res.render('postagem/editar', { id: postagem.id, titulo: postagem.titulo, conteudo: postagem.conteudo, usuario: postagem.usuario, tituloPagina: "Editar postagens", css: "../../css/style.css" });
    }
    else {
      res.send("Postagem não encontrado!");
    }
  } else {
    res.render('index/login', { tituloPagina: "Login", erroLogin: "Página restrita aos usuários do sistema!" });
  }

});

postagemRouter.get('/excluir/:id', async (req, res) => {

  if (req.session.usuarioLogado || req.session.usuarioLogado != null) {
    const postagem = await Postagem.destroy({ where: { id: req.params.id } }).then(function () {
      res.redirect("/postagem/listar")
    }).catch(function (erro) {
      res.send('Erro ao excluir a postagem: ' + erro);
    });
  } else {
    res.render('index/login', { erroLogin: "Página restrita aos usuários do sistema!", tituloPagina: "Login", css: "../css/style.css" });
  }

});

postagemRouter.get('/listar', async (req, res) => {

  var ativar = req.params.ativa;

  if (req.session.usuarioLogado || req.session.usuarioLogado != null) {

    if (req.session.usuarioLogado.nivelAcesso == 'Admin') {

      const postagens = await Postagem.findAll();

      if (postagens != null) {
        res.render('postagem/listarAdm', { ativa: ativar, postagens: postagens, tituloPagina: "Listagem de Postagens", css: "../css/style.css" });
      }
      else {
        res.send("Postagem não encontrada!");
      }
    } else {

      const postagens = await Postagem.findAll({
        where: {
          visivel: true
        }
      });

      if (postagens != null) {
        res.render('postagem/listar', { ativa: ativar, postagens: postagens, tituloPagina: "Listagem de postagens", css: "../css/style.css" });
      }
      else {
        res.send("Postagem não encontrada!");
      }
    }
  } else {
    res.render('index/login', { erroLogin: "Página restrita aos usuários do sistema!", tituloPagina: "Login", css: "../css/style.css" });
  }
});

postagemRouter.get('/listar/:ativa', async (req, res) => {

  var ativar = req.params.ativa;

  if (req.session.usuarioLogado || req.session.usuarioLogado != null) {

    if (req.session.usuarioLogado.nivelAcesso == 'Admin') {

      const postagens = await Postagem.findAll();
      if (postagens != null) {
        res.render('postagem/listarAdm', { ativa: ativar, postagens: postagens, tituloPagina: "Listagem de Postagens", css: "../../css/style.css" });
      }
      else {
        res.send("Postagem não encontrada!");
      }
    } else {

      const postagens = await Postagem.findAll({
        where: {
          visivel: true
        }
      });

      if (postagens != null) {
        res.render('postagem/listar', { ativa: ativar, postagens: postagens, tituloPagina: "Listagem de postagens", css: "../css/style.css" });
      }
      else {
        res.send("Postagem não encontrada!");
      }
    }
  } else {
    res.render('index/login', { erroLogin: "Página restrita aos usuários do sistema!", tituloPagina: "Login", css: "../css/style.css" });
  }
});

postagemRouter.post('/criar', (req, res) => {

  const postagem = Postagem.create({
    titulo: req.body.titulo,
    conteudo: req.body.conteudo,
    usuario: req.session.usuarioLogado.id,
    visivel: false,
  }).then(function () {
    res.redirect("/postagem/listar");
  }).catch(function (erro) {
    res.send('Erro ao inserir a postagem: ' + erro);
  });

});

postagemRouter.post('/editar', (req, res) => {

  const postagem = Postagem.update({
    titulo: req.body.titulo,
    conteudo: req.body.conteudo,
    usuario: req.body.usuario,
  }, { where: { id: req.body.id } }).then(function () {
    res.redirect("/postagem/listar");
  }).catch(function (erro) {
    res.send('Erro ao atualizar a postagem: ' + erro);
  });

});

postagemRouter.get('/visivel/:id', async (req, res) => {

  if (req.session.usuarioLogado || req.session.usuarioLogado != null) {
    if (req.session.usuarioLogado.nivelAcesso == 'Admin') {

      const postagem = await Postagem.findOne({ where: { id: req.params.id } });
      const ativar = !postagem.visivel;
      await postagem.update({ visivel: ativar });
      if (ativar == true) {
        res.redirect('/postagem/listar/Ativada');
      } else {
        res.redirect('/postagem/listar/Desativada');

      }
    }
  } else {
    res.render('index/login', { erroLogin: "Página restrita aos Administradores do sistema!", tituloPagina: "Login", css: "../css/style.css" });
  }

});

export default postagemRouter

