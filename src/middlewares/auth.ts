import jwt from 'jsonwebtoken';
import express from 'express';

export const authenticateToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null || undefined || '') {
    return res.sendStatus(401);
  } else {
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
      (err, user) => {
        if (err) return res.sendStatus(403);
        req.body.user = user;
        next();
      }
    );
  }
};
