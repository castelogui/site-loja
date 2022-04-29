import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Login } from "../database/entity/Login";
import { User } from "../database/entity/User";
import Querys from "../database/querys";

const querys = new Querys();

class UserController {
  async create(request: Request, response: Response) {
    const user = new User();

    const {
      first_name,
      last_name,
      contato,
      type,
      endereco,
      password,
      username,
    } = request.body;

    const user_registrado = await AppDataSource.getRepository(User)
      .createQueryBuilder("user")
      .where("user.username_user = :username", { username: username })
      .getOne();
    if (!user_registrado) {
      user.first_name_user = first_name;
      user.last_name_user = last_name;
      user.type_user = type;
      user.username_user = username;
      user.password_user = password;
      user.contato_user = contato;
      user.endereco_user = endereco;
      user.date_created_user = new Date();
      user.date_updated_user = new Date();
      user.filhos_user = "";

      await AppDataSource.manager.save(user);
      return response.json(user);
    } else {
      return response.json({ error: "username ja existe" });
    }
  }

  async login(request: Request, response: Response) {
    const { username, password } = await request.body;

    console.log(username, password);

    const user_login = await AppDataSource.getRepository(User)
      .createQueryBuilder("user")
      .where("user.username_user = :username", { username: username })
      .getOne();

    if (user_login == null) {
      return response.json({
        error: "usuario invalido",
        message: "user não encontrado",
        dados: {
          username,
          password,
        },
      });
    }

    if (user_login?.password_user == password) {
      const login = new Login();
      login.id_user = user_login.id_user;
      login.username_user = user_login.username_user;
      login.date_login_user = new Date();
      await AppDataSource.manager.save(login);
      return response.json(user_login);
    } else {
      return response.json({
        error: "senha invalida",
        message: "senha invalida",
      });
    }
  }

  async usersLogados(request: Request, response: Response) {
    const user = await AppDataSource.manager.find(Login);
    console.log(user);

    return response.json(user);
  }

  async dropUser(request: Request, response: Response) {
    const id_user = request.params;

    try {
      const user = await AppDataSource.getRepository(User)
        .createQueryBuilder("user")
        .where("user.id_user = :id_user", id_user)
        .getOne();

      if (user) {
        await AppDataSource.createQueryBuilder()
          .delete()
          .from(User)
          .where("id_user = :id_user", id_user)
          .execute();

        return response.json("deleted sucess");
      } else {
        return response.json({
          error: "error",
          message: "user nao encontrado",
        });
      }
    } catch (error) {
      return response.json({
        error: error,
        message: "falha ao deletar usuario",
      });
    }
  }

  async logout(request: Request, response: Response) {
    const { username } = request.body;
    try {
      const user_logado = await AppDataSource.getRepository(Login)
        .createQueryBuilder("login")
        .where("login.username_user = :username", { username: username })
        .getOne();

      if (user_logado) {
        await AppDataSource.createQueryBuilder()
          .delete()
          .from(Login)
          .where("username_user = :username", { username: username })
          .execute();
        return response.json("logout sucess");
      } else {
        return response.json({
          error: "error",
          message: "user nao encontrado",
        });
      }
    } catch (error) {
      return response.json({
        error: error,
        message: "falha ao realizar logout",
      });
    }
  }

  async find(request: Request, response: Response) {
    const user = await querys.findUsers();
    response.json(user);
  }

  async findOne(request: Request, response: Response) {
    const { id } = request.body;
    const { user } = await querys.findOneUser(id);
    return response.json(user);
  }

  async update(request: Request, response: Response) {
    const { id, first_name, last_name, contato, endereco, filhos } =
      request.body;

    await AppDataSource.createQueryBuilder()
      .update(User)
      .set({
        first_name_user: first_name,
        last_name_user: last_name,
        contato_user: contato,
        endereco_user: endereco,
        date_updated_user: new Date(),
        filhos_user: filhos,
      })
      .where("id_user = :id", { id: id })
      .execute();

    const user_up = await querys.findOneUser(id);
    return response.json(user_up);
  }
}

export default UserController;
