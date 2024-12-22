class ParticipantList extends HTMLElement {
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
              <button id="nuevo-participante" class="btn-nuevo">Nuevo Participante</button>
              <table>
                  <thead>
                      <tr>
                          <th>Nombre</th>
                          <th>Apellido</th>
                          <th>Email</th>
                          <th>Rol</th>
                          <th>Acciones</th>
                      </tr>
                  </thead>
                  <tbody id="participants-body">
                  </tbody>
              </table>
          </div>
      `;
  }

  connectedCallback() {
      this.fetchData();
      this.shadowRoot.querySelector('#nuevo-participante').addEventListener('click', () => {
          this.dispatchEvent(new CustomEvent('mostrar-formulario-participant', { bubbles: true, composed: true }));
      });
  }

  async fetchData() {
      try {
          const response = await fetch('http://localhost:5000/participantes');
          if (!response.ok) throw new Error('Error al obtener los participantes');
          const participantes = await response.json();
          this.render(participantes);
      } catch (error) {
          console.error('Error al cargar los participantes:', error);
      }
  }

  render(participantes) {
      const tbody = this.shadowRoot.querySelector('#participants-body');
      tbody.innerHTML = '';

      participantes.forEach(participante => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${participante.nombre}</td>
              <td>${participante.apellido}</td>
              <td>${participante.email}</td>
              <td>${participante.rol}</td>
              <td class="actions">
                  <button class="btn-editar" data-id="${participante.id}">Editar</button>
                  <button class="btn-eliminar" data-id="${participante.id}">Eliminar</button>
              </td>
          `;

          row.querySelector('.btn-eliminar').addEventListener('click', () => this.handleDelete(participante.id));
          row.querySelector('.btn-editar').addEventListener('click', () => this.handleEdit(participante));
          tbody.appendChild(row);
      });
  }

  async handleDelete(id) {
      if (confirm('¿Está seguro de eliminar este participante?')) {
          try {
              const response = await fetch(`http://localhost:5000/participantes/${id}`, { method: 'DELETE' });
              if (!response.ok) throw new Error('Error al eliminar el participante');
              this.fetchData();
          } catch (error) {
              console.error('Error al eliminar participante:', error);
          }
      }
  }

  handleEdit(participante) {
      const event = new CustomEvent('editar-participante', {
          detail: participante,
          bubbles: true,
          composed: true,
      });
      this.dispatchEvent(event);
  }
}

customElements.define('participant-list', ParticipantList);
