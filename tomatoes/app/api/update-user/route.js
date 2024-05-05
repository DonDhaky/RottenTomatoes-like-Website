import MySQLAdapter from '../../../lib/next-auth-mysql-adapter.js';
import bcrypt from 'bcrypt';

export const POST = async (req) => {
  const { email, password, userId } = await req.json(); // "await req.json() pour les requêtes POST
  console.log("Ce que je tape dans mon formulaire de modification de données, et mon id : ", email,",", password,",", userId);

  if (!email || !userId) {
    return new Response(
      JSON.stringify({ error: 'Missing informations' }), {
      status: 400,
    });
  }

  const updatedData = { email };

  if (password) {
    updatedData.password = password;
    console.log("Les données qui vont remplacer celles de ma DB : ", updatedData, updatedData.password);
  }

  try {
    await MySQLAdapter.updateUser({ ...updatedData, id: userId });
    return new Response(
      JSON.stringify({ message: 'Updated successfully!' }),
      { status: 200 }
    );
  } 
  catch (error) {
    console.error("Erreur lors de la mise à jour : ", error);
    return new Response(
      JSON.stringify({ error: 'Error updating user' }),
      { status: 500 }
    );
  }
}
