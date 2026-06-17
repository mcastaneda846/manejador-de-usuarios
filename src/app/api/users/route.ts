import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { hashPassword } from "@/lib/hash";
import { sendWelcomeEmail } from "@/lib/mailer";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    if (!body.nombre || !body.email || !body.password) {
      return NextResponse.json(
        { success: false, message: "Datos incompletos" },
        { status: 400 }
      );
    }

    const exists = await User.findOne({ email: body.email });

    if (exists) {
      return NextResponse.json(
        { success: false, message: "El email ya existe" },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(body.password);

    const user = await User.create({
      nombre: body.nombre,
      cc: body.cc,
      email: body.email,
      password: hashedPassword,
      role: body.role || "user",
    });

    // ENVIAR EMAIL DE BIENVENIDA (nuevo)
    await sendWelcomeEmail(
      user.email,
      user.nombre,
      user.email
    );

    return NextResponse.json(
      {
        success: true,
        user: {
          _id: user._id,
          nombre: user.nombre,
          email: user.email,
          cc: user.cc,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error interno del servidor",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const users = await User.find().select("-password");

    return NextResponse.json({
      success: true,
      users,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error al obtener usuarios",
      },
      { status: 500 }
    );
  }
}