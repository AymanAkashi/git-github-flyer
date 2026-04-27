'use server'

import { createPool } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

function getConnectionString() {
  return process.env.POSTGRES_URL ?? process.env.DATABASE_URL;
}

function readText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === 'string' ? value : undefined;
}

export async function registerUser(formData: FormData) {
  const username = readText(formData, 'username');
  const filier = readText(formData, 'filier');
  const phone = readText(formData, 'phone');
  const email = readText(formData, 'email');

  if (!username || !email) {
    return { error: 'Username and email are required' };
  }

  const connectionString = getConnectionString();
  if (!connectionString) {
    return {
      error:
        'Database is not configured. Add POSTGRES_URL (or DATABASE_URL) in your Vercel environment variables, then redeploy.',
    };
  }

  const db = createPool({ connectionString });

  try {
    // Create table if it doesn't exist (useful for first-time setup on Vercel)
    await db.sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        filier VARCHAR(255),
        phone VARCHAR(50),
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Insert the data
    await db.sql`
      INSERT INTO users (username, filier, phone, email)
      VALUES (${username}, ${filier}, ${phone}, ${email})
    `;

    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    console.error('Error saving to database:', error);
    return { error: error.message || 'Failed to register' };
  }
}
