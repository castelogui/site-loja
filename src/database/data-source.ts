import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  database: "ubuntu",
  username: "ubuntu",
  password: "psql",
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
