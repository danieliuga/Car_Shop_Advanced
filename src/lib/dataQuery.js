"use server"
import prisma from "@/lib/prisma";

export default async function deleteVehicle(id) {
  console.log('ID del vehículo a eliminar:', parseInt(id.toString()));
  const idNumber = parseInt(id.toString());
  try {
    const deletedVehiculo = await prisma.vehiculos.delete({
      where: { id: idNumber },
    });

    return deletedVehiculo
  } catch (error) {
    console.error("Error al eliminar el vehículo:", error);
  }
}

export async function updateVehicle({ id, modelo, precio, stock, descripcion, imagen, tipo_id }) {
  try {
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
    return updatedVehiculo;
  } catch (error) {
    console.log(error.message);
    throw new Error("Error al actualizar el vehículo");
  }
}

export async function deleteUser(id) {
  console.log('ID del usuario a eliminar:', parseInt(id.toString()));
  const idNumber = parseInt(id.toString());
  try {
    const deletedUsuario = await prisma.usuarios.delete({
      where: { id: idNumber },
    });

    return deletedUsuario;
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
  }
}

export async function updateUser({ id, name, email, money, gender }) {
  try {
    const updatedUsuario = await prisma.usuarios.update({
      where: { id: parseInt(id) },
      data: {
        name: name,
        email: email,
        money: parseInt(money),
        gender: gender,
      },
    });
    return updatedUsuario;
  } catch (error) {
    console.log(error.message);
    throw new Error("Error al actualizar el usuario");
  }
}
