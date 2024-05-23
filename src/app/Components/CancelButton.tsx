import React from 'react';
import styles from '../vehiculos/vehiculo.module.css';

type CancelButtonProps = {
  onClick: () => void;
};

const CancelButton: React.FC<CancelButtonProps> = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick} className={styles.cancelButton}>
      Cancelar
    </button>
  );
};

export default CancelButton;
