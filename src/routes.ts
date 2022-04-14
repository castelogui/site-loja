import express from "express";

import PedidoController from "./controllers/pedidoController";

const pedidoController = new PedidoController();

const routes = express.Router();

routes.post("/", pedidoController.create);
routes.get("/pedidos", pedidoController.buscar)

export default routes;
