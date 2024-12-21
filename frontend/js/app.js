// Manejador principal de la aplicación
class AppManager {
    constructor() {
        this.currentView = 'projects';
        this.mainContainer = document.querySelector('#mainContent');
        this.init();
    }

    init = () => {
        // Inicializar manejadores de eventos
        document.addEventListener('navigation', this.handleNavigation);
        document.addEventListener('project-created', this.refreshCurrentView);
        document.addEventListener('participant-created', this.refreshCurrentView);
        
        // Cargar vista inicial
        this.renderCurrentView();
    }

    handleNavigation = (event) => {
        const { page } = event.detail;
        this.currentView = page;
        this.renderCurrentView();
    }

    renderCurrentView = () => {
        // Limpiar el contenedor principal
        this.mainContainer.innerHTML = '';

        switch (this.currentView) {
            case 'projects':
                this.renderProjectsView();
                break;
            case 'participants':
                this.renderParticipantsView();
                break;
            case 'assignments':
                this.renderAssignmentsView();
                break;
            default:
                this.renderProjectsView();
        }
    }

    renderProjectsView = () => {
        const projectForm = document.createElement('project-form');
        const projectTable = document.createElement('project-table');
        
        const container = document.createElement('div');
        container.className = 'view-container';
        container.innerHTML = `
            <h2>Gestión de Proyectos</h2>
            <div class="view-content">
                <div class="form-section"></div>
                <div class="table-section"></div>
            </div>
        `;

        container.querySelector('.form-section').appendChild(projectForm);
        container.querySelector('.table-section').appendChild(projectTable);
        this.mainContainer.appendChild(container);
    }

    renderParticipantsView = () => {
        const participantForm = document.createElement('participant-form');
        const participantTable = document.createElement('participant-table');
        
        const container = document.createElement('div');
        container.className = 'view-container';
        container.innerHTML = `
            <h2>Gestión de Participantes</h2>
            <div class="view-content">
                <div class="form-section"></div>
                <div class="table-section"></div>
            </div>
        `;

        container.querySelector('.form-section').appendChild(participantForm);
        container.querySelector('.table-section').appendChild(participantTable);
        this.mainContainer.appendChild(container);
    }

    renderAssignmentsView = () => {
        const assignmentManager = document.createElement('assignment-manager');
        
        const container = document.createElement('div');
        container.className = 'view-container';
        container.innerHTML = `
            <h2>Asignaciones de Proyectos</h2>
            <div class="view-content">
                <div class="assignments-section"></div>
            </div>
        `;

        container.querySelector('.assignments-section').appendChild(assignmentManager);
        this.mainContainer.appendChild(container);
    }

    refreshCurrentView = () => {
        // Refrescar la vista actual después de una operación
        this.renderCurrentView();
    }

    showNotification = (message, type = 'info') => {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remover la notificación después de 3 segundos
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    handleError = (error) => {
        console.error('Error en la aplicación:', error);
        this.showNotification(error.message, 'error');
    }
}

// Estilos globales para la aplicación
const globalStyles = document.createElement('style');
globalStyles.textContent = `
    .view-container {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
    }

    .view-content {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 2rem;
        margin-top: 2rem;
    }

    .notification {
        position: fixed;
        top: 1rem;
        right: 1rem;
        padding: 1rem;
        border-radius: 4px;
        color: white;
        z-index: 1000;
    }

    .notification.info {
        background-color: #3498db;
    }

    .notification.error {
        background-color: #e74c3c;
    }

    .notification.success {
        background-color: #2ecc71;
    }

    @media (max-width: 768px) {
        .view-content {
            grid-template-columns: 1fr;
        }
    }
`;

document.head.appendChild(globalStyles);

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.app = new AppManager();
});