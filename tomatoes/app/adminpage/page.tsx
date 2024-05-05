import MySQLAdapter from '@/lib/next-auth-mysql-adapter';

type User = {
    id: number;
    username: string;
    email: string;
};

// This is a Next.js page that displays all users
export default async function UsersPage() {
  // Retrieve all users from the database
  const users = await MySQLAdapter.getAllUsers() as User[];

  // Render the users
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.username} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
}
