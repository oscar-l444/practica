const express = require('express');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql');

const app = express();
const port = 3001;

// Middleware para manejar datos del formulario y archivos
const upload = multer({ dest: 'uploads/' });

// Configurar la conexión a la base de datos MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '$Oscarzotz051205',
    database: 'myproyect'
});

// Conectar a MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.stack);
        return;
    }
    console.log('Conexión a la base de datos MySQL exitosa.');
});

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Parsear el cuerpo de las peticiones con codificación JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta para manejar el formulario de registro
app.post('/submit', upload.single('comprobante'), (req, res) => {
    // Aquí puedes procesar los datos recibidos del formulario
    const { nombre, apellido_paterno, apellido_materno, telefono, correo, direccion, tipo_carrera } = req.body;
    const comprobantePDF = req.file; // Archivo adjunto en req.file

    // Ejemplo de inserción de datos en la base de datos
    const insertQuery = 'INSERT INTO tabla (nombre, apellido_paterno, apellido_materno, telefono, correo, direccion, tipo_carrera, comprobante_pdf) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [nombre, apellido_paterno, apellido_materno, telefono, correo, direccion, tipo_carrera, comprobantePDF.filename];

    // Ejecutar la consulta SQL
    connection.query(insertQuery, values, (error, results, fields) => {
        if (error) {
            console.error('Error al insertar datos en la base de datos:', error);
            res.status(500).send('Error al procesar el formulario.');
            return;
        }
        console.log('Datos insertados correctamente en la base de datos.');
        res.send('Formulario recibido con éxito.');
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
