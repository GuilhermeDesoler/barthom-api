import express, { Response } from "express";

import { config } from "dotenv";
import { GetUsersController } from "./controllers/get-users/get-users";
import { MongoGetUsersRepositoryImpl } from "./repositories/get-users/mongo-get-users";

config();

const app = express();

const port = process.env.PORT || 8000;

app.get("/users", async (_, res: Response) => {
  const mongoGetUsersRepository = new MongoGetUsersRepositoryImpl();
  const getUSersController = new GetUsersController(mongoGetUsersRepository);

  const { body, statusCode } = await getUSersController.handle();

  res.status(statusCode).send(body);
});

app.listen(port, () => console.log("Listening on port", port));
