-- CreateTable
CREATE TABLE "vehiculos" (
    "id" SERIAL NOT NULL,
    "modelo" VARCHAR(255) NOT NULL,
    "precio" DECIMAL(10,2) NOT NULL,
    "stock" INTEGER NOT NULL,
    "descripcion" TEXT,
    "imagen" VARCHAR(255),
    "tipo_id" INTEGER NOT NULL,

    CONSTRAINT "vehiculos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "money" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);
