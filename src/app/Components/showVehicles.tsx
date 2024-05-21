import React from "react";
import styles from "./vehiculo.module.css";

export default function showVehicles(vehiculos: any) {

    // return (
    //     <div className={styles.grid}>
    //     {vehiculos.map((vehiculo: any) => (
    //       <div key={vehiculo.id} className={styles.card}>
    //         <img src={vehiculo.imagen} alt="Vehículo" className={styles.image} />
    //         <div className={styles.cardContent}>
    //           <h2 className={styles.model}>{vehiculo.modelo}</h2>
    //           <p className={styles.info}>Precio: {vehiculo.precio}</p>
    //           <p className={styles.info}>Stock: {vehiculo.stock}</p>
    //           <p className={styles.info}>Descripción: {vehiculo.descripcion}</p>
    //           <div className={styles.buttons}>
    //             <button
    //               onClick={() => handleUpdate(vehiculo)}
    //               className={styles.updateButton}
    //             >
    //               Update
    //             </button>
    //             <button
    //               onClick={() => handleDelete(vehiculo.id)}
    //               className={styles.deleteButton}
    //             >
    //               Delete
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // )
}
