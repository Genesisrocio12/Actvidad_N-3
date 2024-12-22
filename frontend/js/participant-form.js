class ParticipantForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentParticipantId = null; // Para distinguir entre creación y edición
    }

    connectedCallback() {
        this.render();
        this.shadowRoot.querySelector('#participant-form').addEventListener('submit', this.handleSubmit.bind(this));
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .form-container {
                    padding: 1rem;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                }
                input, select, button {
                    display: block;
                    margin: 0.5rem 0;
                    padding: 0.5rem;
                    width: 100%;
                }
                button {
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    cursor: pointer;
                }
            </style>
            <div class="form-container">
                <form id="participant-form">
                    <label>Nombre:</label>
                    <input type="text" id="nombre" required />
                    <label>Apellido:</label>
                    <input type="text" id="apellido" required />
                    <label>Email:</label>
                    <input type="email" id="email" required />
                    <label>Rol:</label>
                    <select id="rol">
                        <option value="Desarrollador">Desarrollador</option>
                        <option value="Diseñador">Diseñador</option>
                        <option value="Project Manager">Project Manager</option>
                    </select>
                    <button type="submit">Guardar</button>
                </form>
            </div>
        `;
    }

    setParticipantData(data) {
        this.currentParticipantId = data.id; // Guardar el ID del participante para actualizaciones
        this.shadowRoot.querySelector('#nombre').value = data.nombre;
        this.shadowRoot.querySelector('#apellido').value = data.apellido;
        this.shadowRoot.querySelector('#email').value = data.email;
        this.shadowRoot.querySelector('#rol').value = data.rol;
    }

    async handleSubmit(event) {
        event.preventDefault();
    
        const formData = {
            nombre: this.shadowRoot.querySelector('#nombre').value,
            apellido: this.shadowRoot.querySelector('#apellido').value,
            email: this.shadowRoot.querySelector('#email').value,
            rol: this.shadowRoot.querySelector('#rol').value,
        };
    
        try {
            let response;
            if (this.currentParticipantId) {
                // Actualizar participante existente
                response = await fetch(`http://localhost:5000/participantes/${this.currentParticipantId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
            } else {
                // Crear nuevo participante
                response = await fetch('http://localhost:5000/participantes', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
            }
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error en la respuesta del servidor: ${response.status} - ${errorText}`);
            }
    
            alert('Participante guardado exitosamente');
            this.dispatchEvent(new CustomEvent('participant-saved', { bubbles: true, composed: true }));
            this.currentParticipantId = null; // Resetear para creación futura
            this.shadowRoot.querySelector('#participant-form').reset();
        } catch (error) {
            console.error('Error al guardar el participante:', error);
            alert(`Error al guardar el participante: ${error.message}`);
        }
    }
}

customElements.define('participant-form', ParticipantForm);