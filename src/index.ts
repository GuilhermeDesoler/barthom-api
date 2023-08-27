import express, { Request, Response } from "express";

import { config } from "dotenv";
import { GetUsersController } from "./controllers/get-users/get-users";
import { MongoGetUsersRepositoryImpl } from "./repositories/get-users/mongo-get-users";
import { MongoClient } from "./database/mongo";
import { MongoCreateUserRepositoryImpl } from "./repositories/create-user/mongo-create-user";
import { CreateUserController } from "./controllers/create-user/create-user";

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

  app.listen(port, () => console.log("Listening on port", port));
};

main();
