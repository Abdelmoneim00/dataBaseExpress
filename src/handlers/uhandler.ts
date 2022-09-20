import { User, users } from './../models/users';
import express, { Request, Response, Router } from 'express';

const user = new users();

const routesP: Router = express.Router();

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
  let lastName : string = req.body.lastName;
  let password: String = req.body.password;
  let Id: String = req.body.id;
  try {
    const returnP = await user.create({
      id: +Id,
      firstName: name,
      lastName : lastName,
      password : password,
    });
    res.json(returnP);
  } catch (err: unknown) {
    throw new Error(
      `can not create the user, an internal error occured? ${err}`
    );
  }
};

routesP.get('/users', index);
routesP.get('users/show', show);
routesP.post('/users/create', create);

export default routesP;