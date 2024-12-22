const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1995',
    database: 'db_proyectos',
    port: 3306,
});

db.connect(error => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1);
    } else {
        console.log('Conexión exitosa a la BD');
    }
});

// Rutas para Proyectos
app.get('/proyectos', (req, res) => {
    db.query('SELECT * FROM proyectos', (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        res.json(results);
    });
});

app.post('/proyectos', (req, res) => {
    const { nombre, descripcion, fecha_inicio, fecha_fin } = req.body;
    db.query(
        'INSERT INTO proyectos (nombre, descripcion, fecha_inicio, fecha_fin) VALUES (?, ?, ?, ?)',
        [nombre, descripcion, fecha_inicio, fecha_fin],
        (error, results) => {
            if (error) return res.status(500).json({ error: error.message });
            res.status(201).json({ id: results.insertId, message: 'Proyecto creado exitosamente' });
        }
    );
});

app.put('/proyectos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, fecha_inicio, fecha_fin } = req.body;
    db.query(
        'UPDATE proyectos SET nombre = ?, descripcion = ?, fecha_inicio = ?, fecha_fin = ? WHERE id = ?',
        [nombre, descripcion, fecha_inicio, fecha_fin, id],
        (error, results) => {
            if (error) return res.status(500).json({ error: error.message });
            if (results.affectedRows === 0) return res.status(404).json({ error: 'Proyecto no encontrado' });
            res.status(200).json({ message: 'Proyecto actualizado exitosamente' });
        }
    );
});

app.delete('/proyectos/:id', (req, res) => {
    db.query('DELETE FROM proyectos WHERE id = ?', [req.params.id], (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Proyecto no encontrado' });
        res.status(200).json({ message: 'Proyecto eliminado exitosamente' });
    });
});

// Rutas para Participantes
app.get('/participantes', (req, res) => {
    db.query('SELECT * FROM participantes', (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        res.json(results);
    });
});

app.post('/participantes', (req, res) => {
    const { nombre, apellido, email, rol } = req.body;
    db.query(
        'INSERT INTO participantes (nombre, apellido, email, rol) VALUES (?, ?, ?, ?)',
        [nombre, apellido, email, rol],
        (error, results) => {
            if (error) return res.status(500).json({ error: error.message });
            res.status(201).json({ id: results.insertId, message: 'Participante creado exitosamente' });
        }
    );
});

app.put('/participantes/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, email, rol } = req.body;
    db.query(
        'UPDATE participantes SET nombre = ?, apellido = ?, email = ?, rol = ? WHERE id = ?',
        [nombre, apellido, email, rol, id],
        (error, results) => {
            if (error) return res.status(500).json({ error: error.message });
            if (results.affectedRows === 0) return res.status(404).json({ error: 'Participante no encontrado' });
            res.status(200).json({ message: 'Participante actualizado exitosamente' });
        }
    );
});

app.delete('/participantes/:id', (req, res) => {
    db.query('DELETE FROM participantes WHERE id = ?', [req.params.id], (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Participante no encontrado' });
        res.status(200).json({ message: 'Participante eliminado exitosamente' });
    });
});

// Rutas para Asignaciones
app.get('/asignaciones', (req, res) => {
    db.query(
        `SELECT pp.proyecto_id, p.nombre AS proyecto, pp.participante_id, pa.nombre AS participante, pa.apellido 
         FROM proyecto_participante pp
         JOIN proyectos p ON pp.proyecto_id = p.id
         JOIN participantes pa ON pp.participante_id = pa.id`,
        (error, results) => {
            if (error) return res.status(500).json({ error: error.message });
            res.json(results);
        }
    );
});

app.post('/asignaciones', (req, res) => {
    const { proyecto_id, participante_id } = req.body;

    if (!proyecto_id || !participante_id) {
        return res.status(400).json({ error: 'Faltan datos requeridos (proyecto_id o participante_id)' });
    }

    db.query(
        'INSERT INTO proyecto_participante (proyecto_id, participante_id) VALUES (?, ?)',
        [proyecto_id, participante_id],
        (error, results) => {
            if (error) {
                if (error.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ error: 'La asignación ya existe' });
                }
                return res.status(500).json({ error: error.message });
            }
            res.status(201).json({ message: 'Asignación creada exitosamente' });
        }
    );
});

app.delete('/asignaciones/:proyecto_id/:participante_id', (req, res) => {
    const { proyecto_id, participante_id } = req.params;
    db.query(
        'DELETE FROM proyecto_participante WHERE proyecto_id = ? AND participante_id = ?',
        [proyecto_id, participante_id],
        (error, results) => {
            if (error) return res.status(500).json({ error: error.message });
            if (results.affectedRows === 0) return res.status(404).json({ error: 'Asignación no encontrada' });
            res.status(200).json({ message: 'Asignación eliminada exitosamente' });
        }
    );
});

// Servidor escuchando
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});