import { authenticateToken } from './../middlewares/auth';
import jwt from 'jsonwebtoken';
import authenticatePass from '../middlewares/passCheck';
import { User, users } from './../models/users';
import express, { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';

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
  let Id: number = req.body.id;
  const newUser = {
    id: Id,
    firstName: name,
    lastName: lastName,
    password: bcrypt.hashSync(
      ((password as string) + process.env.PEPPER) as string,
      +(process.env.SALT_ROUNDS as string) as number
    ),
  };
  try {
    const Users = await user.create(newUser);
    const token = jwt.sign(
      { user: Users },
      process.env.ACCESS_TOKEN_SECRET as string
    );
    res.json({ token });
  } catch (err) {
    res.status(400);
    res.json({ message: `can not create new user ${err}` });
  }
};

const checkPass = async (req: Request, res: Response) => {
  let firstname = req.body.firstName;
  let password = req.body.password;
  try {
    const wait = await authenticatePass(firstname, password);
    if (wait) {
      res.status(200).json({ token: wait });
    } else {
      res.status(401).json({ message: 'unauthorized request!' });
    }
  } catch {
    res.json('something went wrong');
  }
};

userRoute.get('/', authenticateToken, index);
userRoute.get('/show', authenticateToken, show);
userRoute.post('/create', create);
userRoute.get('/login', checkPass);

export default userRoute;
