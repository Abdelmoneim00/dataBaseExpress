import express, { Request, Response, Router } from 'express';
import { Order, orders } from '../models/orders';

const order = new orders();

const routesP: Router = express.Router();

const showOrder = async (req: Request, res: Response) => {
  let id = req.body.id  
  const returnP = await order.showOrder(id);
  res.json(returnP);
};

const create = async (req: Request, res: Response) => {
  let userId : number = +req.body.userId
  let status : string = req.body.status;
  let Id: number = +req.body.id;
  let quantity : number = +req.body.quantity;
  let productId : number = req.body.product_id
  try {
    const returnP = await order.createOrder({
        user_id : userId,
        status : status,
        id : Id,
        quantity : [quantity],
        product_id : [productId]
    });
    res.json(returnP);
  } catch (err: unknown) {
    throw new Error(
      `can not get the item, maybe try creating user first? ${err}`
    );
  }
};

routesP.get('orders/show', showOrder);
routesP.post('/orders/create', create);

export default routesP;