import React from 'react';
import styles from '../vehiculos/vehiculo.module.css';

type Vehiculo = {
  id: number;
  modelo: string;
  precio: number;
  stock: number;
  descripcion: string;
  imagen: string;
  tipo_id: number;
};

type VehiculosListProps = {
  vehiculos: Vehiculo[];
  handleUpdate: (vehiculo: Vehiculo) => void;
  handleDelete: (id: number) => void;
};

const VehiculosList: React.FC<VehiculosListProps> = ({ vehiculos, handleUpdate, handleDelete }) => {
  return (
    <div className={styles.grid}>
      {vehiculos.map((vehiculo) => vehiculo && (
        <div key={vehiculo.id} className={styles.card}>
          <img src={vehiculo.imagen ? vehiculo.imagen : 'default-image-path.jpg'} alt={`Vehículo ${vehiculo.imagen || 'default'}`} className={styles.image} />
          <div className={styles.cardContent}>
            <h2 className={styles.model}>{vehiculo.modelo}</h2>
            <p className={styles.info}>Precio: {vehiculo.precio}</p>
            <p className={styles.info}>Stock: {vehiculo.stock}</p>
            <p className={styles.info}>Descripción: {vehiculo.descripcion}</p>
            <div className={styles.buttons}>
              <button
                onClick={() => handleUpdate(vehiculo)}
                className={styles.updateButton}
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(vehiculo.id)}
                className={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VehiculosList;
