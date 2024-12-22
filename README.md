# Actividad_N-3
**GESTIÓN DE PROYECTOS Y PARTICIPANTES CON CUSTOM ELEMENTS**

## Gestión de Proyectos y Participantes

Este proyecto es una aplicación web diseñada para gestionar la relación entre proyectos y participantes. La aplicación permite registrar, visualizar, actualizar y eliminar tanto proyectos como participantes, gestionando una relación de muchos a muchos entre ellos. Para construir una interfaz modular y reutilizable, se utilizan Custom Elements, Shadow DOM y Templates. Además, una API REST desarrollada con Express y MySQL se encarga de gestionar los datos en la base de datos.

## Bases de Datos

La base de datos "db_proyecto" es el núcleo de almacenamiento de datos de la aplicación. Está compuesta por las siguientes colecciones:

- **Proyectos**: 
  - `id`: Identificador único del proyecto.
  - `nombre`: Nombre del proyecto.
  - `descripcion`: Descripción detallada del proyecto.
  - `fecha_inicio`: Fecha de inicio del proyecto.
  - `fecha_fin`: Fecha de finalización del proyecto.
  - `estado`: Estado actual del proyecto (Activo, Completado, Cancelado).

- **Participantes**:
  - `id`: Identificador único del participante.
  - `nombre`: Nombre del participante.
  - `apellido`: Apellido del participante.
  - `email`: Correo electrónico del participante, debe ser único.
  - `rol`: Rol o posición del participante dentro del proyecto.
  - `estado`: Estado del participante (Activo, Inactivo).

## Interfaz de Usuario

La interfaz de usuario de la aplicación está compuesta por varios componentes clave, cada uno desempeñando un papel específico:

- **Menú de Navegación**: Este componente permite a los usuarios alternar fácilmente entre las vistas de gestión de proyectos y de participantes. Es una barra de navegación estilizada que mejora la usabilidad de la aplicación.
  
- **Encabezado**: Un componente que muestra la información del usuario, incluyendo el nombre, el rol y la fecha actual. Este componente proporciona un contexto adicional para el usuario.

- **Tabla de Visualización**: Este componente muestra las relaciones entre proyectos y participantes. Permite registrar, actualizar y eliminar datos con facilidad, proporcionando una visión clara y organizada de las relaciones.

- **Pie de Página**: Componente que se encuentra al final de la página y muestra información adicional, como los derechos de autor y enlaces de contacto. Es un buen lugar para mostrar información menos prioritaria pero aún relevante.

- **Contenedor Principal**: Este componente encapsula toda la aplicación, gestionando la estructura global y asegurando que todos los componentes se visualicen correctamente.

- **API REST**: La API proporciona endpoints para gestionar las tablas de proyectos, participantes y sus relaciones. Admite operaciones CRUD (Crear, Leer, Actualizar, Eliminar) y permite una interacción fluida entre el frontend y la base de datos.

## Configuraciones

Para que la aplicación funcione correctamente, es necesario configurar algunos aspectos en el fichero de `node.js` de `api_rest`:

- **Accesos a la Base de Datos**: Configurar los detalles de conexión a la base de datos MySQL, incluyendo el host, el usuario, la contraseña y el nombre de la base de datos.
  
- **Puerto de Ejecución**: El puerto 5000 se utiliza para ejecutar la API en localhost. Es importante asegurarse de que este puerto esté libre y no esté siendo utilizado por otro servicio.

## Endpoints de la API

A continuación se describen los endpoints implementados en el archivo `index.js` para gestionar los datos de proyectos, participantes y la ruta raíz:

- **GET /proyectos**:
  - Descripción: Obtiene la lista de todos los proyectos.
  - Respuesta: Devuelve un array de objetos de proyectos.

  ```javascript
  app.get('/proyectos', (req, res) => {
      db.query('SELECT * FROM proyectos', (err, results) => {
          if (err) {
              console.error('Error al obtener proyectos:', err);
              res.status(500).json({ error: 'Error al cargar los proyectos' });
              return;
          }
          res.json(results);
      });
  });

## Frameworks y Herramientas

Este proyecto utiliza una combinación de tecnologías modernas para el desarrollo frontend y backend:

- **Frontend**:
  - **HTML**: Para la estructura básica de la aplicación web.
  - **CSS**: Para el estilo y la presentación de los elementos de la interfaz.
  - **JavaScript**: Para la lógica y la interacción del lado del cliente.
  - **Custom Elements**: Para crear componentes reutilizables.
  - **Shadow DOM**: Para encapsular estilos y mantener la integridad del componente.
  - **Templates**: Para definir contenido que puede ser reutilizado.

- **Backend**:
  - **Node.js**: Plataforma para la construcción del backend de la aplicación.
  - **Express**: Framework para construir la API REST y manejar las rutas y las solicitudes.

- **Base de Datos**:
  - **MySQL**: Sistema de gestión de bases de datos relacional utilizado para almacenar los datos.
  - **phpMyAdmin**: Herramienta de gestión de MySQL accesible a través del servidor XAMPP.

- **Herramientas**:
  - **Visual Studio Code**: Editor de código fuente utilizado para el desarrollo.
  - **Live Server**: Extensión para Visual Studio Code que permite un servidor local de desarrollo con recarga en vivo.
  - **Postman**: Herramienta utilizada para probar y desarrollar las API, enviando solicitudes HTTP y viendo las respuestas.

## Requisitos

Para ejecutar este proyecto, necesitas tener instalados los siguientes programas:

- **Node.js**: Entorno de ejecución para JavaScript.
- **MySQL**: Sistema de gestión de bases de datos.
- **XAMPP**: Paquete de software que incluye Apache, MySQL y PHP, utilizado para gestionar MySQL.
- **Visual Studio Code**: Editor de código fuente.

## Ejecución

Para poner en marcha la aplicación, sigue estos pasos:

1. **Levantar el servidor de phpMyAdmin**:
   - Abre XAMPP y asegúrate de que el servidor MySQL está en ejecución.
   - Abre phpMyAdmin para gestionar la base de datos.

2. **Abrir la terminal de `api_rest` en Visual Studio Code**:
   - Navega a la carpeta `api_rest` y abre una terminal.
   - Ejecuta el script para iniciar el servidor de la API:
     ```bash
     npx nodemon index.js
     ```

3. **Ejecutar el archivo `index.html` con Live Server**:
   - Abre la carpeta del frontend en Visual Studio Code.
   - Haz clic derecho en `index.html` y selecciona `Open with Live Server`.
   - Asegúrate de que el Live Server está ejecutándose correctamente y navega a la dirección proporcionada (normalmente `http://localhost:5500`).

Siguiendo estos pasos, podemos tener la aplicación en funcionamiento y estar listo para gestionar proyectos y participantes con mayor facilidad.

