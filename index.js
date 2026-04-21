const express = require('express');
const conexion = require('./db');

const app = express();

const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // pon tu contraseña si tienes
    database: 'PROCESAMIENTO' // 👈 cambia si tu BD tiene otro nombre
});

conexion.connect(err => {
    if (err) {
        console.log('Error de conexión:', err);
    } else {
        console.log('Conectado a MySQL');
    }
});

app.get('/informacion', (req, res) => {
    const pais = req.query.pais;

    conexion.query(
        'SELECT * FROM paises WHERE codigo = ?',
        [pais],
        (err, resultados) => {
            if (err) {
                res.status(500).send('Error en la base de datos');
            } else if (resultados.length === 0) {
                res.send('País no encontrado');
            } else {
                res.json(resultados[0]);
            }
        }
    );
});

app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000 🚀');
});