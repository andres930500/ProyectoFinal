const { PedidoModel, pedidoSchema } = require('./pedido.model.js');
const { GameModel, GameSchema } = require('./game.model');
const { UsuarioModel, usuarioSchema } = require('./usuario.modelo');



function setUpModels(sequelize) {




  
  PedidoModel.init(pedidoSchema, PedidoModel.config(sequelize));
  GameModel.init(GameSchema, GameModel.config(sequelize));
  UsuarioModel.init(usuarioSchema, UsuarioModel.config(sequelize));

 
  

 
}


module.exports = setUpModels;
