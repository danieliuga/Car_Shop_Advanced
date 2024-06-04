"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./vehiculo.module.css";
import deleteVehicle, { updateVehicle } from "@/lib/dataQuery";
import VolverAtras from "../Components/volverAtras";
import VehiculosModal from "../Components/VehiculosModal";
import VehiculosList from "../Components/VehiculosList";
import { IoCarSport } from "react-icons/io5";
import { GiFullMotorcycleHelmet } from "react-icons/gi";

type Vehiculo = {
  id: number;
  modelo: string;
  precio: number;
  stock: number;
  descripcion: string;
  imagen: File | string;
  tipo_id: number;
};

export default function Home() {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [fileImage, setFileImage] = useState<File | null>(null);
  const [currentVehiculoId, setCurrentVehiculoId] = useState<number | null>(null);
  const [newVehiculo, setNewVehiculo] = useState({
    modelo: "",
    precio: 0,
    stock: 0,
    descripcion: "",
    imagen: "",
    tipo_id: 1,
  });

  const fetchVehiculos = async () => {
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
  };

  useEffect(() => {
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
      const file = files[0];
      setFileImage(file)
      const reader = new FileReader();
  
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const dataURL = event.target.result as string;
  
          setNewVehiculo({
            ...newVehiculo,
            imagen: dataURL,
          });
          
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!newVehiculo.modelo || !newVehiculo.precio || !newVehiculo.stock || !newVehiculo.descripcion || !newVehiculo.tipo_id) {
      console.log("Por favor complete todos los campos");
      return;
    }
  
    const formData = new FormData();
    formData.append("modelo", newVehiculo.modelo);
    formData.append("precio", newVehiculo.precio.toString());
    formData.append("stock", newVehiculo.stock.toString());
    formData.append("descripcion", newVehiculo.descripcion);
    formData.append("tipo_id", newVehiculo.tipo_id.toString());
    if (fileImage) {
      formData.append("imagen", fileImage);
    }
    console.log(formData.get("imagen"));
    
    try {
      console.log('currentVehiculoId: ' , currentVehiculoId);

      const res = isEditing && currentVehiculoId !== null
        ? await axios.put(`/api/vehiculos/${currentVehiculoId}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
        : await axios.post("/api/vehiculos", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
  
      setVehiculos(
        isEditing && currentVehiculoId !== null
          ? vehiculos.map((vehiculo) =>
              vehiculo.id === currentVehiculoId ? res.data.data : vehiculo
            )
          : [...vehiculos, res.data.data]
      );
      setIsModalOpen(false);
      setNewVehiculo({
        modelo: "",
        precio: 0,
        stock: 0,
        descripcion: "",
        imagen: "",
        tipo_id: 1,
      });
      setIsEditing(false);
      setCurrentVehiculoId(null);
      fetchVehiculos();
    } catch (error) {
      console.error(`Error al ${isEditing ? "actualizar" : "añadir"} el vehículo:`, error);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}><GiFullMotorcycleHelmet /> Lista de Vehículos <IoCarSport /></h1>
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
