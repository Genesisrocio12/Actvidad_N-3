# Actvidad_N-3
GESTIÓN DE PROYECTOS Y PARTICIPANTES CON CUSTOM ELEMENTS 

# Gestión de Proyectos y Participantes

Este proyecto es una aplicación web para gestionar la relación entre proyectos y participantes. Permite registrar, visualizar, actualizar y eliminar proyectos y participantes en una relación de muchos a muchos. La aplicación utiliza Custom Elements para construir una interfaz modular y reutilizable, y una API REST desarrollada con Express y MySQL para gestionar los datos.

## Bases de datos
Creación de la base de datos "db_proyecto"
- colección "proyectos": id, nombre, descripción, fecha_inicio, fecha_fin, estado.
- colección "participantes": id, nombre, apellido, email, rol, estado.

## Interfaz

- **Menú de Navegación**: Componente que permite alternar entre las vistas de gestión de proyectos y participantes.
- **Encabezado**: Componente que muestra los datos personales del usuario (nombre, rol y fecha actual).
- **Tabla de Visualización**: Componente para mostrar las relaciones entre proyectos y participantes con opciones para registrar, actualizar y eliminar datos.
- **Pie de Página**: Componente que muestra información adicional, como derechos de autor o enlaces de contacto.
- **Contenedor Principal**: Componente que encapsula la aplicación y maneja la estructura global.
- **API REST**: Endpoints para gestionar las tablas de proyectos, participantes y su relación, proporcionando operaciones de CRUD (Crear, Leer, Actualizar, Eliminar).

## Configuraciones
  * En el fichero node.js de api_rest debemos configurar los accesos a la base de datos de "proyectos" mysql. Tener en cuenta que el puerto 5000 permite ejecutar la API en localhost.

## Frameworks y herramientas

- **Frontend**: HTML, CSS, JavaScript, Custom Elements, Shadow DOM, Templates
- **Backend**: Node.js, Express
- **Base de Datos**: MySQL con phpmyadmin del servidor xampp.
- **Herramientas**: Visual Studio Code, Live Server, Postman

## Requisitos

- Node.js
- MySQL
- XAMPP o similar para gestionar MySQL
- Visual Studio Code

## Ejecución
- levantar el servidor de phpmyadmin
- abrir la terminal de la api_rest en Visual Studio Code. Ejecutar el script: npx nodemon index.js
- ejecutar el fichero index.html con Live Server
