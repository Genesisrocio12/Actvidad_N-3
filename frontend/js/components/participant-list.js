// participant-list.js
class ParticipantList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.estilo = document.createElement('style');
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
    }

    connectedCallback() {
        const src = this.getAttribute('src');
        this.fetchData(src);
    }

    fetchData = async (src) => {
        try {
            const response = await fetch(src);
            const participantes = await response.json();
            this.render(participantes);
        } catch (error) {
            console.error('Error:', error);
            this.shadowRoot.innerHTML = `
                <div class="error">Error al cargar los participantes</div>
            `;
        }
    }

    render = (participantes) => {
        this.shadowRoot.innerHTML = `
            ${this.estilo.outerHTML}
            <div class="container">
                <h2>Gestión de Participantes</h2>
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
                        ${participantes.map(participante => `
                            <tr>
                                <td>${participante.nombre}</td>
                                <td>${participante.apellido}</td>
                                <td>${participante.email}</td>
                                <td>${participante.rol}</td>
                                <td class="${participante.estado ? 'status-active' : 'status-inactive'}">
                                    ${participante.estado ? 'Activo' : 'Inactivo'}
                                </td>
                                <td class="actions">
                                    <button class="btn-editar" data-id="${participante.id}">Editar</button>
                                    <button class="btn-eliminar" data-id="${participante.id}">Eliminar</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;

        this.addEventListeners();
    }

    addEventListeners = () => {
        const btnNuevo = this.shadowRoot.getElementById('nuevo-participante');
        btnNuevo.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('mostrar-formulario-participante'));
        });

        this.shadowRoot.querySelectorAll('.btn-eliminar').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleDelete(e.target.dataset.id));
        });

        this.shadowRoot.querySelectorAll('.btn-editar').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleEdit(e.target.dataset.id));
        });
    }

    handleDelete = async (id) => {
        if (confirm('¿Está seguro de eliminar este participante?')) {
            try {
                const response = await fetch(`http://localhost:5000/participantes/${id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    this.fetchData(this.getAttribute('src'));
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }

    handleEdit = (id) => {
        this.dispatchEvent(new CustomEvent('editar-participante', {
            detail: { id }
        }));
    }
}

window.customElements.define('participant-list', ParticipantList);

// participant-form.js
class ParticipantForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.estilo = document.createElement('style');
        this.estilo.textContent = `
            .form-container {
                max-width: 600px;
                margin: 2rem auto;
                padding: 2rem;
                border: 1px solid #ddd;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            
            form {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
            
            .form-group {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            
            label {
                font-weight: bold;
            }
            
            input, select {
                padding: 0.5rem;
                border: 1px solid #ddd;
                border-radius: 4px;
                font-size: 1rem;
            }
            
            button {
                padding: 0.75rem 1.5rem;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 1rem;
            }
            
            .btn-guardar {
                background-color: #4CAF50;
                color: white;
            }
            
            .btn-cancelar {
                background-color: #f44336;
                color: white;
            }
            
            .buttons {
                display: flex;
                gap: 1rem;
                justify-content: flex-end;
            }
        `;
    }

    connectedCallback() {
        this.render();
    }

    render = () => {
        this.shadowRoot.innerHTML = `
            ${this.estilo.outerHTML}
            <div class="form-container">
                <h2>Nuevo Participante</h2>
                <form id="participant-form">
                    <div class="form-group">
                        <label for="nombre">Nombre</label>
                        <input type="text" id="nombre" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="apellido">Apellido</label>
                        <input type="text" id="apellido" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="rol">Rol</label>
                        <select id="rol">
                            <option value="Desarrollador">Desarrollador</option>
                            <option value="Diseñador">Diseñador</option>
                            <option value="Project Manager">Project Manager</option>
                            <option value="QA">QA</option>
                        </select>
                    </div>
                    
                    <div class="buttons">
                        <button type="button" class="btn-cancelar" id="btn-cancelar">Cancelar</button>
                        <button type="submit" class="btn-guardar">Guardar</button>
                    </div>
                </form>
            </div>
        `;

        this.addEventListeners();
    }

    addEventListeners = () => {
        const form = this.shadowRoot.getElementById('participant-form');
        const btnCancelar = this.shadowRoot.getElementById('btn-cancelar');

        form.addEventListener('submit', this.handleSubmit);
        btnCancelar.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('cancelar-formulario'));
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = {
            nombre: this.shadowRoot.getElementById('nombre').value,
            apellido: this.shadowRoot.getElementById('apellido').value,
            email: this.shadowRoot.getElementById('email').value,
            rol: this.shadowRoot.getElementById('rol').value
        };

        try {
            const response = await fetch('http://localhost:5000/participantes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Participante guardado exitosamente');
                this.dispatchEvent(new CustomEvent('participante-guardado'));
            } else {
                alert('Error al guardar el participante');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al guardar el participante');
        }
    }
}

window.customElements.define('participant-form', ParticipantForm);

// footer-component.js
class FooterComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.estilo = document.createElement('style');
        this.estilo.textContent = `
            footer {
                background-color: #333;
                color: white;
                padding: 1rem;
                text-align: center;
                position: fixed;
                bottom: 0;
                width: 100%;
            }
            
            .footer-content {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .footer-links {
                display: flex;
                gap: 2rem;
            }
            
            a {
                color: white;
                text-decoration: none;
            }
            
            a:hover {
                text-decoration: underline;
            }
        `;
    }

    connectedCallback() {
        this.render();
    }

    render = () => {
        const year = new Date().getFullYear();
        this.shadowRoot.innerHTML = `
            ${this.estilo.outerHTML}
            <footer>
                <div class="footer-content">
                    <div class="copyright">
                        © ${year} Sistema de Gestión de Proyectos
                    </div>
                    <div class="footer-links">
                        <a href="#about">Acerca de</a>
                        <a href="#contact">Contacto</a>
                        <a href="#help">Ayuda</a>
                    </div>
                </div>
            </footer>
        `;
    }
}

window.customElements.define('footer-component', FooterComponent);