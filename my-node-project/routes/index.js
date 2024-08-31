const express = require('express');
const router = express.Router();

// Ruta para la página de inicio
router.get('/', (req, res) => {
    res.sendFile('index.html', { root: './public' });
});

// Ruta para procesar el formulario de registro
router.post('/submit', (req, res) => {
    // Aquí puedes manejar la lógica para procesar los datos del formulario
    // Por ejemplo, guardarlos en la base de datos
    // Puedes acceder a los datos del formulario a través de req.body
    console.log(req.body);
    // Redirige a una página de confirmación o haz alguna otra acción
    res.send('Formulario enviado correctamente');
});

module.exports = router;
