import express, { Request, Response } from "express";

import { config } from "dotenv";
import { GetUsersController } from "./controllers/user-controllers/get-users/get-users";
import { MongoClient } from "./database/mongo";
import { CreateUserController } from "./controllers/user-controllers/create-user/create-user";
import { UpdateUserController } from "./controllers/user-controllers/update-user/update-user";
import { DeleteUserController } from "./controllers/user-controllers/delete-user/delete-user";
import { MongoCreateUserRepositoryImpl } from "./repositories/user-repositories/create-user/mongo-create-user";
import { MongoGetUsersRepositoryImpl } from "./repositories/user-repositories/get-users/mongo-get-users";
import { MongoUpdateUserRepositoryImpl } from "./repositories/user-repositories/update-user/mongo-update-user";
import { MongoDeleteUserRepositoryImpl } from "./repositories/user-repositories/delete-user/mongo-delete-user";
import { MongoGetProductsRepositoryImpl } from "./repositories/product-respositories/get-products/mongo-get-products";
import { GetProductsController } from "./controllers/product-controllers/get-products/get-products";
import { MongoGetProductByIdRepositoryImpl } from "./repositories/product-respositories/get-product-by-id/mongo-get-product-by-id";
import { GetProductByIdController } from "./controllers/product-controllers/get-product-by-id/get-product-by-id";

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

  app.get("/products", async (_, res: Response) => {
    const mongoGetProductsRepository = new MongoGetProductsRepositoryImpl();
    const getProductsController = new GetProductsController(
      mongoGetProductsRepository
    );

    const { body, statusCode } = await getProductsController.handle();

    res.status(statusCode).send(body);
  });

  app.get("/products/:id", async (req: Request, res: Response) => {
    const mongoGetProductByIdRepository =
      new MongoGetProductByIdRepositoryImpl();
    const getProductByIdController = new GetProductByIdController(
      mongoGetProductByIdRepository
    );

    const { body, statusCode } = await getProductByIdController.handle({
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  app.listen(port, () => console.log("Listening on port", port));
};

main();
