'use server'

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export async function registerUser(formData: FormData) {
  const username = formData.get('username')?.toString();
  const filier = formData.get('filier')?.toString();
  const phone = formData.get('phone')?.toString();
  const email = formData.get('email')?.toString();

  if (!username || !email) {
    return { error: 'Username and email are required' };
  }

  try {
    // Create table if it doesn't exist (useful for first-time setup on Vercel)
    await sql`
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
    await sql`
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
