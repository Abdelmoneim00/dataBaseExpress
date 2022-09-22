import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import productRoute from './handlers/prohandler';
import cors from 'cors';
import userRoute from './handlers/uhandler';
import orderRoute from './handlers/orderhanlder';

const app = express();

const address: number = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use('/products', productRoute);
app.use('/users', userRoute);
app.use('/orders', orderRoute);

app.listen(address, () => {
  console.log(`app is working on localhost:${address}`);
});

export default app;
