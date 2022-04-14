import "reflect-metadata";
import { DataSource } from "typeorm";
import { Pedido } from "./entity/Pedido";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/database/database.sqlite3",
  synchronize: true,
  logging: true,
  entities: [Pedido],
  subscribers: [],
  migrations: ["./migrations"],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source foi inicializado com sucesso!");
  })
  .catch((err) => {
    console.error("Erro durante a inicialização do Data Source...", err);
  });
