import Image from "next/image";
import Link from "next/link";
import { FaCar } from "react-icons/fa";

export default function Home() {
  return (
    <div className="App">
      <header className="header">
        <h1 className="title">IUGA Shop <FaCar /></h1>
      </header>
      <div className='vehiculos-container'>
        <div className='vehiculosContent'>
          <div className='coches'>
            <h2 className="vehicle-title">Coches</h2>
            <Image 
              src="/audi_R8.jpg" 
              alt="Imagen de un coche" 
              width={1000}
              height={600}
            />
            <Link key={'Vehiculos'} href="/vehiculos">Coches Page</Link>
          </div>
          <div className='motos'>
            <h2 className="vehicle-title">Usuarios</h2>
            <Image 
              src="/mt09_2024.jpg" 
              alt="Imagen de una moto" 
              width={1000}
              height={600}
            />
            <Link href="/usuarios">Usuarios Page</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
