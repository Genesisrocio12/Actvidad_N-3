class ProjectList extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
          <style>
              .container {
                  padding: 1rem;
              }
              table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-top: 1rem;
              }
              th, td {
                  padding: 0.75rem;
                  border: 1px solid #ddd;
                  text-align: left;
              }
              th {
                  background-color: #f5f5f5;
              }
              .btn-nuevo {
                  margin-bottom: 1rem;
                  padding: 0.5rem 1rem;
                  border: none;
                  border-radius: 4px;
                  background-color: #3498db;
                  color: white;
                  cursor: pointer;
              }
              .actions {
                  display: flex;
                  gap: 0.5rem;
              }
              .btn-editar {
                  background-color: #4CAF50;
                  color: white;
              }
              .btn-eliminar {
                  background-color: #f44336;
                  color: white;
              }
          </style>
          <div class="container">
              <button id="nuevo-proyecto" class="btn-nuevo">Nuevo Proyecto</button>
              <table>
                  <thead>
                      <tr>
                          <th>Nombre</th>
                          <th>Descripción</th>
                          <th>Fecha Inicio</th>
                          <th>Fecha Fin</th>
                          <th>Acciones</th>
                      </tr>
                  </thead>
                  <tbody id="projects-body">
                  </tbody>
              </table>
          </div>
      `;
  }

  connectedCallback() {
      this.fetchData();
      this.shadowRoot.querySelector('#nuevo-proyecto').addEventListener('click', () => {
          this.dispatchEvent(new CustomEvent('mostrar-formulario-project', { bubbles: true, composed: true }));
      });
  }

  async fetchData() {
      try {
          const response = await fetch('http://localhost:5000/proyectos');
          if (!response.ok) throw new Error('Error al obtener los proyectos');
          const proyectos = await response.json();
          this.render(proyectos);
      } catch (error) {
          console.error('Error al cargar los proyectos:', error);
      }
  }

  render(proyectos) {
      const tbody = this.shadowRoot.querySelector('#projects-body');
      tbody.innerHTML = '';

      proyectos.forEach(proyecto => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${proyecto.nombre}</td>
              <td>${proyecto.descripcion}</td>
              <td>${new Date(proyecto.fecha_inicio).toLocaleDateString()}</td>
              <td>${new Date(proyecto.fecha_fin).toLocaleDateString()}</td>
              <td class="actions">
                  <button class="btn-editar" data-id="${proyecto.id}">Editar</button>
                  <button class="btn-eliminar" data-id="${proyecto.id}">Eliminar</button>
              </td>
          `;

          row.querySelector('.btn-eliminar').addEventListener('click', () => this.handleDelete(proyecto.id));
          row.querySelector('.btn-editar').addEventListener('click', () => this.handleEdit(proyecto));
          tbody.appendChild(row);
      });
  }

  async handleDelete(id) {
      if (confirm('¿Está seguro de eliminar este proyecto?')) {
          try {
              const response = await fetch(`http://localhost:5000/proyectos/${id}`, { method: 'DELETE' });
              if (!response.ok) throw new Error('Error al eliminar el proyecto');
              this.fetchData();
          } catch (error) {
              console.error('Error al eliminar proyecto:', error);
          }
      }
  }

  handleEdit(proyecto) {
      const event = new CustomEvent('editar-proyecto', {
          detail: proyecto,
          bubbles: true,
          composed: true,
      });
      this.dispatchEvent(event);
  }
}

customElements.define('project-list', ProjectList);
