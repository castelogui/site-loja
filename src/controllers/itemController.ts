import { Request, Response } from "express";
import { Item } from "../database/entity/Item";
import { AppDataSource } from "../database/data-source";

class ItemController {
  async create(request: Request, response: Response) {
    const item = new Item();

    const { nome_item, description_item, valor_item, image_item, tipo_item } =
      request.body;

    console.log(nome_item, description_item, valor_item, image_item, tipo_item);

    item.nome_item = nome_item;
    item.description_item = description_item;
    item.valor_item = valor_item;
    item.image_item = image_item;
    item.tipo_item = tipo_item;
    item.date_created_item = new Date();
    item.date_updated_item = new Date();

    await AppDataSource.manager.save(item);

    return response.json(item);
  }

  async find(request: Request, response: Response) {
    const item = await AppDataSource.manager.find(Item);
    response.json(item);
  }

  async dropItem(request: Request, response: Response) {
    const { id } = request.params;

    console.log(id);
    
    try {
      const item = await AppDataSource.getRepository(Item)
        .createQueryBuilder("item")
        .where("item.id_item = :id", { id: id })
        .getOne();

      if (item) {
        await AppDataSource.createQueryBuilder()
          .delete()
          .from(Item)
          .where("item.id_item = :id", { id: id })
          .execute();
        return response.json("Item deletado com sucesso");
      } else {
        return response.json({
          error: "error",
          message: "item nao encontrado",
        });
      }
    } catch (error) {
      return response.json({
        error: error,
        message: "falha ao deletar item",
      });
    }
  }

  async update(request: Request, response: Response) {
    const { id, description, image, nome, valor, tipo } = request.body;

    await AppDataSource.createQueryBuilder()
      .update(Item)
      .set({
        description_item: description,
        image_item: image,
        valor_item: valor,
        nome_item: nome,
        tipo_item: tipo,
        date_updated_item: new Date(),
      })
      .where("id_item = :id", { id: id })
      .execute();

    const item_up = await AppDataSource.getRepository(Item)
      .createQueryBuilder("item")
      .where("item.id_item = :id", { id: id })
      .getOne();

    return response.json(item_up);
  }
}

export default ItemController;
