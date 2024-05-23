import React, { ChangeEvent, FormEvent } from "react";
import styles from "../usuarios/usuario.module.css";
import FormLabel from "./FormLabel";
import CancelButton from "./CancelButton";

type ModalProps = {
  isModalOpen: boolean;
  isEditing: boolean;
  newUsuario: {
    name: string;
    email: string;
    money: number;
    gender: string;
  };
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: FormEvent) => void;
  closeModal: () => void;
};

const UsuariosModal: React.FC<ModalProps> = ({
  isModalOpen,
  isEditing,
  newUsuario,
  handleInputChange,
  handleSubmit,
  closeModal,
}) => {
  return (
    <>
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>{isEditing ? "Actualizar Usuario" : "Añadir Nuevo Usuario"}</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <FormLabel
                label="Nombre"
                type="text"
                name="name"
                value={newUsuario.name}
                onChange={handleInputChange}
                required
              />
              <FormLabel
                label="Email"
                type="email"
                name="email"
                value={newUsuario.email}
                onChange={handleInputChange}
                required
              />
              <FormLabel
                label="Dinero"
                type="number"
                name="money"
                value={newUsuario.money}
                onChange={handleInputChange}
                required
              />
              <FormLabel
                label="Género"
                type="select"
                name="gender"
                value={newUsuario.gender}
                onChange={handleInputChange}
                required
                options={[
                  { value: "", label: "Selecciona una opción" },
                  { value: "Male", label: "Masculino" },
                  { value: "Female", label: "Femenino" },
                ]}
              />
              <button type="submit">{isEditing ? "Actualizar Usuario" : "Añadir Usuario"}</button>
              <CancelButton onClick={closeModal} />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UsuariosModal;
