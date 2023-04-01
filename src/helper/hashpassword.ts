import * as bcrypt from 'bcrypt';

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
