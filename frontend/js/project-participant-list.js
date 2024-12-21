// project-participant-list.js
class ProjectParticipantList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.estilo = document.createElement('style');
        this.estilo.textContent = `
            .container {
                padding: 1rem;
                margin-top: 2rem;
            }
            .relation-table {
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
            .assignment-form {
                margin-bottom: 2rem;
                padding: 1rem;
                border: 1px solid #ddd;
                border-radius: 4px;
            }
            .form-row {
                display: flex;
                gap: 1rem;
                margin-bottom: 1rem;
            }
            select {
                padding: 0.5rem;
                border: 1px solid #ddd;
                border-radius: 4px;
                flex: 1;
            }
            .btn-asignar {
                background-color: #4CAF50;
                color: white;
                padding: 0.5rem 1rem;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
            .btn-eliminar {
                background-color: #f44336;
                color: white;
                padding: 0.5rem;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
        `;
    }

    connectedCallback() {
        this.loadData();
    }

    async loadData() {
        try {
            const [proyectos, participantes, relaciones] = await Promise.all([
                fetch('http://localhost:5000/proyectos').then(r => r.json()),
                fetch('http://localhost:5000/participantes').then(r => r.json()),
                fetch('http://localhost:5000/proyecto-participante').then(r => r.json())
            ]);
            this.render(proyectos, participantes, relaciones);
        } catch (error) {
            console.error('Error cargando datos:', error);
        }
    }

    render = (proyectos, participantes, relaciones) => {
        this.shadowRoot.innerHTML = `
            ${this.estilo.outerHTML}
            <div class="container">
                <h2>Asignación de Participantes a Proyectos</h2>
                
                <div class="assignment-form">
                    <h3>Nueva Asignación</h3>
                    <div class="form-row">
                        <select id="proyecto-select">
                            <option value="">Seleccione un proyecto</option>
                            ${proyectos.map(p => `
                                <option value="${p.id}">${p.nombre}</option>
                            `).join('')}
                        </select>
                        <select id="participante-select">
                            <option value="">Seleccione un participante</option>
                            ${participantes.map(p => `
                                <option value="${p.id}">${p.nombre} ${p.apellido}</option>
                            `).join('')}
                        </select>
                        <button class="btn-asignar" id="btn-asignar">Asignar</button>
                    </div>
                </div>

                <table class="relation-table">
                    <thead>
                        <tr>
                            <th>Proyecto</th>
                            <th>Participante</th>
                            <th>Rol</th>
                            <th>Fecha Asignación</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${relaciones.map(r => {
                            const proyecto = proyectos.find(p => p.id === r.proyecto_id);
                            const participante = participantes.find(p => p.id === r.participante_id);
                            return `
                                <tr>
                                    <td>${proyecto?.nombre || 'N/A'}</td>
                                    <td>${participante ? `${participante.nombre} ${participante.apellido}` : 'N/A'}</td>
                                    <td>${participante?.rol || 'N/A'}</td>
                                    <td>${new Date(r.fecha_asignacion).toLocaleDateString()}</td>
                                    <td>
                                        <button class="btn-eliminar" data-proyecto="${r.proyecto_id}" data-participante="${r.participante_id}">
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        `;

        this.addEventListeners();
    }

    addEventListeners = () => {
        const btnAsignar = this.shadowRoot.getElementById('btn-asignar');
        btnAsignar.addEventListener('click', this.handleAsignacion);

        this.shadowRoot.querySelectorAll('.btn-eliminar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const proyectoId = e.target.dataset.proyecto;
                const participanteId = e.target.dataset.participante;
                this.handleEliminarAsignacion(proyectoId, participanteId);
            });
        });
    }

    handleAsignacion = async () => {
        const proyectoId = this.shadowRoot.getElementById('proyecto-select').value;
        const participanteId = this.shadowRoot.getElementById('participante-select').value;

        if (!proyectoId || !participanteId) {
            alert('Por favor seleccione proyecto y participante');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/proyecto-participante', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    proyecto_id: proyectoId,
                    participante_id: participanteId
                })
            });

            if (response.ok) {
                alert('Asignación realizada con éxito');
                this.loadData();
            } else {
                alert('Error al realizar la asignación');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al realizar la asignación');
        }
    }

    handleEliminarAsignacion = async (proyectoId, participanteId) => {
        if (confirm('¿Está seguro de eliminar esta asignación?')) {
            try {
                const response = await fetch(`http://localhost:5000/proyecto-participante/${proyectoId}/${participanteId}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    alert('Asignación eliminada con éxito');
                    this.loadData();
                } else {
                    alert('Error al eliminar la asignación');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al eliminar la asignación');
            }
        }
    }
}

window.customElements.define('project-participant-list', ProjectParticipantList);