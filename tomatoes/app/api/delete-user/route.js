import MySQLAdapter from '../../../lib/mysql';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { userId } = req.body;

  if (!userId) {
    res.status(400).json({ error: 'User ID missing' });
    return;
  }

  try {
    await MySQLAdapter.deleteUserById(userId);
    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while trying to delete account !' });
  }
}
