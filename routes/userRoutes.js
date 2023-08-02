// Powered by Gui Parreira

import express from 'express';
import User from "../models/Usuario.js";
import md5 from 'md5';

const userRouter = express.Router()


userRouter.get('/novo', async (req, res) => {
  if (req.session.usuarioLogado || req.session.usuarioLogado != null) {
    if (req.session.usuarioLogado.nivelAcesso == 'Admin') {
      res.render('usuario/novo', { tituloPagina: "Novo usuário", css: "../css/style.css" });
    } else {
      const usuarios = await User.findAll();
      res.render('usuario/listar', { layout: 'painel', usuarios: usuarios, erroLogin: "Página restrita aos Administradores do sistema!", tituloPagina: "Listagem de usuários", css: "../css/style.css" });
    }
  }
  else {
    res.render('index/login', { layout: 'painel', erroLogin: "Página restrita aos usuários do sistema!", tituloPagina: "Login", css: "../css/style.css" });
  }

});

userRouter.get('/exibir/:id', async (req, res) => {

  if (req.session.usuarioLogado || req.session.usuarioLogado != null) {

    const usuario = await User.findOne({ where: { id: req.params.id } });
    if (usuario != null) {
      if (req.session.usuarioLogado.nivelAcesso == 'Admin') {
        res.render('usuario/editar', { layout: 'painel', id: usuario.id, nome: usuario.nome, sobrenome: usuario.sobrenome, email: usuario.email, tituloPagina: "Editar usuário", css: "../../css/style.css" });
      } else {
        const usuarios = await User.findAll();
        res.render('usuario/listar', { layout: 'painel', usuarios: usuarios, erroLogin: "Página restrita aos Administradores do sistema!", tituloPagina: "Listagem de usuários", css: "../../css/style.css" });
      }
    }
    else {
      res.send("Usuario não encontrado!", { tituloPagina: "Erro", css: "../../css/style.css" });
    }
  }
  else {
    res.render('index/login', { erroLogin: "Página restrita aos usuários do sistema!", tituloPagina: "Login" });
  }

});

userRouter.get('/excluir/:id', async (req, res) => {

  if (req.session.usuarioLogado || req.session.usuarioLogado != null) {
    if (req.session.usuarioLogado.nivelAcesso == 'Admin') {
      const usuario = await User.destroy({ where: { id: req.params.id } }).then(function () {
        res.redirect("/usuario/listar")
      }).catch(function (erro) {
        res.send('Erro ao excluir o usuário: ' + erro);
      });
    } else {
      const usuarios = await User.findAll();
      res.render('usuario/listar', { layout: 'painel', usuarios: usuarios, erroLogin: "Função restrita aos Administradores do sistema!", tituloPagina: "Listagem de usuários", css: "../../css/style.css" });

    }
  }
  else {
    res.render('index/login', { erroLogin: "Página restrita aos usuários do sistema!", tituloPagina: "Login", css: "../css/style.css" });
  }

});

userRouter.get('/listar', async (req, res) => {

  if (req.session.usuarioLogado || req.session.usuarioLogado != null) {
    const usuarios = await User.findAll();
    if (usuarios != null) {
      res.render('usuario/listar', { layout: 'painel', usuarios: usuarios, tituloPagina: "Listagem de usuários", tituloPagina: "Listagem de usuários", css: "../css/style.css" });
    }
    else {
      res.send("Usuario não encontrado!");
    }
  }
  else {
    res.render('index/login', { erroLogin: "Página restrita aos usuários do sistema!", tituloPagina: "Login", css: "../css/style.css" });
  }
});


userRouter.post('/cadastrar', (req, res) => {

  const user = User.create({
    nome: req.body.nome,
    sobrenome: req.body.sobrenome,
    email: req.body.email,
    senha: md5(req.body.senha),
    nivelAcesso: req.body.acesso
  }).then(function () {
    res.redirect("/usuario/listar");
  }).catch(function (erro) {
    res.send('Erro ao inserir o usuário: ' + erro);
  });


});

userRouter.post('/editar', (req, res) => {

  const user = User.update({
    nome: req.body.nome,
    sobrenome: req.body.sobrenome,
    email: req.body.email,
    senha: md5(req.body.senha)
  }, { where: { id: req.body.id } }).then(function () {
    res.redirect("/usuario/listar");
  }).catch(function (erro) {
    res.send('Erro ao atualizar o usuário: ' + erro);
  });


});

userRouter.post('/logar', async (req, res) => {

  const email = req.body.email;
  const senha = md5(req.body.senha);

  const usuario = await User.findOne({ where: { email: email, senha: senha } });
  if (usuario != null) {
    //res.render('usuario/editar', {id: usuario.id, nome: usuario.nome, sobrenome:usuario.sobrenome, email: usuario.email});
    req.session.usuarioLogado = usuario;
    res.redirect("/usuario/listar");
  }
  else {
    req.session.usuarioLogado = null;
    res.render('index/login', { erroLogin: "Usuario ou senha inválidos", css: "../css/style.css" });
  }
});

userRouter.get('/logout', async (req, res) => {

  req.session.usuarioLogado = null;
  res.redirect('../login');

});


export default userRouter

