import { AppDataSource } from "./data-source";
import { Pedido } from "./entity/Pedido";
import { User } from "./entity/User";

class Querys {
  async findOneUser(id: string) {
    const user = await AppDataSource.getRepository(User)
      .createQueryBuilder("user")
      .where("user.id_user = :id", { id: id })
      .getOne();
    return { user };
  }
  async findUsers() {
    return await AppDataSource.manager.find(User);
  }
  async dropPedido(id: number) {
    try {
      AppDataSource.createQueryBuilder()
        .delete()
        .from(Pedido)
        .where("pedido.id_pedido = :id", { id: id })
        .execute();
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

export default Querys;
