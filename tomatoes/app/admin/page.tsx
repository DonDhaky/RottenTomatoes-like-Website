import MySQLAdapter from '@/lib/next-auth-mysql-adapter';
import 'tailwindcss/tailwind.css';

type User = {
    id: number;
    username: string;
    email: string;
    password: string;
};

// This is a Next.js page that displays all users
export default async function UsersPage() {
  // Retrieve all users from the database
  const users = await MySQLAdapter.getAllUsers() as User[];

  // Render the users
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8">
      <div className="mb-6 flex justify-center">
        <h2 className="text-2xl font-semibold">Users</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map((user) => (
          <div key={user.id} className="col-span-full">
            <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {user.username}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {user.email}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {user.id}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}