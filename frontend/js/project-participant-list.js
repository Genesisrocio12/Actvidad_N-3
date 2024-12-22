class ProjectParticipantList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.loadData();
    }

    async loadData() {
        try {
            const [proyectos, participantes, asignaciones] = await Promise.all([
                fetch('http://localhost:5000/proyectos').then(r => r.json()),
                fetch('http://localhost:5000/participantes').then(r => r.json()),
                fetch('http://localhost:5000/asignaciones').then(r => r.json())
            ]);
            this.render(proyectos, participantes, asignaciones);
        } catch (error) {
            console.error('Error cargando datos:', error);
        }
    }

    render(proyectos, participantes, asignaciones) {
        this.shadowRoot.innerHTML = `
            <style>
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    padding: 0.5rem;
                    border: 1px solid #ddd;
                }
                button {
                    padding: 0.5rem;
                    cursor: pointer;
                }
            </style>
            <h2>Asignaciones</h2>
            <div>
                <select id="proyecto-select">
                    ${proyectos.map(p => `<option value="${p.id}">${p.nombre}</option>`).join('')}
                </select>
                <select id="participante-select">
                    ${participantes.map(p => `<option value="${p.id}">${p.nombre} ${p.apellido}</option>`).join('')}
                </select>
                <button id="asignar-btn">Asignar</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Proyecto</th>
                        <th>Participante</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${asignaciones
                        .map(asignacion => {
                            const proyecto = proyectos.find(p => p.id === asignacion.proyecto_id) || {};
                            const participante = participantes.find(p => p.id === asignacion.participante_id) || {};
                            return `
                                <tr>
                                    <td>${proyecto.nombre || 'Proyecto no encontrado'}</td>
                                    <td>${participante.nombre || 'Participante no encontrado'} ${participante.apellido || ''}</td>
                                    <td>
                                        <button data-proyecto="${asignacion.proyecto_id}" 
                                                data-participante="${asignacion.participante_id}" 
                                                class="eliminar-btn">
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>`;
                        })
                        .join('')}
                </tbody>
            </table>
        `;

        // Botón para asignar un participante a un proyecto
        this.shadowRoot.querySelector('#asignar-btn').addEventListener('click', async () => {
            const proyecto_id = this.shadowRoot.querySelector('#proyecto-select').value;
            const participante_id = this.shadowRoot.querySelector('#participante-select').value;

            try {
                const response = await fetch('http://localhost:5000/asignaciones', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ proyecto_id, participante_id })
                });

                if (response.ok) {
                    alert('Asignación creada exitosamente');
                    this.loadData();
                } else {
                    const error = await response.json();
                    alert(`Error al asignar: ${error.error}`);
                }
            } catch (error) {
                console.error('Error al asignar participante:', error);
            }
        });

        // Botón para eliminar asignaciones
        this.shadowRoot.querySelectorAll('.eliminar-btn').forEach(button => {
            button.addEventListener('click', () => {
                const proyecto_id = button.dataset.proyecto;
                const participante_id = button.dataset.participante;
                this.deleteAsignacion(proyecto_id, participante_id);
            });
        });
    }

    async deleteAsignacion(proyecto_id, participante_id) {
        if (!confirm('¿Estás seguro de eliminar esta asignación?')) return;

        try {
            const response = await fetch(`http://localhost:5000/asignaciones/${proyecto_id}/${participante_id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Asignación eliminada exitosamente');
                this.loadData();
            } else {
                const error = await response.json();
                alert(`Error al eliminar: ${error.error}`);
            }
        } catch (error) {
            console.error('Error eliminando la asignación:', error);
        }
    }
}

customElements.define('project-participant-list', ProjectParticipantList);