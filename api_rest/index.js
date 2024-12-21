<<<<<<< HEAD
import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Configura tu contraseña
    database: 'db_projects'
});

db.connect(error => {
    if (!error) {
        console.log('Conexión exitosa a la base de datos');
    } else {
        console.log('Error de conexión:', error);
        process.exit(1);
    }
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});

// Endpoints para Proyectos
app.get('/api/projects', (req, res) => {
    const query = 'SELECT * FROM projects';
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.json(results);
    });
});

app.get('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM projects WHERE id = ?';
    db.query(query, [id], (error, results) => {
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ message: 'Proyecto no encontrado' });
            return;
        }
        res.json(results[0]);
    });
});

app.post('/api/projects', (req, res) => {
    const { name, description, start_date, end_date } = req.body;
    const query = 'INSERT INTO projects (name, description, start_date, end_date) VALUES (?, ?, ?, ?)';
    db.query(query, [name, description, start_date, end_date], (error, results) => {
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.status(201).json({ id: results.insertId });
    });
});

app.put('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, start_date, end_date, status } = req.body;
    const query = 'UPDATE projects SET name=?, description=?, start_date=?, end_date=?, status=? WHERE id=?';
    db.query(query, [name, description, start_date, end_date, status, id], (error) => {
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.json({ message: 'Proyecto actualizado exitosamente' });
    });
});

app.delete('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM projects WHERE id=?';
    db.query(query, [id], (error) => {
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.json({ message: 'Proyecto eliminado exitosamente' });
    });
});

// Endpoints para Participantes
app.get('/api/participants', (req, res) => {
    const query = 'SELECT * FROM participants';
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.json(results);
    });
});

app.post('/api/participants', (req, res) => {
    const { name, email, role } = req.body;
    const query = 'INSERT INTO participants (name, email, role) VALUES (?, ?, ?)';
    db.query(query, [name, email, role], (error, results) => {
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.status(201).json({ id: results.insertId });
    });
});

// Endpoints para la relación proyecto-participante
app.get('/api/project-participants/:projectId', (req, res) => {
    const { projectId } = req.params;
    const query = `
        SELECT p.* 
        FROM participants p
        INNER JOIN project_participants pp ON p.id = pp.participant_id
        WHERE pp.project_id = ?
    `;
    db.query(query, [projectId], (error, results) => {
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.json(results);
    });
});

app.post('/api/project-participants', (req, res) => {
    const { project_id, participant_id } = req.body;
    const query = 'INSERT INTO project_participants (project_id, participant_id) VALUES (?, ?)';
    db.query(query, [project_id, participant_id], (error) => {
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.status(201).json({ message: 'Participante asignado exitosamente' });
    });
});

app.delete('/api/project-participants', (req, res) => {
    const { project_id, participant_id } = req.body;
    const query = 'DELETE FROM project_participants WHERE project_id = ? AND participant_id = ?';
    db.query(query, [project_id, participant_id], (error) => {
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.json({ message: 'Participante removido exitosamente del proyecto' });
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
=======
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
>>>>>>> 687100ce4934709fc022fb7b9be2006956a1032f
});