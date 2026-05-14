import pkg from 'pg';
const { Pool } = pkg;
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';

class UserRepositories {
  constructor() {
    this.pool = new Pool(); 
  }

  async createUser({ username, password, fullname }) {
    // Tambahkan prefix 'user-' agar lebih spesifik (opsional, tapi umum di Dicoding)
    const id = `user-${nanoid(16)}`; 
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
  
    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, username, hashedPassword, fullname, createdAt, updatedAt],
    };
  
    // PERBAIKAN: Gunakan this.pool (hapus underscore)
    const result = await this.pool.query(query);
    return result.rows[0]; 
  }

  async verifyNewUsername(username) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };
  
    // PERBAIKAN: Gunakan this.pool
    const result = await this.pool.query(query);
    return result.rows.length > 0;
  }

  // Tambahkan fungsi ini agar getUserById di controller tidak error
  async getUserById(id) {
    const query = {
      text: 'SELECT id, username, fullname, created_at, updated_at FROM users WHERE id = $1',
      values: [id],
    };
    const result = await this.pool.query(query);
    return result.rows[0];
  }
}

export default UserRepositories;