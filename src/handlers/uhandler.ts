import { authenticateToken } from './../middlewares/auth';
import jwt from 'jsonwebtoken';
import { User, users } from './../models/users';
import express, { Request, Response, Router } from 'express';

const user = new users();

const userRoute: Router = express.Router();

const index = async (_req: Request, res: Response) => {
  const returnP = await user.index();
  res.json(returnP);
};

const show = async (req: Request, res: Response) => {
  let id: String = req.params.id;
  try {
    const returnP = await user.show(+id as Number);
    res.json(returnP);
  } catch (err: unknown) {
    throw new Error(
      `can not get the user, maybe try creating it first? ${err}`
    );
  }
};

const create = async (req: Request, res: Response) => {
  let name: String = req.body.firstName;
  let lastName: string = req.body.lastName;
  let password: String = req.body.password;
  let Id: String = req.body.id;
  const newUser = {
    id: +Id,
    firstName: name,
    lastName: lastName,
    password: password,
  };
  try {
    const returnP = await user.create(newUser);
    const token = jwt.sign(
      { newUser: returnP },
      process.env.ACCESS_TOKEN_SECRET as string
    );
    res.json(token);
  } catch (err: unknown) {
    res.status(400);
    throw new Error(
      `can not create the user, an internal error occured? ${err}`
    );
  }
};

userRoute.get('/', authenticateToken, index);
userRoute.get('/show', authenticateToken, show);
userRoute.post('/create', create);

export default userRoute;
