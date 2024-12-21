class AppHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback = () => {
        this.render();
    }

    render = () => {
        const currentDate = new Date().toLocaleDateString();
        this.shadowRoot.innerHTML = `
            <style>
                header {
                    background-color: #2c3e50;
                    color: white;
                    padding: 1rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .user-info {
                    display: flex;
                    gap: 1rem;
                }
                .header-title {
                    font-size: 1.5rem;
                    font-weight: bold;
                }
            </style>
            <header>
                <div class="header-title">Sistema de Gestión de Proyectos</div>
                <div class="user-info">
                    <span>Usuario: ${this.getAttribute('username') || 'Invitado'}</span>
                    <span>Rol: ${this.getAttribute('role') || 'Usuario'}</span>
                    <span>${currentDate}</span>
                </div>
            </header>
        `;
    }
}

customElements.define('app-header', AppHeader);