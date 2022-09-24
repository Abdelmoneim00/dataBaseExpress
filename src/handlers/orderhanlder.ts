import express, { Request, Response, Router } from 'express';
import { Order, orders, orderProduct } from '../models/orders';
import { authenticateToken } from '../middlewares/auth';

const order = new orders();

const orderRoute: Router = express.Router();

const showOrder = async (req: Request, res: Response) => {
  let id = req.body.id;
  const returnP = await order.showOrder(id);
  res.json(returnP);
};

const create = async (req: Request, res: Response) => {
  let userId: number = +req.body.user_id as number;
  let status: string = req.body.status;
  let Id: number = req.body.id;
  try {
    const returnP = await order.createOrder({
      user_id: +userId,
      status: status,
      id: Id,
    });
    res.json(returnP);
  } catch (err: unknown) {
    throw new Error(
      `can not get the item, maybe try creating user first? ${err}`
    );
  }
};

const addNewOrder = async (req : Request, res : Response) => {
  let id : number = req.body.id;
  let product_id : number = req.body.product_id;
  let order_id : string = req.body.order_id;
  let quantity : number = req.body.quantity;
  try {
    const returnO = await order.addOrder({id, order_id, product_id, quantity});
    res.json(returnO)
  } catch(err) {
    throw new Error(`${err}`)
  }  
}

orderRoute.get('/show', authenticateToken, showOrder);
orderRoute.post('/create', authenticateToken, create);
orderRoute.post('/addOrder', authenticateToken, addNewOrder);

export default orderRoute;
