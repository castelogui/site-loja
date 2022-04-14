import { Request, Response } from "express";
import { Pedido } from "../database/entity/Pedido";
import { AppDataSource } from "../database/data-source";

class PedidoController {
  async create(request: Request, response: Response) {
    const pedido = new Pedido();

    const { cliente, items, description } = request.body;

    pedido.cliente_pedido = cliente;
    pedido.date_created_pedido = new Date();
    pedido.description_pedido = description;
    pedido.items_pedido = items

    await AppDataSource.manager.save(pedido);

    return response.json(pedido);
  }
  
  async buscar(request: Request, response: Response) {
    try {
      const pedido = await AppDataSource.manager.find(Pedido);
      response.json(pedido);
    } catch (error) {
      response.json({ "error": error });
    }
  }
}

export default PedidoController;
