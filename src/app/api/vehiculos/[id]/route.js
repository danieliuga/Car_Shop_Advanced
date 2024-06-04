// "use server"
// import prisma from "@/lib/prisma";

// export default async function deleteVehicle(id) {
//     const idNumber = parseInt(id.toString());
//     console.log('ID del vehículo a eliminar:', idNumber);
//     try {
//         const deletedVehiculo = await prisma.vehiculos.delete({
//             where: { id: idNumber },
//         });
//         return deletedVehiculo;
//     } catch (error) {
//         console.error("Error al eliminar el vehículo:", error);
//         throw new Error("Error al eliminar el vehículo");
//     }
// }

// export async function updateVehicle({ id, modelo, precio, stock, descripcion, imagen, tipo_id }) {
//     const idNumber = parseInt(id.toString());
//     console.log('ID del vehículo a actualizar:', idNumber);
//     try {
//         const updatedVehiculo = await prisma.vehiculos.update({
//             where: { id: idNumber },
//             data: {
//                 modelo: modelo,
//                 precio: parseInt(precio),
//                 stock: parseInt(stock),
//                 descripcion: descripcion,
//                 imagen: imagen,
//                 tipo_id: tipo_id,
//             },
//         });
//         return updatedVehiculo;
//     } catch (error) {
//         console.log(error.message);
//         throw new Error("Error al actualizar el vehículo");
//     }
// }

// export async function deleteUser(id) {
//     const idNumber = parseInt(id.toString());
//     console.log('ID del usuario a eliminar:', idNumber);
//     try {
//         const deletedUsuario = await prisma.usuarios.delete({
//             where: { id: idNumber },
//         });
//         return deletedUsuario;
//     } catch (error) {
//         console.error("Error al eliminar el usuario:", error);
//         throw new Error("Error al eliminar el usuario");
//     }
// }

// export async function updateUser({ id, name, email, money, gender }) {
//     const idNumber = parseInt(id.toString());
//     console.log('ID del usuario a actualizar:', idNumber);
//     try {
//         const updatedUsuario = await prisma.usuarios.update({
//             where: { id: idNumber },
//             data: {
//                 name: name,
//                 email: email,
//                 money: parseInt(money),
//                 gender: gender,
//             },
//         });
//         return updatedUsuario;
//     } catch (error) {
//         console.log(error.message);
//         throw new Error("Error al actualizar el usuario");
//     }
// }