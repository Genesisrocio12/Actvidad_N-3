class ProjectForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback = () => {
        this.render();
    }

    render = () => {
        this.shadowRoot.innerHTML = `
            <style>
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
                label {
                    font-weight: bold;
                }
                input, textarea {
                    padding: 0.5rem;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                }
                button {
                    padding: 0.75rem;
                    background-color: #3498db;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
                button:hover {
                    background-color: #2980b9;
                }
            </style>
            <div class="form-container">
                <form id="projectForm">
                    <h2>Nuevo Proyecto</h2>
                    <div>
                        <label for="name">Nombre del Proyecto</label>
                        <input type="text" id="name" required>
                    </div>
                    <div>
                        <label for="description">Descripción</label>
                        <textarea id="description" rows="4"></textarea>
                    </div>
                    <div>
                        <label for="start_date">Fecha de Inicio</label>
                        <input type="date" id="start_date" required>
                    </div>
                    <div>
                        <label for="end_date">Fecha de Fin</label>
                        <input type="date" id="end_date" required>
                    </div>
                    <button type="submit">Crear Proyecto</button>
                </form>
            </div>
        `;

        this.shadowRoot.querySelector('#projectForm').addEventListener('submit', this.handleSubmit);
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            name: this.shadowRoot.querySelector('#name').value,
            description: this.shadowRoot.querySelector('#description').value,
            start_date: this.shadowRoot.querySelector('#start_date').value,
            end_date: this.shadowRoot.querySelector('#end_date').value
        };

        try {
            const response = await fetch('http://localhost:5000/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Proyecto creado exitosamente');
                this.shadowRoot.querySelector('#projectForm').reset();
                this.dispatchEvent(new CustomEvent('project-created', {
                    bubbles: true,
                    composed: true
                }));
            } else {
                throw new Error('Error al crear el proyecto');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    }
}

customElements.define('project-form', ProjectForm);