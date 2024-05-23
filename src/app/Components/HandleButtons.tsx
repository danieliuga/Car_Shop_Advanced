import React from 'react';
import styles from '../vehiculos/vehiculo.module.css';

type ButtonsProps = {
  onUpdate: () => void;
  onDelete: () => void;
};

const HandleButtons: React.FC<ButtonsProps> = ({ onUpdate, onDelete }) => {
  return (
    <div className={styles.buttons}>
      <button onClick={onUpdate} className={styles.updateButton}>
        Update
      </button>
      <button onClick={onDelete} className={styles.deleteButton}>
        Delete
      </button>
    </div>
  );
};

export default HandleButtons;
