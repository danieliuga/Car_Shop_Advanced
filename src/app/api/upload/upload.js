// pages/api/upload.js
import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import nextConnect from 'next-connect';

// Configurar multer para guardar archivos en el sistema de archivos
const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads', // Carpeta donde se guardarán las imágenes
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Algo salió mal: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Método ${req.method} no permitido` });
  },
});

// Usar multer como middleware
apiRoute.use(upload.single('imagen'));

// Ruta POST para manejar la subida de archivos
apiRoute.post((req, res) => {
  res.status(200).json({ data: { filename: req.file.filename } });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
