import express, { Request, Response } from "express";

import { config } from "dotenv";
import { GetUsersController } from "./controllers/get-users/get-users";
import { MongoGetUsersRepositoryImpl } from "./repositories/get-users/mongo-get-users";
import { MongoClient } from "./database/mongo";
import { MongoCreateUserRepositoryImpl } from "./repositories/create-user/mongo-create-user";
import { CreateUserController } from "./controllers/create-user/create-user";
import { MongoUpdateUserRepositoryImpl } from "./repositories/update-user/mongo-update-user";
import { UpdateUserController } from "./controllers/update-user/update-user";
import { DeleteUserController } from "./controllers/delete-user/delete-user";
import { MongoDeleteUserRepositoryImpl } from "./repositories/delete-user/mongo-delete-user";

const main = async () => {
  config();

  const app = express();
  const port = process.env.PORT || 8000;

  app.use(express.json());

  await MongoClient.connect();

  app.get("/users", async (_, res: Response) => {
    const mongoGetUsersRepository = new MongoGetUsersRepositoryImpl();
    const getUsersController = new GetUsersController(mongoGetUsersRepository);

    const { body, statusCode } = await getUsersController.handle();

    res.status(statusCode).send(body);
  });

  app.post("/users", async (req: Request, res: Response) => {
    const mongoCreateUserRepository = new MongoCreateUserRepositoryImpl();
    const createUserController = new CreateUserController(
      mongoCreateUserRepository
    );

    const { body, statusCode } = await createUserController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  app.patch("/users/:id", async (req: Request, res: Response) => {
    const mongoUpdateUserRespository = new MongoUpdateUserRepositoryImpl();
    const updateUserController = new UpdateUserController(
      mongoUpdateUserRespository
    );

    const { body, statusCode } = await updateUserController.handle({
      body: req.body,
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  app.delete("/users/:id", async (req: Request, res: Response) => {
    const mongoDeleteUserRespository = new MongoDeleteUserRepositoryImpl();
    const deleteUserController = new DeleteUserController(
      mongoDeleteUserRespository
    );

    const { body, statusCode } = await deleteUserController.handle({
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  app.listen(port, () => console.log("Listening on port", port));
};

main();
