import express, { Request, Response, Router } from 'express';
import { product, Store } from '../models/products';
import { authenticateToken } from '../middlewares/auth';

const store = new Store();

const routesP: Router = express.Router();

const index = async (_req: Request, res: Response) => {
  const returnP = await store.index();
  res.json(returnP);
};

const show = async (req: Request, res: Response) => {
  let id: String = req.params.id;
  try {
    const returnP = await store.show(+id as Number);
    res.json(returnP);
  } catch (err: unknown) {
    throw new Error(
      `can not get the item, maybe try creating it first? ${err}`
    );
  }
};

const create = async (req: Request, res: Response) => {
  let name: String = req.body.name;
  let price: String = req.body.price;
  let Id: String = req.body.id;
  try {
    const returnP = await store.create({
      id: +Id,
      name: name,
      price: +price,
    });
    res.json(returnP);
  } catch (err: unknown) {
    throw new Error(
      `can not get the item, maybe try creating user first? ${err}`
    );
  }
};

routesP.get('/products', index);
routesP.get('products/show', show);
routesP.post('/products/create',authenticateToken, create);

export default routesP;
