import express from "express";

import PedidoController from "./controllers/pedidoController";
import UserController from "./controllers/userController";
import ItemController from "./controllers/itemController";

const pedidoController = new PedidoController();
const userController = new UserController();
const itemController = new ItemController();

const routes = express.Router();

routes.post("/", pedidoController.create);
routes.get("/pedidos", pedidoController.buscar);
routes.put("/pedidos", pedidoController.update);
routes.delete("/pedidos", pedidoController.dropPedido);

routes.post("/user/new", userController.create);
routes.get("/users", userController.find);
routes.get("/user", userController.findOne);
routes.put("/user", userController.update);
routes.post("/login", userController.login);
routes.post("/logout", userController.logout);
routes.get("/loginusers", userController.usersLogados);

routes.post("/items", itemController.create);
routes.get("/items", itemController.find);
routes.put("/items", itemController.update);
routes.delete("/items/:id", itemController.dropItem);

export default routes;
