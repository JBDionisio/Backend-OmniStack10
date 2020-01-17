const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

app.listen(3333); //porta do localhost
app.use(express.json()); //Setando json como padrão para requisições
mongoose.connect('mongodb+srv://joaodionisio:week10@cluster0-whnmd.mongodb.net/week10?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

//Query params => url?parametro=valor => request.query
//Rout params => url/valor => request.params
//Body => corpo da requisição JSON => request.body

app.use(routes);