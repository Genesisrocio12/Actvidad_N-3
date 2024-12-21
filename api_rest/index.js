const express = require('express');
const bodyParser = require('body-parser'); // Cambiado a require
const mysql = require('mysql2'); // Cambiado a require
const cors = require('cors'); // Cambiado a require

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

///get=> es para traer información
app.get('/', (req, res) => {
    res.send('Bienvenido a mi API');
});

// Configuración de la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db_proyectos',
    port: 8889
});

// Conexión a la base de datos
db.connect(error => {
    if (!error) {
        console.log('Conexión exitosa a la BD');
    } else {
        console.error('Error al establecer la conexión a la BD:', error);
    }
});

// Endpoints para Proyectos
app.get('/proyectos', (req, res) => {
    const query = 'SELECT * FROM proyectos';
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.json(results);
    });
});

app.post('/proyectos', (req, res) => {
    const { nombre, descripcion, fecha_inicio, fecha_fin } = req.body;
    const query = 'INSERT INTO proyectos (nombre, descripcion, fecha_inicio, fecha_fin) VALUES (?, ?, ?, ?)';
    
    db.query(query, [nombre, descripcion, fecha_inicio, fecha_fin], (error, results) => {
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.status(201).json({ id: results.insertId, message: 'Proyecto creado exitosamente' });
    });
});

app.delete("/proyectos/:id", (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM proyectos WHERE id =?';
    db.query(query, [id],
        (error, results) => {
            if (error) {
                res.status(500).send("Error al eliminar el proyecto");
                return;
            }
            if (results.affectedRows === 0) {
                res.status(404).send("Proyecto no encontrado");
                return;
            }
            res.status(200).json('Proyecto eliminado exitosamente');
        }
    );
});

// Endpoints para Participantes
app.get('/participantes', (req, res) => {
    const query = 'SELECT * FROM participantes';
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.json(results);
    });
});

app.post('/participantes', (req, res) => {
    const { nombre, apellido, email, rol } = req.body;
    const query = 'INSERT INTO participantes (nombre, apellido, email, rol) VALUES (?, ?, ?, ?)';
    
    db.query(query, [nombre, apellido, email, rol], (error, results) => {
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.status(201).json({ id: results.insertId, message: 'Participante creado exitosamente' });
    });
});

app.delete("/participantes/:id", (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM participantes WHERE id =?';
    db.query(query, [id],
        (error, results) => {
            if (error) {
                res.status(500).send("Error al eliminar el participante");
                return;
            }
            if (results.affectedRows === 0) {
                res.status(404).send("Participante no encontrado");
                return;
            }
            res.status(200).json('Participante eliminado exitosamente');
        }
    );
});

// Ruta para actualizar un participante
app.put('/participantes/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, email, rol, estado } = req.body;
  
    let participante = participantes.find(p => p.id === parseInt(id));
  
    if (!participante) {
      return res.status(404).send('Participante no encontrado');
    }
  
    // Actualizar los datos del participante
    participante.nombre = nombre || participante.nombre;
    participante.apellido = apellido || participante.apellido;
    participante.email = email || participante.email;
    participante.rol = rol || participante.rol;
    participante.estado = estado !== undefined ? estado : participante.estado;
  
    res.send(participante); // Retornar el participante actualizado
  });
  

// Endpoint para asignar participante a proyecto
app.post('/proyectos/:proyectoId/participantes/:participanteId', (req, res) => {
    const { proyectoId, participanteId } = req.params;
    const query = 'INSERT INTO proyecto_participante (proyecto_id, participante_id) VALUES (?, ?)';
    
    db.query(query, [proyectoId, participanteId], (error) => {
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.status(201).json({ message: 'Asignación realizada exitosamente' });
    });
});



// Servidor escuchando
app.listen(port, () => {
    console.log('Servidor corriendo en http://localhost:${port}');
});