import { NextResponse } from "next/server";
import { query } from "../../../../lib/mysql";
import bcrypt from "bcrypt";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { email, username, password } = body;

    if (!email || !username || !password) {
      return NextResponse.json(
        { error: "Tous les champs sont obligatoires pour vous inscrire !" },
        { status: 400 }
      );
    }

    const existingUser = await query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "Cet email est déjà utilisé sur le site !" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await query(
      "INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
      [email, username, hashedPassword]
    );

    return NextResponse.json({ message: "Utilisateur créé avec succès" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Une erreur s'est produite lors de la tentative d'inscription !" },
      { status: 500 }
    );
  }
};