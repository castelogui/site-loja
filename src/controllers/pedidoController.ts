import { Request, Response } from "express";
import { Pedido } from "../database/entity/Pedido";
import { AppDataSource } from "../database/data-source";
import Querys from "../database/querys";

const querys = new Querys();

class PedidoController {
  async home(request: Request, response: Response){
    return response.sendFile(process.cwd() + "../index.html");
  }
  async create(request: Request, response: Response) {
    const pedido = new Pedido();

    const { clienteId, items, description } = request.body;

    pedido.id_cliente_pedido = clienteId;
    pedido.date_created_pedido = new Date();
    pedido.date_updated_pedido = new Date();
    pedido.description_pedido = description;
    pedido.id_cliente_pedido = clienteId;
    pedido.items_pedido = items;

    await AppDataSource.manager.save(pedido);

    return response.json(pedido);
  }

  async buscar(request: Request, response: Response) {
    const pedido = await AppDataSource.manager.find(Pedido);
    response.json(pedido);
  }

  async dropPedido(request: Request, response: Response) {
    const { id } = request.body;
    const pedido = await AppDataSource.getRepository(Pedido)
      .createQueryBuilder("pedido")
      .where("pedido.id_pedido = :id", { id: id })
      .getOne();
    if (pedido) {
      await querys.dropPedido(id);
      return response.json({ messge: "pedido deletado" });
    }
    return response.json({ error: "Pedido nao existe" });
  }

  async update(request: Request, response: Response) {
    const { id, clienteId, items, description } = request.body;

    await AppDataSource.createQueryBuilder()
      .update(Pedido)
      .set({
        id_cliente_pedido: clienteId,
        items_pedido: items,
        description_pedido: description,
        date_updated_pedido: new Date(),
      })
      .where("id_pedido = :id", { id: id })
      .execute();

    const pedido_up = await AppDataSource.getRepository(Pedido)
      .createQueryBuilder("pedido")
      .where("pedido.id_pedido = :id", { id: id })
      .getOne();

    return response.json(pedido_up);
  }
}

export default PedidoController;
