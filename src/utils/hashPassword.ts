import bcrypt from 'bcrypt';

async function hashPassword(plainTextPassword: string) {
  const saltRounds = 12; // strong but not overkill
  const hash = await bcrypt.hash(plainTextPassword, saltRounds);
  console.log(`Your hashed password: ${hash}`);
}

hashPassword('placeHolderPassword'); // replace with your actual password
