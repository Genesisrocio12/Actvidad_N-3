// participant-list.js
class ParticipantList extends HTMLElement {
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
      const participantes = await response.json();
      this.render(participantes);
    } catch (error) {
      console.error("Error:", error);
      this.shadowRoot.innerHTML = `
                <div class="error">Error al cargar los participantes</div>
            `;
    }
  };

  render = (participantes) => {
    if (participantes.length == 0) {
      this.container.innerHTML = `
                <p class="empty-alert">No extisten libros disponibles</p>
            `;
    }


    //construir el encabezado
    let tableHtml = `
            <button id="nuevo-participante" class="btn-nuevo">Nuevo Participante</button>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
        `;

    //construir el body
    participantes.forEach(participante => {
      tableHtml += `
                <tr>
                    <td>${participante.nombre}</td>
                    <td>${participante.apellido}</td>
                    <td>${participante.email}</td>
                    <td>${participante.rol}</td>
                    <td class="${participante.estado ? 'status-active' : 'status-inactive'}">
                                    ${participante.estado ? 'Activo' : 'Inactivo'}</td>
                    <td class="actions">
                        <button class="btn-editar" data-id="${participante.id}">Editar</button>
                        <button class="btn-eliminar" data-id="${participante.id}">Eliminar</button>
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
    const btnNuevo = this.shadowRoot.getElementById("nuevo-participante");
    btnNuevo.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("mostrar-formulario-participante"));
    });

    
   
  };

  handleDelete = async (id) => {
    const confirmDelete = confirm(`¿Está seguro de eliminar este participante? ${id}`);
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:5000/participantes/${id}`,
          {
            method: 'DELETE',
          }
        );
        if (response.ok) {
          alert("Participante eliminado exitosamente");
          const src = this.getAttribute("src");
          this.fetchData(src);
        } else {
          alert("Error al eliminar el participante");
        }
      } catch (error) {
            console.error(`Error al eliminar ${error}`);
      }
    }
  };

  handleEdit = (id) => {
    this.dispatchEvent(
      new CustomEvent("editar-participante", {
        detail: { id },
      })
    );
  
    // Suponiendo que tienes una función para obtener los datos de un participante
    this.getParticipante(id).then(participante => {
      // Aquí puedes pre-poblar un formulario de edición con los datos
      this.showEditForm(participante);
    });
  };
  
}

window.customElements.define("participant-list", ParticipantList);
