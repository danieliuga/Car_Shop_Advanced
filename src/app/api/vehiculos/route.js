import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const data = await prisma.vehiculos.findMany();
    const vehiculos = data;
    return NextResponse.json({ data: vehiculos }, { status: 200 });
    
  } catch (error) {
    console.error('Error al obtener los vehículos:', error);
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get("imagen");

    if (!file) {
      return new NextResponse("No image found", { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filePath = path.join(process.cwd(), "public", file.name);
    await writeFile(filePath, buffer);

    const vehiculo = await prisma.vehiculos.create({
      data: {
        modelo: data.get("modelo"),
        precio: parseInt(data.get("precio")),
        stock: parseInt(data.get("stock")),
        descripcion: data.get("descripcion"),
        imagen: file.name,
        tipo_id: parseInt(data.get("tipo_id"))
      }
    });
    
    console.log('Vehículo creado:', vehiculo);
    return new NextResponse(JSON.stringify(vehiculo.data), {
      headers: { 'Content-Type': 'application/json' },
      status: 201,
    });
  } catch (error) {
    console.error('Error al crear un vehículo:', error);
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, modelo, precio, stock, descripcion, imagen, tipo_id } = await request.json();
    
    const updatedVehiculo = await prisma.vehiculos.update({
      where: { id: parseInt(id) },
      data: {
        modelo: modelo,
        precio: parseInt(precio),
        stock: parseInt(stock),
        descripcion: descripcion,
        imagen: imagen,
        tipo_id: tipo_id,
      },
    });

    console.log('Vehículo actualizado:', updatedVehiculo);

    return new NextResponse(JSON.stringify(updatedVehiculo), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error al actualizar el vehículo:', error);
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function DELETE(request) {
  console.log('request', request);
  try {
    const { id } = await request.json();
    console.log('vehicle deleted id: ' + id);
    const deletedVehiculo = await prisma.vehiculos.delete({
      where: { id: parseInt(id) },
    });

    console.log('Vehículo eliminado:', deletedVehiculo);

    return new NextResponse(JSON.stringify(deletedVehiculo), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error al eliminar el vehículo:', error);
    return new NextResponse(error.message, { status: 500 });
  }
}
