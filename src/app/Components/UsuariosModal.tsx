import React, { ChangeEvent, FormEvent } from "react";
import styles from "../usuarios/usuario.module.css";

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
              <label>
                Nombre:
                <input
                  type="text"
                  name="name"
                  value={newUsuario.name}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={newUsuario.email}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Dinero:
                <input
                  type="number"
                  name="money"
                  value={newUsuario.money}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Género:
                <select
                  name="gender"
                  value={newUsuario.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select an option</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </label>
              <button type="submit">{isEditing ? "Actualizar Usuario" : "Añadir Usuario"}</button>
              <button type="button" onClick={closeModal}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UsuariosModal;
