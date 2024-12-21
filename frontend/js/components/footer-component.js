class AppFooter extends HTMLElement {
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
                footer {
                    background-color: #2c3e50;
                    color: white;
                    padding: 1rem;
                    text-align: center;
                    position: fixed;
                    bottom: 0;
                    width: 100%;
                }
                .links {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    margin-top: 0.5rem;
                }
                a {
                    color: white;
                    text-decoration: none;
                }
                a:hover {
                    text-decoration: underline;
                }
            </style>
            <footer>
                <div>© ${new Date().getFullYear()} Sistema de Gestión de Proyectos</div>
                <div class="links">
                    <a href="#about">Acerca de</a>
                    <a href="#contact">Contacto</a>
                    <a href="#help">Ayuda</a>
                </div>
            </footer>
        `;
    }
}

customElements.define('app-footer', AppFooter);