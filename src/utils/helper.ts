import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt/dist';
import { jwtSecret } from 'src/utils/constants';

const jwt = new JwtService();

export async function HashPassword(password: string) {
  const saltOrRounds = 10;

  const hashedPassword = await bcrypt.hash(password, saltOrRounds);

  return hashedPassword;
}

export async function comparePasswords(args: {
  password: string;
  hashPassword: string;
}) {
  return await bcrypt.compare(args.password, args.hashPassword);
}

export async function signToken(args: { id: string; email: string }) {
  const payload = args;

  console.log('jwtSecret: ', jwtSecret);

  return jwt.signAsync(payload, { secret: jwtSecret });
}

// {
//   "email": "b@b.com",
//   "password": "bbb"
// }
