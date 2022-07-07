import * as jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import { config } from 'dotenv';
config();

export function verifyJWTToken(token): Promise<string> {
  const decodedToken = jwt_decode(token);
  return decodedToken['data'];
}

export function createJWToken(user_id) {
  return jwt.sign(
    {
      data: user_id,
    },
    process.env.SECRET,
    {
      expiresIn: 10000000000,
      algorithm: 'HS256',
    },
  );
}
