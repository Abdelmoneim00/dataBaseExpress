import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import routes from './handlers/prohandler';
import cors from 'cors';

const app = express();

const address: number = 3000;

app.use(bodyParser.json(), routes);
app.use(cors());
app.get;

app.listen(address, () => {
  console.log(`app is working on localhost:${address}`);
});

export default app;
