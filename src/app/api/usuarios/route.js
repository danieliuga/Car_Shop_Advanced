import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const data = await prisma.usuarios.findMany();
    const usuarios = data;
    return NextResponse.json({ data: usuarios }, { status: 200 });
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    console.log('data object', data);
    const usuario = await prisma.usuarios.create({
      data: {
        name: data.name,
        email: data.email,
        money: parseInt(data.money),
        gender: data.gender,
      }
    });
    console.log('Usuario creado:', usuario);
    return new NextResponse(JSON.stringify(usuario), {
      headers: { 'Content-Type': 'application/json' },
      status: 201,
    });
  } catch (error) {
    console.error('Error al crear un usuario:', error);
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, name, email, money, gender } = await request.json();
    
    const updatedUsuario = await prisma.usuarios.update({
      where: { id: parseInt(id) },
      data: {
        name: name,
        email: email,
        money: parseInt(money),
        gender: gender,
      },
    });

    console.log('Usuario actualizado:', updatedUsuario);

    return new NextResponse(JSON.stringify(updatedUsuario), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function DELETE(request) {
  console.log('request', request);
  try {
    const { id } = await request.json();
    console.log('Usuario eliminado id: ' + id);
    const deletedUsuario = await prisma.usuarios.delete({
      where: { id: parseInt(id) },
    });

    console.log('Usuario eliminado:', deletedUsuario);

    return new NextResponse(JSON.stringify(deletedUsuario), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    return new NextResponse(error.message, { status: 500 });
  }
}
