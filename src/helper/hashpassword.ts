import * as bcrypt from 'bcrypt';

export async function HashPassword(password: string) {
  const saltOrRounds = 10;

  const hashedPassword = await bcrypt.hash(password, saltOrRounds);

  return hashedPassword;
}
