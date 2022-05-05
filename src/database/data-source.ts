import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "ec2-3-211-6-217.compute-1.amazonaws.com",
  port: 5432,
  database: "d1coq0t3mj0lpi",
  username: "aoxmfikkdxxjou",
  password: "ebec3ab69c01f09335f21da850f2943f1d5b8a10328b8ffb844e98394941d0cd",
  applicationName: "api-petiticos",
  synchronize: true,
  logging: true,
  entities: ["./src/database/entity/*.ts"],
  migrationsTableName: "migration_table",
  migrations: ["./src/database/migrations/*.ts"],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source foi inicializado com sucesso!");
  })
  .catch((err) => {
    console.error("Erro durante a inicialização do Data Source...", err);
  });
