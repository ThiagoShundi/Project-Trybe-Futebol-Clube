import { NextFunction, Request, Response } from 'express';

function validateEmail(email: string) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export default function validateLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400)
      .json({ message: 'All fields must be filled' });
  }

  if (!validateEmail(email)) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  if (password.length < 6) {
    return res.status(401)
      .json({ message: 'Invalid email or password' });
  }

  return next();
}
