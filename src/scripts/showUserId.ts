import { db } from '../db';
import { users } from '../db/schema/core';
import { eq } from 'drizzle-orm';

async function main() {
  const email = 'testuser@example.com';

  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (user) {
    console.log(`✅ User found: ID = ${user.id}, Email = ${user.email}`);
  } else {
    console.log('❌ No user found with that email.');
  }

  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Error:', err);
  process.exit(1);
});
