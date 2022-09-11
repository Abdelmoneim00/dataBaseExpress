import {Store} from "./models/products"
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();

const address: string = '0.0.0.0:3000';

app.use(bodyParser.json());

app.get('/products', (req: Request, res: Response) => {
  res.send(`${Store}`)
});

app.listen(3000, () => {
  `app is working on ${address}`;
});

export default app;
