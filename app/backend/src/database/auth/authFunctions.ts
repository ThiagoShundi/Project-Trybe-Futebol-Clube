import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

const createToken = (data: string) => jwt.sign({ data }, secret, {
  algorithm: 'HS256',
  expiresIn: '7d',
});

const verifyToken = (token: string) => jwt.verify(token, secret);

export { createToken, verifyToken };
