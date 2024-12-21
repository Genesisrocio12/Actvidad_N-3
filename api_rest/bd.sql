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