"use client"
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./vehiculo.module.css";
import deleteVehicle, { updateVehicle } from "@/lib/dataQuery";
import VolverAtras from "../Components/volverAtras";
import VehiculosModal from "../Components/VehiculosModal";
import VehiculosList from "../Components/VehiculosList";

type Vehiculo = {
  id: number;
  modelo: string;
  precio: number;
  stock: number;
  descripcion: string;
  imagen: string;
  tipo_id: number;
};

export default function Home() {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentVehiculoId, setCurrentVehiculoId] = useState<number | null>(null);
  const [newVehiculo, setNewVehiculo] = useState({
    modelo: "",
    precio: 0,
    stock: 0,
    descripcion: "",
    imagen: "",
    tipo_id: 1,
  });

  useEffect(() => {
    async function fetchVehiculos() {
      try {
        const res = await axios.get("/api/vehiculos");
        const vehiculosWithImage = res.data.data.map((vehiculo: any) => ({
          ...vehiculo,
          imagen: vehiculo.imagen || 'default-image-path.jpg',
        }));
        setVehiculos(vehiculosWithImage);
      } catch (error) {
        console.error("Error fetching vehiculos:", error);
      }
    }
    fetchVehiculos();
  }, []);

  const handleUpdate = (vehiculo: Vehiculo) => {
    setIsEditing(true);
    setCurrentVehiculoId(vehiculo.id);
    setNewVehiculo({
      modelo: vehiculo.modelo,
      precio: vehiculo.precio,
      stock: vehiculo.stock,
      descripcion: vehiculo.descripcion,
      imagen: typeof vehiculo.imagen === 'string' ? vehiculo.imagen : '',
      tipo_id: vehiculo.tipo_id,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    await deleteVehicle(id);
    setVehiculos(vehiculos.filter((vehiculo) => vehiculo.id !== id));
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewVehiculo({
      ...newVehiculo,
      [name]: name === "tipo_id" ? parseInt(value) : value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileName = files[0].name;
      setNewVehiculo({
        ...newVehiculo,
        imagen: fileName,
      });
    }
  }; 
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = newVehiculo.imagen;
    console.log('Image URL: ' + imageUrl);

    const vehiculoData = { ...newVehiculo, imagen: imageUrl};

    if (isEditing && currentVehiculoId !== null) {
      try {
        const updatedVehiculo = await updateVehicle({
          id: currentVehiculoId,
          ...vehiculoData,
        });
        setVehiculos(vehiculos.map((vehiculo) =>
          vehiculo.id === currentVehiculoId ? updatedVehiculo : vehiculo
        ));
        setIsModalOpen(false);
        setIsEditing(false);
        setCurrentVehiculoId(null);
      } catch (error) {
        console.error("Error al actualizar el vehículo:", error);
      }
    } else {
      try {
        const res = await axios.post("/api/vehiculos", vehiculoData);
        setVehiculos([...vehiculos, res.data.data]);
        setIsModalOpen(false);
        setNewVehiculo({
          modelo: "",
          precio: 0,
          stock: 0,
          descripcion: "",
          imagen: "",
          tipo_id: 1,
        });
      } catch (error) {
        console.error("Error al añadir el vehículo:", error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Lista de Vehículos</h1>
        <button
          onClick={() => {
            setIsEditing(false);
            setNewVehiculo({
              modelo: "",
              precio: 0,
              stock: 0,
              descripcion: "",
              imagen: "",
              tipo_id: 1,
            });
            setIsModalOpen(true);
          }}
          className={styles.addButton}
        >
          Añadir Vehículo
        </button>
      </header>

      <VehiculosModal
        isModalOpen={isModalOpen}
        isEditing={isEditing}
        newVehiculo={newVehiculo}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        handleSubmit={handleSubmit}
        closeModal={() => setIsModalOpen(false)}
      />

      <VehiculosList
        vehiculos={vehiculos}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />

      <VolverAtras />
    </div>
  );
}
