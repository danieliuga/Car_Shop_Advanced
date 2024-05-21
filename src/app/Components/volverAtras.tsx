import React from "react";
import styles from "../vehiculos/vehiculo.module.css";
import Link from "next/link";

export default function VolverAtras() {

    return (
        <div className={styles.link}>
        <Link href="/" className={styles.linkText}>
          Volver a la página principal
        </Link>
      </div>
    )
}
