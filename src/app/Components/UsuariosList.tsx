import React from 'react';
import styles from '../usuarios/usuario.module.css';

type Usuario = {
  id: number;
  name: string;
  email: string;
  money: number;
  gender: string;
};

type UsuariosListProps = {
  usuarios: Usuario[];
  handleUpdate: (usuario: Usuario) => void;
  handleDelete: (id: number) => void;
};

const UsuariosList: React.FC<UsuariosListProps> = ({ usuarios, handleUpdate, handleDelete }) => {
  return (
    <div className={styles.grid}>
      {usuarios.map((usuario) => (
        <div key={usuario.id} className={styles.card}>
          <div className={styles.cardContent}>
            <h2 className={styles.name}>{usuario.name}</h2>
            <p className={styles.info}>Email: {usuario.email}</p>
            <p className={styles.info}>Dinero: {usuario.money}</p>
            <p className={styles.info}>Género: {usuario.gender}</p>
            <div className={styles.buttons}>
              <button
                onClick={() => handleUpdate(usuario)}
                className={styles.updateButton}
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(usuario.id)}
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

export default UsuariosList;
