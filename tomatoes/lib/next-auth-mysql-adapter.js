import { query } from './mysql';

const MySQLAdapter = {
  async getUser(id) {
    const result = await query('SELECT * FROM users WHERE id = ?', [id]);
    return result.length ? result[0] : null;
  },
  async getUserByEmail(email) {
    const result = await query('SELECT * FROM users WHERE email = ?', [email]);
    return result.length ? result[0] : null;
  },
  async createUser(user) {
    const result = await query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [user.username, user.mail, user.password]
    );
    return { id: result.insertId, ...user };
  },
  async updateUser(user) {
    await query(
      'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?',
      [user.username, user.email, user.password, user.id]
    );
    return user;
  },
  async deleteUser(email) {
    await query('DELETE FROM users WHERE email = ?', [email]);
  },
  async deleteUserById(id) {
    await query('DELETE FROM users WHERE id = ?', [id]);
  },
//   async getSessionAndUser(sessionToken) {
//     const session = await query(
//       'SELECT * FROM sessions WHERE sessionToken = ?',
//       [sessionToken]
//     );
//     if (!session.length) return null;

//     const user = await this.getUser(session[0].userId);
//     return { session: session[0], user };
//   },
//   async createSession(session) {
//     await query(
//       'INSERT INTO sessions (sessionToken, userId, expires) VALUES (?, ?, ?)',
//       [session.sessionToken, session.userId, session.expires]
//     );
//     return session;
//   },
//   async deleteSession(sessionToken) {
//     await query('DELETE FROM sessions WHERE sessionToken = ?', [sessionToken]);
//   },
//   async updateSession(session) {
//     await query(
//       'UPDATE sessions SET userId = ?, expires = ? WHERE sessionToken = ?',
//       [session.userId, session.expires, session.sessionToken]
//     );
//     return session;
//   },
//   async linkAccount(account) {
//     await query(
//       'INSERT INTO accounts (userId, provider, providerAccountId, type) VALUES (?, ?, ?, ?)',
//       [account.userId, account.provider, account.providerAccountId, account.type]
//     );
//     return account;
//   },
//   async unlinkAccount(providerAccountId) {
//     await query('DELETE FROM accounts WHERE providerAccountId = ?', [providerAccountId]);
//   },
};

export default MySQLAdapter;