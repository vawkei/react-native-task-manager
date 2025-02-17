import { createDatabase } from "typeorm-extension";
import { AppDataSource } from "./dbSetup";

export const dbCreate = async () => {
  await createDatabase({
    ifNotExist: true,
    options: AppDataSource.options,
  });
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
    console.log("Database connection initialized...");
  } else {
    console.log("Database connection already initialized...");
  }
};
