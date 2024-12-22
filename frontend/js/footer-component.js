class FooterComponent extends HTMLElement {
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
                footer {
                    background-color: #333;
                    color: white;
                    text-align: center;
                    padding: 1rem;
                    position: fixed;
                    bottom: 0;
                    width: 100%;
                }
            </style>
            <footer>
                © ${new Date().getFullYear()} Gestión de Proyectos
            </footer>
        `;
    }
}

customElements.define('footer-component', FooterComponent);