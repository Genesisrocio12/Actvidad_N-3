<<<<<<< HEAD
-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS db_projects;
USE db_projects;

-- Tabla de proyectos
CREATE TABLE projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    status ENUM('active', 'completed', 'cancelled') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de participantes
CREATE TABLE participants (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de relación entre proyectos y participantes
CREATE TABLE project_participants (
    project_id INT,
    participant_id INT,
    joined_date DATE DEFAULT (CURRENT_DATE),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (participant_id) REFERENCES participants(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, participant_id)
);

-- Insertar algunos datos de ejemplo
INSERT INTO projects (name, description, start_date, end_date) VALUES
('Proyecto Web', 'Desarrollo de sitio web corporativo', '2024-01-01', '2024-06-30'),
('App Móvil', 'Aplicación para gestión de inventario', '2024-02-01', '2024-08-31');

INSERT INTO participants (name, email, role) VALUES
('Juan Pérez', 'juan@email.com', 'Desarrollador'),
('María García', 'maria@email.com', 'Diseñadora'),
('Carlos López', 'carlos@email.com', 'Project Manager');
=======
CREATE DATABASE db_proyectos;
USE db_proyectos;

CREATE TABLE proyectos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    fecha_inicio DATE,
    fecha_fin DATE,
    estado ENUM('Activo', 'Completado', 'Cancelado') DEFAULT 'Activo'
);

CREATE TABLE participantes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    rol VARCHAR(50),
    estado BOOLEAN DEFAULT true
);

CREATE TABLE proyecto_participante (
    proyecto_id INT,
    participante_id INT,
    fecha_asignacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (proyecto_id, participante_id),
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id) ON DELETE CASCADE,
    FOREIGN KEY (participante_id) REFERENCES participantes(id) ON DELETE CASCADE
);
>>>>>>> 687100ce4934709fc022fb7b9be2006956a1032f
