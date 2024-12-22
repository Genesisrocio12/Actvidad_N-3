class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                header {
                    background-color: #34495e;
                    color: white;
                    text-align: center;
                    padding: 1rem;
                }
            </style>
            <header>
                <h1>Gestión de Proyectos</h1>
            </header>
        `;
    }
}

customElements.define('header-component', HeaderComponent);