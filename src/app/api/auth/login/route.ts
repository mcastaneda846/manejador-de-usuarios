import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { comparePassword } from "@/lib/hash";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { email, password } =
      await request.json();

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Usuario no encontrado",
        },
        { status: 404 }
      );
    }

    const isValid =
      await comparePassword(
        password,
        user.password
      );

    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Contraseña incorrecta",
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        _id: user._id,
        nombre: user.nombre,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error,
      },
      { status: 500 }
    );
  }
}