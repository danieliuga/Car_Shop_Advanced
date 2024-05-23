import React, { ChangeEvent, FormEvent } from "react";
import styles from "../vehiculos/vehiculo.module.css";
import FormLabel from "./FormLabel";
import CancelButton from "./CancelButton";

type ModalProps = {
  isModalOpen: boolean;
  isEditing: boolean;
  newVehiculo: {
    modelo: string;
    precio: number;
    stock: number;
    descripcion: string;
    imagen: string;
    tipo_id: number;
  };
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent) => void;
  closeModal: () => void;
};

const VehiculosModal: React.FC<ModalProps> = ({
  isModalOpen,
  isEditing,
  newVehiculo,
  handleInputChange,
  handleImageChange,
  handleSubmit,
  closeModal,
}) => {
  return (
    <>
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>{isEditing ? "Actualizar Vehículo" : "Añadir Nuevo Vehículo"}</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <FormLabel
                label="Modelo"
                type="text"
                name="modelo"
                value={newVehiculo.modelo}
                onChange={handleInputChange}
                required
              />
              <FormLabel
                label="Precio"
                type="number"
                name="precio"
                value={newVehiculo.precio}
                onChange={handleInputChange}
                required
              />
              <FormLabel
                label="Stock"
                type="number"
                name="stock"
                value={newVehiculo.stock}
                onChange={handleInputChange}
                required
              />
              <FormLabel
                label="Descripción"
                type="textarea"
                name="descripcion"
                value={newVehiculo.descripcion}
                onChange={handleInputChange}
                required
                data-tip="Ingrese una descripción del vehículo"
              />
              <label data-tip="Seleccione una imagen del vehículo">
                Imagen:
                <input
                  type="file"
                  name="imagen"
                  onChange={handleImageChange}
                  required={!isEditing}
                />
              </label>
              <FormLabel
                label="Tipo"
                type="select"
                name="tipo_id"
                value={newVehiculo.tipo_id}
                onChange={handleInputChange}
                required
                options={[
                  { value: 1, label: "1" },
                  { value: 2, label: "2" },
                ]}
              />
              <button type="submit">{isEditing ? "Actualizar Vehículo" : "Añadir Vehículo"}</button>
              <CancelButton onClick={closeModal} />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default VehiculosModal;
