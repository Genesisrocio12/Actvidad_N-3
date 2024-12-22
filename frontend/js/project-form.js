class ProjectForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentProjectId = null; // Para distinguir entre creación y edición
    }

    connectedCallback() {
        this.render();
        this.shadowRoot.querySelector('#project-form').addEventListener('submit', this.handleSubmit.bind(this));
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .form-container {
                    padding: 1rem;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                }
                input, textarea, button {
                    display: block;
                    margin: 0.5rem 0;
                    padding: 0.5rem;
                    width: 100%;
                }
                button {
                    background-color: #3498db;
                    color: white;
                    border: none;
                    cursor: pointer;
                }
            </style>
            <div class="form-container">
                <form id="project-form">
                    <label>Nombre:</label>
                    <input type="text" id="nombre" required />
                    <label>Descripción:</label>
                    <textarea id="descripcion" required></textarea>
                    <label>Fecha Inicio:</label>
                    <input type="date" id="fecha_inicio" required />
                    <label>Fecha Fin:</label>
                    <input type="date" id="fecha_fin" required />
                    <button type="submit">Guardar</button>
                </form>
            </div>
        `;
    }

    setProjectData(data) {
        this.currentProjectId = data.id; // Guardar el ID del proyecto para actualizaciones
        this.shadowRoot.querySelector('#nombre').value = data.nombre;
        this.shadowRoot.querySelector('#descripcion').value = data.descripcion;
        this.shadowRoot.querySelector('#fecha_inicio').value = data.fecha_inicio;
        this.shadowRoot.querySelector('#fecha_fin').value = data.fecha_fin;
    }

    async handleSubmit(event) {
        event.preventDefault();
    
        const formData = {
            nombre: this.shadowRoot.querySelector('#nombre').value,
            descripcion: this.shadowRoot.querySelector('#descripcion').value,
            fecha_inicio: this.shadowRoot.querySelector('#fecha_inicio').value,
            fecha_fin: this.shadowRoot.querySelector('#fecha_fin').value,
        };
    
        try {
            let response;
            if (this.currentProjectId) {
                // Actualizar proyecto existente
                response = await fetch(`http://localhost:5000/proyectos/${this.currentProjectId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
            } else {
                // Crear nuevo proyecto
                response = await fetch('http://localhost:5000/proyectos', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
            }
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error en la respuesta del servidor: ${response.status} - ${errorText}`);
            }
    
            alert('Proyecto guardado exitosamente');
            this.dispatchEvent(new CustomEvent('project-saved', { bubbles: true, composed: true }));
            this.currentProjectId = null; // Resetear para creación futura
            this.shadowRoot.querySelector('#project-form').reset();
        } catch (error) {
            console.error('Error al guardar el proyecto:', error);
            alert(`Error al guardar el proyecto: ${error.message}`);
        }
    }
}

customElements.define('project-form', ProjectForm);