import React from 'react';
import styles from '../vehiculos/vehiculo.module.css';
import Image from 'next/image';
import HandleButtons from '../Components/HandleButtons';

type Vehiculo = {
  id: number;
  modelo: string;
  precio: number;
  stock: number;
  descripcion: string;
  imagen: string | File;
  tipo_id: number;
};

type VehiculosListProps = {
  vehiculos: Vehiculo[];
  handleUpdate: (vehiculo: Vehiculo) => void;
  handleDelete: (id: number) => void;
};

const VehiculosList: React.FC<VehiculosListProps> = ({ vehiculos, handleUpdate, handleDelete }) => {
  const getImageSrc = (imagen: string | File): string => {
    if (typeof imagen === 'string') {
      return imagen.startsWith('/') ? imagen : `/${imagen}`;
    }
    return 'default-image-path.jpg';
  };
  
  return (
    <div className={styles.grid}>
      {vehiculos.map((vehiculo) => vehiculo && (
        <div key={vehiculo.id} className={styles.card}>
          <Image 
            src={getImageSrc(vehiculo.imagen)}
            alt={`Vehículo ${vehiculo.imagen || 'default'}`} 
            className={styles.image} 
            width={300}
            height={200}
            layout="responsive"
          />
          <div className={styles.cardContent}>
            <h2 className={styles.model}>{vehiculo.modelo}</h2>
            <p className={styles.info}>Precio: {vehiculo.precio}</p>
            <p className={styles.info}>Stock: {vehiculo.stock}</p>
            <p className={styles.info}>Descripción: {vehiculo.descripcion}</p>
            <HandleButtons
              onUpdate={() => handleUpdate(vehiculo)}
              onDelete={() => handleDelete(vehiculo.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default VehiculosList;
