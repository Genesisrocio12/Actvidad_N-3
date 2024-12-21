// participant-form.js
class ParticipantForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.container = document.createElement('div');
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
        this.shadowRoot.appendChild(this.estilo);
        this.shadowRoot.appendChild(this.container);
    }

    connectedCallback() {
        this.render();
    }

    render = () => {
        this.container.innerHTML = `
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

        this.shadowRoot.querySelector('#participant-form').addEventListener('submit', this.handleSubmit);
    
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