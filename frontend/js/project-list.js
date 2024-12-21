// project-list.js
class ProjectList extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.container = document.createElement("div");
      this.estilo = document.createElement("style");
      this.estilo.textContent = `
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
              .actions {
                  display: flex;
                  gap: 0.5rem;
              }
              button {
                  padding: 0.5rem 1rem;
                  border: none;
                  border-radius: 4px;
                  cursor: pointer;
              }
              .btn-editar {
                  background-color: #4CAF50;
                  color: white;
              }
              .btn-eliminar {
                  background-color: #f44336;
                  color: white;
              }
              .status-active {
                  color: #4CAF50;
              }
              .status-inactive {
                  color: #f44336;
              }
          `;
      this.shadowRoot.appendChild(this.estilo);
      this.shadowRoot.appendChild(this.container);
    }
  
    connectedCallback() {
      const src = this.getAttribute("src");
      this.fetchData(src);
    }
  
    fetchData = async (src) => {
      try {
        const response = await fetch(src);
        const projects = await response.json();
        this.render(projects);
      } catch (error) {
        console.error("Error:", error);
        this.shadowRoot.innerHTML = `
                  <div class="error">Error al cargar los proyectos</div>
              `;
      }
    };
  
    render = (projects) => {
      if (projects.length == 0) {
        this.container.innerHTML = `
                  <p class="empty-alert">No extisten libros disponibles</p>
              `;
      }
  
  
      //construir el encabezado
      let tableHtml = `
              <button id="nuevo-project" class="btn-nuevo">Nuevo project</button>
              <table>
                  <thead>
                      <tr>
                          <th>Nombre</th>
                          <th>Descripcion</th>
                          <th>Fecha Inicio</th>
                          <th>Fecha Fin</th>
                          <th>Estado</th>
                          <th>Acciones</th>
                      </tr>
                  </thead>
                  <tbody>
          `;
  
      //construir el body
      projects.forEach(project => {
        tableHtml += `
                  <tr>
                      <td>${project.nombre}</td>
                      <td>${project.descripcion}</td>
                      <td>${project.fecha_inicio}</td>
                      <td>${project.fecha_fin}</td>
                      <td class="${project.estado ? 'status-active' : 'status-inactive'}">
                                      ${project.estado ? 'Activo' : 'Inactivo'}</td>
                      <td class="actions">
                          <button class="btn-editar" data-id="${project.id}">Editar</button>
                          <button class="btn-eliminar" data-id="${project.id}">Eliminar</button>
                      </td>
                  </tr>
              `;
      });
  
      //finalizo la construccion
      tableHtml += `
                  </tbody>
              </table>
          `;
  
      this.container.innerHTML = tableHtml;
  
      this.container.querySelectorAll(".btn-eliminar").forEach((button) => {
        button.addEventListener("click", () =>
          this.handleDelete(button.dataset.id)
        );
      });
  
      this.container.querySelectorAll(".btn-editar").forEach((btn) => {
          btn.addEventListener("click", (e) =>
            this.handleEdit(e.target.dataset.id)
          );
      });
    };
  
    addEventListeners = () => {
      const btnNuevo = this.shadowRoot.getElementById("nuevo-project");
      btnNuevo.addEventListener("click", () => {
        this.dispatchEvent(new CustomEvent("mostrar-formulario-project"));
      });
  
      
     
    };
  
    handleDelete = async (id) => {
      const confirmDelete = confirm(`¿Está seguro de eliminar este project? ${id}`);
      if (confirmDelete) {
        try {
          const response = await fetch(
            `http://localhost:5000/proyectos/${id}`,
            {
              method: 'DELETE',
            }
          );
          if (response.ok) {
            alert("project eliminado exitosamente");
            const src = this.getAttribute("src");
            this.fetchData(src);
          } else {
            alert("Error al eliminar el project");
          }
        } catch (error) {
              console.error(`Error al eliminar ${error}`);
        }
      }
    };
  
    handleEdit = (id) => {
      this.dispatchEvent(
        new CustomEvent("editar-project", {
          detail: { id },
        })
      );
    };
  }
  
  window.customElements.define("project-list", ProjectList);
  