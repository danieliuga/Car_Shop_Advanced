"use client"
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./usuario.module.css";
import deleteUser, { updateUser } from "@/lib/dataQuery";
import VolverAtras from "../Components/volverAtras";
import UsuariosModal from "../Components/UsuariosModal";
import UsuariosList from "../Components/UsuariosList";

type Usuario = {
  id: number;
  name: string;
  email: string;
  money: number;
  gender: string;
};

export default function Home() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUsuarioId, setCurrentUsuarioId] = useState<number | null>(null);
  const [newUsuario, setNewUsuario] = useState({
    name: "",
    email: "",
    money: 0,
    gender: "",
  });

  const fetchUsuarios = async () => {
    try {
      const res = await axios.get("/api/usuarios");
      setUsuarios(res.data.data);
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleUpdate = (usuario: Usuario) => {
    setIsEditing(true);
    setCurrentUsuarioId(usuario.id);
    setNewUsuario({
      name: usuario.name,
      email: usuario.email,
      money: usuario.money,
      gender: usuario.gender,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewUsuario({
      ...newUsuario,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && currentUsuarioId !== null) {
      try {
        const updatedUsuario = await updateUser({
          id: currentUsuarioId,
          ...newUsuario,
        });
        setUsuarios(usuarios.map((usuario) =>
          usuario.id === currentUsuarioId ? updatedUsuario : usuario
        ));
        setIsModalOpen(false);
        setIsEditing(false);
        setCurrentUsuarioId(null);
        fetchUsuarios();
      } catch (error) {
        console.error("Error al actualizar el usuario:", error);
      }
    } else {
      try {
        const res = await axios.post("/api/usuarios", newUsuario);
        setUsuarios([...usuarios, res.data.data]);
        setIsModalOpen(false);
        setNewUsuario({
          name: "",
          email: "",
          money: 0,
          gender: "",
        });
      } catch (error) {
        console.error("Error al añadir el usuario:", error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Lista de Usuarios</h1>
        <button
          onClick={() => {
            setIsEditing(false);
            setNewUsuario({
              name: "",
              email: "",
              money: 0,
              gender: "",
            });
            setIsModalOpen(true);
          }}
          className={styles.addButton}
        >
          Añadir Usuario
        </button>
      </header>

      <UsuariosModal
        isModalOpen={isModalOpen}
        isEditing={isEditing}
        newUsuario={newUsuario}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        closeModal={() => setIsModalOpen(false)}
      />

      <UsuariosList
        usuarios={usuarios}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />

      <VolverAtras />
    </div>
  );
}
