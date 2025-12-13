import * as bcrypt from 'bcrypt';

const CRYPT_SALT = Number(process.env.CRYPT_SALT);

export const hashPassword = async (password: string, salt = CRYPT_SALT) =>
  await bcrypt.hash(password, salt);

export const checkPassword = async (password: string, hash: string) =>
  await bcrypt.compare(password, hash);
