import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    await User.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Usuario eliminado",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error,
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await request.json();

const updateData: any = {
  nombre: body.nombre,
  cc: body.cc,
  email: body.email,
  role: body.role,
};

// solo actualizar password si viene
if (body.password) {
  updateData.password = body.password;
}

const updatedUser = await User.findByIdAndUpdate(
  id,
  updateData,
  {
    new: true,
  }
);

    return NextResponse.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error,
      },
      {
        status: 500,
      }
    );
  }
}